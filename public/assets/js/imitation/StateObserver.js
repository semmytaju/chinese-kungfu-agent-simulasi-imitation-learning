/**
 * StateObserver.js
 * Builds 14-dimensional Kung Fu imitation state observations normalized to [-1, 1]:
 *   [0..1]   seqPhase sin/cos
 *   [2..13]  12 continuous biomechanical joint channels
 *            (armRaiseL/R, armAbductL/R, elbowFlexL/R, torsoPitch, torsoRoll,
 *             headYaw, squatDepth, jumpHeight, kickLeg)
 * Features [2..13] serve as the Pose Regressor target vector in Dual-Head BC.
 */

function clamp(v, min = -1.0, max = 1.0) {
    const num = Number(v);
    if (!Number.isFinite(num)) return 0.0;
    return Math.max(min, Math.min(max, num));
}

export const STATE_DIM = 14;

export const STATE_FEATURE_NAMES = [
    'phase_sin',
    'phase_cos',
    'arm_raise_l',
    'arm_raise_r',
    'arm_abduct_l',
    'arm_abduct_r',
    'elbow_flex_l',
    'elbow_flex_r',
    'torso_pitch',
    'torso_roll',
    'head_yaw',
    'squat_depth',
    'jump_height',
    'kick_leg'
];

export class StateObserver {
    constructor() {
        this.cycleDurationSec = 10.0;
    }

    observe(motionState) {
        if (!motionState) {
            return {
                vector: new Array(STATE_DIM).fill(0),
                raw: {},
                timestamp: Date.now()
            };
        }

        const seqPhase = clamp(motionState.seqPhase ?? 0, 0, 1);
        const phaseRad = seqPhase * Math.PI * 2;
        const j = motionState.joints || {};

        const f0 = Math.sin(phaseRad);
        const f1 = Math.cos(phaseRad);
        const f2 = clamp(((j.armRaiseL ?? 0.14) / 2.6) * 2.0 - 1.0);
        const f3 = clamp(((j.armRaiseR ?? 0.14) / 2.6) * 2.0 - 1.0);
        const f4 = clamp(((j.armAbductL ?? 0.18) / 2.2) * 2.0 - 1.0);
        const f5 = clamp(((j.armAbductR ?? 0.18) / 2.2) * 2.0 - 1.0);
        const f6 = clamp(((j.elbowFlexL ?? 0.35) / 2.3) * 2.0 - 1.0);
        const f7 = clamp(((j.elbowFlexR ?? 0.35) / 2.3) * 2.0 - 1.0);
        const f8 = clamp((j.torsoPitch ?? 0.0) / 0.55);
        const f9 = clamp((j.torsoRoll ?? 0.0) / 0.55);
        const f10 = clamp((j.headYaw ?? 0.0) / 0.75);
        const f11 = clamp(((j.squatDepth ?? 0.06) * 2.0) - 1.0);
        const f12 = clamp(((j.jumpHeight ?? 0.0) * 2.0) - 1.0);
        const f13 = clamp(j.kickLeg ?? 0.0);

        const vector = [
            f0, f1, f2, f3, f4, f5, f6, f7, f8, f9, f10, f11, f12, f13
        ].map(v => Number(v.toFixed(5)));

        return {
            vector,
            raw: {
                seqPhase,
                joints: j,
                posX: motionState.posX ?? 0,
                posZ: motionState.posZ ?? 0,
                yaw: motionState.yaw ?? 0
            },
            timestamp: Date.now()
        };
    }

    static getBaseSchemaMetadata() {
        return {
            schemaVersion: '3.0.0-kungfu-kinematics',
            stateDim: STATE_DIM,
            poseDim: 12,
            featureNames: [...STATE_FEATURE_NAMES]
        };
    }

    static jointsFromPoseSlice(slice12) {
        if (!Array.isArray(slice12) || slice12.length < 12) return null;
        return {
            armRaiseL: Math.max(0, Math.min(2.6, (clamp(slice12[0]) + 1.0) * 0.5 * 2.6)),
            armRaiseR: Math.max(0, Math.min(2.6, (clamp(slice12[1]) + 1.0) * 0.5 * 2.6)),
            armAbductL: Math.max(0, Math.min(2.2, (clamp(slice12[2]) + 1.0) * 0.5 * 2.2)),
            armAbductR: Math.max(0, Math.min(2.2, (clamp(slice12[3]) + 1.0) * 0.5 * 2.2)),
            elbowFlexL: Math.max(0.05, Math.min(2.3, (clamp(slice12[4]) + 1.0) * 0.5 * 2.3)),
            elbowFlexR: Math.max(0.05, Math.min(2.3, (clamp(slice12[5]) + 1.0) * 0.5 * 2.3)),
            torsoPitch: clamp(slice12[6]) * 0.55,
            torsoRoll: clamp(slice12[7]) * 0.55,
            headYaw: clamp(slice12[8]) * 0.75,
            squatDepth: Math.max(0, Math.min(1.0, (clamp(slice12[9]) + 1.0) * 0.5)),
            jumpHeight: Math.max(0, Math.min(1.0, (clamp(slice12[10]) + 1.0) * 0.5)),
            kickLeg: clamp(slice12[11])
        };
    }

    static isValidStateVector(vec, expectedDim = STATE_DIM) {
        if (!Array.isArray(vec) || vec.length !== expectedDim) return false;
        for (let i = 0; i < vec.length; i++) {
            if (typeof vec[i] !== 'number' || !Number.isFinite(vec[i])) return false;
        }
        return true;
    }
}
