/**
 * MotionInterpreter.js
 * Translates calibrated MoveNet human pose into 9 Chinese Kung Fu action classes
 * and 12 smooth continuous humanoid joint angles including airborne jump & flying kick.
 */

export const IMITATION_ACTIONS = [
    { id: 0, code: 'WUJI_READY', label: 'Wuji Stance (Ready)', colorHex: '#38bdf8' },
    { id: 1, code: 'GONG_BU_PUNCH', label: 'Gong Bu (Lunge Punch)', colorHex: '#f59e0b' },
    { id: 2, code: 'TIGER_BACK_PARRY', label: 'Hu Zhua (Tiger Guard)', colorHex: '#fb7185' },
    { id: 3, code: 'CRANE_TURN_LEFT', label: 'Duli Bu (Left Crane)', colorHex: '#a855f7' },
    { id: 4, code: 'DRAGON_TURN_RIGHT', label: 'Qing Long (Right Dragon)', colorHex: '#f97316' },
    { id: 5, code: 'LEFT_CLOUD_PALM', label: 'Yun Shou (Left Cloud Palm)', colorHex: '#22c55e' },
    { id: 6, code: 'RIGHT_SPEAR_STRIKE', label: 'Chuan Zhang (Right Spear)', colorHex: '#3b82f6' },
    { id: 7, code: 'MA_BU_HORSE', label: 'Ma Bu (Horse Stance)', colorHex: '#06b6d4' },
    { id: 8, code: 'FLYING_JUMP_KICK', label: 'Fei Tui (Jump Kick)', colorHex: '#ef4444' }
];

export const ACTION_COUNT = IMITATION_ACTIONS.length;

export const NEUTRAL_JOINTS = Object.freeze({
    armRaiseL: 0.22,
    armRaiseR: 0.22,
    armAbductL: 0.22,
    armAbductR: 0.22,
    elbowFlexL: 0.72,
    elbowFlexR: 0.72,
    torsoPitch: 0.02,
    torsoRoll: 0.0,
    headYaw: 0.0,
    squatDepth: 0.12,
    jumpHeight: 0.0,
    kickLeg: 0.0
});

export function getArchetypeJointsForAction(actionId, seqPhase = 0) {
    const wave = Math.sin(seqPhase * Math.PI * 2);
    const pulse = Math.abs(wave);
    switch (actionId) {
        case 1:
            return {
                armRaiseL: 0.14,
                armRaiseR: 1.52 + 0.08 * wave,
                armAbductL: 0.24,
                armAbductR: 0.10,
                elbowFlexL: 1.58,
                elbowFlexR: 0.08,
                torsoPitch: 0.22,
                torsoRoll: -0.06,
                headYaw: 0.0,
                squatDepth: 0.36,
                jumpHeight: 0.0,
                kickLeg: 0.12
            };
        case 2:
            return {
                armRaiseL: 1.18,
                armRaiseR: 1.18,
                armAbductL: 0.56,
                armAbductR: 0.56,
                elbowFlexL: 1.22,
                elbowFlexR: 1.22,
                torsoPitch: -0.22,
                torsoRoll: 0.0,
                headYaw: 0.0,
                squatDepth: 0.38,
                jumpHeight: 0.0,
                kickLeg: 0.0
            };
        case 3:
            return {
                armRaiseL: 0.98 + 0.08 * wave,
                armRaiseR: 0.98 - 0.08 * wave,
                armAbductL: 1.72,
                armAbductR: 1.72,
                elbowFlexL: 0.26,
                elbowFlexR: 0.26,
                torsoPitch: 0.05,
                torsoRoll: -0.18,
                headYaw: 0.42,
                squatDepth: 0.04,
                jumpHeight: 0.04,
                kickLeg: -0.82
            };
        case 4:
            return {
                armRaiseL: 0.68,
                armRaiseR: 1.42,
                armAbductL: 0.78,
                armAbductR: 1.38,
                elbowFlexL: 0.96,
                elbowFlexR: 0.22,
                torsoPitch: 0.14,
                torsoRoll: 0.24,
                headYaw: -0.44,
                squatDepth: 0.30,
                jumpHeight: 0.0,
                kickLeg: 0.26
            };
        case 5:
            return {
                armRaiseL: 1.66,
                armRaiseR: 0.24,
                armAbductL: 1.16,
                armAbductR: 0.28,
                elbowFlexL: 0.30,
                elbowFlexR: 1.52,
                torsoPitch: 0.06,
                torsoRoll: -0.10,
                headYaw: 0.26,
                squatDepth: 0.26,
                jumpHeight: 0.0,
                kickLeg: 0.0
            };
        case 6:
            return {
                armRaiseL: 0.28,
                armRaiseR: 1.68,
                armAbductL: 0.42,
                armAbductR: 1.08,
                elbowFlexL: 1.52,
                elbowFlexR: 0.14,
                torsoPitch: 0.08,
                torsoRoll: 0.10,
                headYaw: -0.26,
                squatDepth: 0.26,
                jumpHeight: 0.0,
                kickLeg: 0.0
            };
        case 7:
            return {
                armRaiseL: 0.48 + 0.16 * wave,
                armRaiseR: 0.48 - 0.16 * wave,
                armAbductL: 0.54,
                armAbductR: 0.54,
                elbowFlexL: 1.56,
                elbowFlexR: 1.56,
                torsoPitch: 0.08,
                torsoRoll: 0.0,
                headYaw: 0.0,
                squatDepth: 0.86,
                jumpHeight: 0.0,
                kickLeg: 0.0
            };
        case 8:
            return {
                armRaiseL: 1.64,
                armRaiseR: 1.18,
                armAbductL: 1.22,
                armAbductR: 0.96,
                elbowFlexL: 0.34,
                elbowFlexR: 0.88,
                torsoPitch: -0.16,
                torsoRoll: 0.08,
                headYaw: -0.12,
                squatDepth: 0.08,
                jumpHeight: 0.82 + 0.16 * pulse,
                kickLeg: 0.92
            };
        case 0:
        default:
            return { ...NEUTRAL_JOINTS };
    }
}

export class MotionInterpreter {
    constructor(options = {}) {
        this.thresholds = {
            minPoseConfidence: options.minPoseConfidence ?? 0.30,
            forwardEnter: options.forwardEnter ?? 0.26,
            backwardEnter: options.backwardEnter ?? 0.24,
            lateralEnter: options.lateralEnter ?? 0.24,
            squatEnter: options.squatEnter ?? 0.32,
            jumpEnter: options.jumpEnter ?? 0.24,
            armRaiseEnter: options.armRaiseEnter ?? 1.08,
            hysteresis: options.hysteresis ?? 0.08,
            smoothingAlpha: options.smoothingAlpha ?? 0.46,
            minHoldMs: options.minHoldMs ?? 120
        };

        this.currentAction = 0;
        this.lastSwitchTs = 0;
        this.smoothedForward = 0;
        this.smoothedLateral = 0;
        this.smoothedSquat = 0;
        this.smoothedJump = 0;
        this.smoothedJoints = { ...NEUTRAL_JOINTS };
    }

    updateThresholds(partial = {}) {
        Object.assign(this.thresholds, partial);
    }

    getThresholds() {
        return { ...this.thresholds };
    }

    reset() {
        this.currentAction = 0;
        this.lastSwitchTs = 0;
        this.smoothedForward = 0;
        this.smoothedLateral = 0;
        this.smoothedSquat = 0;
        this.smoothedJump = 0;
        this.smoothedJoints = { ...NEUTRAL_JOINTS };
    }

    _smoothJoint(prev, target, alpha) {
        return prev + (target - prev) * alpha;
    }

    interpret(pose, calibration, mirrored = true) {
        const now = performance.now();
        const alpha = Math.max(0.15, Math.min(0.85, this.thresholds.smoothingAlpha));

        if (!pose || !pose.detected || pose.confidence < this.thresholds.minPoseConfidence) {
            this.currentAction = 0;
            this.smoothedJump = this._smoothJoint(this.smoothedJump, 0, alpha);
            Object.keys(NEUTRAL_JOINTS).forEach((k) => {
                this.smoothedJoints[k] = this._smoothJoint(this.smoothedJoints[k], NEUTRAL_JOINTS[k], 0.18);
            });
            return {
                action: 0,
                code: IMITATION_ACTIONS[0].code,
                label: IMITATION_ACTIONS[0].label,
                confidence: pose?.confidence || 0,
                reason: 'Pose absent or low confidence (Wuji Ready Stance)',
                isValidPose: false,
                continuousJoints: { ...this.smoothedJoints },
                metrics: null
            };
        }

        const norm = calibration.normalizePose(pose, mirrored);
        if (!norm.calibrated) {
            return {
                action: 0,
                code: IMITATION_ACTIONS[0].code,
                label: IMITATION_ACTIONS[0].label,
                confidence: pose.confidence,
                reason: 'Calibrating neutral Kung Fu stance...',
                isValidPose: false,
                continuousJoints: { ...this.smoothedJoints },
                metrics: norm
            };
        }

        this.smoothedForward = this._smoothJoint(this.smoothedForward, norm.forwardScore - norm.backwardScore, alpha);
        this.smoothedLateral = this._smoothJoint(this.smoothedLateral, norm.lateralScore, alpha);
        this.smoothedSquat = this._smoothJoint(this.smoothedSquat, norm.squatScore || 0, alpha);
        this.smoothedJump = this._smoothJoint(this.smoothedJump, norm.jumpScore || 0, alpha * 1.15);

        const m = pose.metrics || {};
        const armL = mirrored ? (m.rightArm || {}) : (m.leftArm || {});
        const armR = mirrored ? (m.leftArm || {}) : (m.rightArm || {});

        const rawJoints = {
            armRaiseL: armL.raise ?? NEUTRAL_JOINTS.armRaiseL,
            armRaiseR: armR.raise ?? NEUTRAL_JOINTS.armRaiseR,
            armAbductL: armL.abduct ?? NEUTRAL_JOINTS.armAbductL,
            armAbductR: armR.abduct ?? NEUTRAL_JOINTS.armAbductR,
            elbowFlexL: armL.elbowFlex ?? NEUTRAL_JOINTS.elbowFlexL,
            elbowFlexR: armR.elbowFlex ?? NEUTRAL_JOINTS.elbowFlexR,
            torsoPitch: Math.max(-0.52, Math.min(0.55, this.smoothedForward * 0.45)),
            torsoRoll: Math.max(-0.50, Math.min(0.50, this.smoothedLateral * 0.45)),
            headYaw: Math.max(-0.65, Math.min(0.65, norm.headYaw || 0)),
            squatDepth: Math.max(0, Math.min(1.0, this.smoothedSquat)),
            jumpHeight: 0.0,
            kickLeg: 0.0
        };

        const armThresh = this.thresholds.armRaiseEnter;
        const lHigh = rawJoints.armRaiseL > armThresh;
        const rHigh = rawJoints.armRaiseR > armThresh;
        const kneeL = norm.kneeLiftL || 0;
        const kneeR = norm.kneeLiftR || 0;

        let candidate = 0;
        let reason = 'Wuji Ready Stance';

        if (this.smoothedJump > this.thresholds.jumpEnter || (lHigh && rHigh && this.smoothedJump > 0.14)) {
            candidate = 8;
            reason = 'Teng Kong Fei Tui (Airborne Kung Fu Jump Kick detected)';
            rawJoints.jumpHeight = Math.max(0.55, Math.min(1.0, this.smoothedJump * 1.55));
            rawJoints.kickLeg = kneeL > kneeR + 0.18 ? -0.92 : 0.92;
            rawJoints.squatDepth = 0.06;
        } else if (this.smoothedSquat > this.thresholds.squatEnter) {
            candidate = 7;
            reason = 'Ma Bu (Deep Shaolin Horse Stance Squat)';
        } else if (lHigh && rHigh) {
            if (this.smoothedForward >= 0) {
                candidate = 2;
                reason = 'Hu Zhua (Double Tiger Guard)';
            } else {
                candidate = 8;
                reason = 'Fei Tui (High Double Guard Jump Kick)';
                rawJoints.jumpHeight = 0.72;
                rawJoints.kickLeg = 0.88;
            }
        } else if (lHigh && !rHigh) {
            candidate = 5;
            reason = 'Zuo Yun Shou (Left Cloud Palm High Block)';
        } else if (rHigh && !lHigh) {
            candidate = 6;
            reason = 'You Chuan Zhang (Right Spear Strike)';
        } else {
            const fwdEnter = this.thresholds.forwardEnter;
            const bwdEnter = this.thresholds.backwardEnter;
            const latEnter = this.thresholds.lateralEnter;

            const fwd = this.smoothedForward;
            const bwd = -this.smoothedForward;
            const lat = this.smoothedLateral;

            if (kneeL > 0.34 || lat < -latEnter) {
                candidate = 3;
                reason = kneeL > 0.34 ? 'Duli Bu (Left Crane Knee Stance)' : 'Duli Bu (Lean Left Crane Turn)';
                rawJoints.kickLeg = -0.82;
            } else if (kneeR > 0.34 || lat > latEnter) {
                candidate = 4;
                reason = kneeR > 0.34 ? 'Qing Long (Right Dragon Kick Spin)' : 'Qing Long (Lean Right Dragon Spin)';
                rawJoints.kickLeg = 0.36;
            } else if (fwd > fwdEnter) {
                candidate = 1;
                reason = 'Gong Bu (Forward Bow Stance Lunge)';
            } else if (bwd > bwdEnter) {
                candidate = 2;
                reason = 'Hu Zhua (Retreat Tiger Guard)';
            }
        }

        if (candidate !== this.currentAction) {
            if ((now - this.lastSwitchTs) >= this.thresholds.minHoldMs || candidate === 0) {
                this.currentAction = candidate;
                this.lastSwitchTs = now;
            }
        }

        Object.keys(NEUTRAL_JOINTS).forEach((k) => {
            this.smoothedJoints[k] = this._smoothJoint(this.smoothedJoints[k], rawJoints[k], alpha);
        });

        const actObj = IMITATION_ACTIONS[this.currentAction] || IMITATION_ACTIONS[0];
        return {
            action: actObj.id,
            code: actObj.code,
            label: actObj.label,
            colorHex: actObj.colorHex,
            confidence: pose.confidence,
            reason,
            isValidPose: true,
            continuousJoints: { ...this.smoothedJoints },
            metrics: {
                ...norm,
                smoothedForward: this.smoothedForward,
                smoothedLateral: this.smoothedLateral,
                smoothedSquat: this.smoothedSquat,
                smoothedJump: this.smoothedJump
            }
        };
    }
}
