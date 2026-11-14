/**
 * PoseCalibration.js
 * Neutral-pose baseline calibration + jump, squat, knee-lift, and lean normalization.
 * Adapts to any user height, body proportion, or webcam distance.
 */

export class PoseCalibration {
    constructor(options = {}) {
        this.requiredSamples = options.requiredSamples ?? 18;
        this.onProgress = options.onProgress || (() => {});
        this.onComplete = options.onComplete || (() => {});

        this.isCalibrating = false;
        this.samples = [];
        this.baseline = null;
    }

    isCalibrated() {
        return this.baseline !== null;
    }

    getBaseline() {
        return this.baseline;
    }

    clear() {
        this.isCalibrating = false;
        this.samples = [];
        this.baseline = null;
    }

    startCalibration() {
        this.isCalibrating = true;
        this.samples = [];
        this.onProgress(0, this.requiredSamples);
    }

    addCalibrationFrame(pose) {
        if (!this.isCalibrating || !pose || !pose.detected || !pose.metrics) {
            return false;
        }
        const m = pose.metrics;
        if (pose.confidence < 0.32 || m.shoulderWidthNorm < 0.04) {
            return false;
        }

        this.samples.push({
            confidence: pose.confidence,
            metrics: m
        });

        this.onProgress(this.samples.length, this.requiredSamples);

        if (this.samples.length >= this.requiredSamples) {
            this._computeBaseline();
            this.isCalibrating = false;
            this.onComplete(this.baseline);
            return true;
        }
        return false;
    }

    seedFallbackIfNeeded(pose) {
        if (this.baseline || !pose || !pose.detected || !pose.metrics) return false;
        const m = pose.metrics;
        this.baseline = {
            shoulderCenter: { ...m.shoulderCenter },
            hipCenter: { ...m.hipCenter },
            torsoLengthNorm: m.torsoLengthNorm,
            shoulderWidthNorm: m.shoulderWidthNorm,
            neutralNoseRatio: m.noseOffsetY / Math.max(0.08, m.torsoLengthNorm),
            neutralShoulderYNorm: m.shoulderCenterYNorm,
            neutralScaleRatio: m.shoulderWidthNorm,
            neutralArmRaiseL: m.leftArm?.raise ?? 0.2,
            neutralArmRaiseR: m.rightArm?.raise ?? 0.2,
            calibratedAt: Date.now(),
            sampleCount: 1,
            isFallback: true
        };
        this.onComplete(this.baseline);
        return true;
    }

    _computeBaseline() {
        const n = Math.max(1, this.samples.length);
        const avg = (fn) => this.samples.reduce((acc, s) => acc + fn(s), 0) / n;

        const shoulderCenterX = avg(s => s.metrics.shoulderCenter.x);
        const shoulderCenterY = avg(s => s.metrics.shoulderCenter.y);
        const hipCenterX = avg(s => s.metrics.hipCenter.x);
        const hipCenterY = avg(s => s.metrics.hipCenter.y);
        const torsoLengthNorm = Math.max(0.10, avg(s => s.metrics.torsoLengthNorm));
        const shoulderWidthNorm = Math.max(0.08, avg(s => s.metrics.shoulderWidthNorm));
        const neutralNoseRatio = avg(s => s.metrics.noseOffsetY / Math.max(0.08, s.metrics.torsoLengthNorm));
        const neutralShoulderYNorm = avg(s => s.metrics.shoulderCenterYNorm);

        this.baseline = {
            shoulderCenter: { x: shoulderCenterX, y: shoulderCenterY },
            hipCenter: { x: hipCenterX, y: hipCenterY },
            torsoLengthNorm,
            shoulderWidthNorm,
            neutralNoseRatio,
            neutralShoulderYNorm,
            neutralScaleRatio: shoulderWidthNorm,
            neutralArmRaiseL: avg(s => s.metrics.leftArm?.raise ?? 0.2),
            neutralArmRaiseR: avg(s => s.metrics.rightArm?.raise ?? 0.2),
            calibratedAt: Date.now(),
            sampleCount: n,
            isFallback: false
        };
    }

    normalizePose(pose, mirrored = true) {
        if (!pose || !pose.detected || !pose.metrics || !this.baseline) {
            return {
                calibrated: false,
                forwardScore: 0,
                backwardScore: 0,
                lateralScore: 0,
                squatScore: 0,
                jumpScore: 0,
                kneeLiftL: 0,
                kneeLiftR: 0,
                headYaw: 0
            };
        }

        const m = pose.metrics;
        const b = this.baseline;
        const scaleDenom = Math.max(0.10, b.torsoLengthNorm);
        const widthDenom = Math.max(0.08, b.shoulderWidthNorm);

        const noseRatio = m.noseOffsetY / Math.max(0.08, m.torsoLengthNorm);
        const pitchDelta = noseRatio - b.neutralNoseRatio;
        const scaleExpansion = (m.shoulderWidthNorm - b.shoulderWidthNorm) / widthDenom;

        const forwardScore = Math.max(0, scaleExpansion * 1.45 + Math.max(0, pitchDelta) * 0.90);
        const backwardScore = Math.max(0, (-scaleExpansion) * 1.35 + Math.max(0, -pitchDelta) * 0.95);

        const rawLat = (m.noseOffsetX / scaleDenom);
        const lateralScore = mirrored ? -rawLat : rawLat;

        const shoulderDropY = m.shoulderCenterYNorm - b.neutralShoulderYNorm;
        const squatScore = Math.max(0, (shoulderDropY - Math.max(0, scaleExpansion) * 0.35) * 4.2);

        const shoulderLiftY = b.neutralShoulderYNorm - m.shoulderCenterYNorm;
        const jumpScore = Math.max(0, (shoulderLiftY - Math.max(0, scaleExpansion) * 0.20) * 4.8);

        let kneeLiftL = 0;
        let kneeLiftR = 0;
        const kp = pose.keypointMap || {};
        const h = Math.max(1, pose.frameHeight || 360);
        if (kp.left_hip?.score > 0.28 && kp.left_knee?.score > 0.28) {
            const hipKneeDy = (kp.left_knee.normY ?? kp.left_knee.y / h) - (kp.left_hip.normY ?? kp.left_hip.y / h);
            kneeLiftL = Math.max(0, Math.min(1.0, (0.20 - hipKneeDy / scaleDenom) * 2.2));
        }
        if (kp.right_hip?.score > 0.28 && kp.right_knee?.score > 0.28) {
            const hipKneeDy = (kp.right_knee.normY ?? kp.right_knee.y / h) - (kp.right_hip.normY ?? kp.right_hip.y / h);
            kneeLiftR = Math.max(0, Math.min(1.0, (0.20 - hipKneeDy / scaleDenom) * 2.2));
        }
        if (mirrored) {
            const tmp = kneeLiftL;
            kneeLiftL = kneeLiftR;
            kneeLiftR = tmp;
        }

        const headYaw = Math.max(-0.7, Math.min(0.7, lateralScore * 1.1));

        return {
            calibrated: true,
            forwardScore,
            backwardScore,
            lateralScore,
            squatScore: Math.min(1.0, squatScore),
            jumpScore: Math.min(1.0, jumpScore),
            kneeLiftL,
            kneeLiftR,
            scaleExpansion,
            pitchDelta,
            headYaw
        };
    }
}
