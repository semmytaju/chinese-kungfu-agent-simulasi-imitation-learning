/**
 * MotionLabEngine.js
 * Deterministic ~35.7 Hz humanoid motion kinematics engine for Kungfu Agent AI:
 *   - Smoothly blends 12 continuous joint targets (arms, elbows, torso, head, squat, jump, kick)
 *   - Handles dynamic Chinese Kung Fu stances, turns, Ma Bu squats, and Flying Jump Kick arcs
 *   - Drives smooth locomotion + circular podium wrap/clamp within Wushu studio radius
 */
import {
    IMITATION_ACTIONS,
    ACTION_COUNT,
    NEUTRAL_JOINTS,
    getArchetypeJointsForAction
} from './MotionInterpreter.js?v=20261114w2';

export class MotionLabEngine {
    constructor(options = {}) {
        this.podiumRadius = options.podiumRadius ?? 3.1;
        this.tickMs = options.tickMs ?? 28;

        this.onTick = options.onTick || (() => {});
        this.onActionTelemetry = options.onActionTelemetry || (() => {});

        this._timer = null;
        this._lastTickAt = 0;

        this.posX = 0;
        this.posZ = 0;
        this.yaw = 0;
        this.linearSpeed = 0;
        this.angularSpeed = 0;

        this.seqPhase = 0;
        this.stepCount = 0;

        this.joints = { ...NEUTRAL_JOINTS };
        this.targetJoints = { ...NEUTRAL_JOINTS };

        this.walkPhase = 0;
        this.walkIntensity = 0;

        this.activeAction = 0;
        this.activeActionCode = IMITATION_ACTIONS[0].code;
        this.activeActionLabel = IMITATION_ACTIONS[0].label;
        this.activeSource = 'SYSTEM';
        this.activeConfidence = 1.0;
        this.activeMode = 'HUMAN_DEMO';

        this.isSimulationRunning = true;
    }

    start() {
        if (this._timer) return;
        this._lastTickAt = performance.now();
        this._timer = setInterval(() => this._step(), this.tickMs);
    }

    stop() {
        if (this._timer) {
            clearInterval(this._timer);
            this._timer = null;
        }
    }

    setMode(mode) {
        this.activeMode = mode;
    }

    reset() {
        this.posX = 0;
        this.posZ = 0;
        this.yaw = 0;
        this.linearSpeed = 0;
        this.angularSpeed = 0;
        this.walkIntensity = 0;
        this.walkPhase = 0;
        this.seqPhase = 0;
        this.activeAction = 0;
        this.activeActionCode = IMITATION_ACTIONS[0].code;
        this.activeActionLabel = IMITATION_ACTIONS[0].label;
        this.activeConfidence = 1.0;
        this.targetJoints = { ...NEUTRAL_JOINTS };
        this.joints = { ...NEUTRAL_JOINTS };
    }

    setCommand(actionId, meta = {}) {
        this.setAction(actionId, meta);
    }

    setAction(actionId, meta = {}) {
        const safeAction = (Number.isInteger(actionId) && actionId >= 0 && actionId < ACTION_COUNT)
            ? actionId
            : 0;
        const actDef = IMITATION_ACTIONS[safeAction] || IMITATION_ACTIONS[0];

        this.activeAction = safeAction;
        this.activeActionCode = actDef.code;
        this.activeActionLabel = meta.label || actDef.label;
        this.activeSource = meta.source || 'SYSTEM';
        this.activeConfidence = Number(meta.confidence ?? 1.0);

        if (meta.continuousJoints && typeof meta.continuousJoints === 'object') {
            const merged = { ...NEUTRAL_JOINTS };
            Object.keys(merged).forEach((key) => {
                const v = Number(meta.continuousJoints[key]);
                if (Number.isFinite(v)) merged[key] = v;
            });
            this.targetJoints = merged;
        } else {
            this.targetJoints = getArchetypeJointsForAction(safeAction, this.seqPhase);
        }
    }

    _step() {
        const now = performance.now();
        const dt = Math.min(0.08, Math.max(0.005, (now - this._lastTickAt) / 1000));
        this._lastTickAt = now;
        this.stepCount++;

        if (this.isSimulationRunning) {
            this.seqPhase = (this.seqPhase + dt * 0.14) % 1.0;
            if (this.activeSource !== 'WEBCAM' && this.activeSource !== 'BC_AGENT') {
                if (this.activeAction === 8 || this.activeAction === 1 || this.activeAction === 7) {
                    const dynamicArch = getArchetypeJointsForAction(this.activeAction, this.seqPhase);
                    this.targetJoints.armRaiseL = dynamicArch.armRaiseL;
                    this.targetJoints.armRaiseR = dynamicArch.armRaiseR;
                    this.targetJoints.jumpHeight = dynamicArch.jumpHeight;
                }
            }
        }

        const jointBlend = 1 - Math.exp(-15.5 * dt);
        Object.keys(NEUTRAL_JOINTS).forEach((key) => {
            const cur = this.joints[key] ?? NEUTRAL_JOINTS[key];
            const tgt = this.targetJoints[key] ?? NEUTRAL_JOINTS[key];
            this.joints[key] = cur + (tgt - cur) * jointBlend;
        });

        let tgtLinear = 0;
        let tgtAngular = 0;
        let tgtWalk = 0;

        if (this.activeMode !== 'BC_TRAINING') {
            switch (this.activeAction) {
                case 1:
                    tgtLinear = 1.15;
                    tgtWalk = 1.0;
                    break;
                case 2:
                    tgtLinear = -0.85;
                    tgtWalk = 0.80;
                    break;
                case 3:
                    tgtAngular = 1.45;
                    tgtWalk = 0.25;
                    break;
                case 4:
                    tgtAngular = -1.45;
                    tgtWalk = 0.50;
                    break;
                case 8:
                    tgtLinear = 0.65;
                    tgtWalk = 0.15;
                    break;
                default:
                    tgtLinear = 0;
                    tgtAngular = 0;
                    tgtWalk = 0;
                    break;
            }
        }

        const velBlend = 1 - Math.exp(-8.5 * dt);
        this.linearSpeed += (tgtLinear - this.linearSpeed) * velBlend;
        this.angularSpeed += (tgtAngular - this.angularSpeed) * velBlend;
        this.walkIntensity += (tgtWalk - this.walkIntensity) * velBlend;

        if (this.walkIntensity > 0.04) {
            const gaitDir = this.linearSpeed < -0.05 ? -1 : 1;
            this.walkPhase = (this.walkPhase + dt * 7.6 * gaitDir * Math.max(0.4, this.walkIntensity)) % (Math.PI * 2);
        }

        this.yaw += this.angularSpeed * dt;
        const moveStep = this.linearSpeed * dt;
        this.posX += Math.cos(this.yaw) * moveStep;
        this.posZ -= Math.sin(this.yaw) * moveStep;

        if (this.activeAction === 0 || this.activeAction === 5 || this.activeAction === 6 || this.activeAction === 7) {
            const centerPull = 1 - Math.exp(-0.55 * dt);
            this.posX += (0 - this.posX) * centerPull;
            this.posZ += (0 - this.posZ) * centerPull;
        }

        const dist = Math.hypot(this.posX, this.posZ);
        let atBoundary = false;
        if (dist > this.podiumRadius) {
            const scale = this.podiumRadius / dist;
            this.posX *= scale;
            this.posZ *= scale;
            atBoundary = true;
        }

        const stateSnapshot = this.getMotionState(atBoundary);
        this.onTick(stateSnapshot);
    }

    getMotionState(atBoundary = false) {
        return {
            seqPhase: this.seqPhase,
            stepCount: this.stepCount,
            posX: this.posX,
            posZ: this.posZ,
            yaw: this.yaw,
            linearSpeed: this.linearSpeed,
            angularSpeed: this.angularSpeed,
            walkPhase: this.walkPhase,
            walkIntensity: this.walkIntensity,
            atBoundary,
            action: this.activeAction,
            actionCode: this.activeActionCode,
            actionLabel: this.activeActionLabel,
            inputSource: this.activeSource,
            confidence: this.activeConfidence,
            joints: { ...this.joints }
        };
    }
}
