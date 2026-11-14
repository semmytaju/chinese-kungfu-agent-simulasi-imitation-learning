/**
 * ImitationLab3DView.js
 * Kungfu Agent AI 3D Stage & Wushu Warrior Mecha-Humanoid in Three.js.
 * Supports dynamic switching & live preview across 11 3D environments (1 Classic + 10 New)
 * powered by EnvironmentPresets.js while preserving zero-shadow-map high-FPS performance
 * alongside MoveNet WebGL inference and full 12-joint biomechanical articulation.
 */

import {
    DEFAULT_ENVIRONMENT_ID,
    buildEnvironmentScene,
    disposeThreeGroup
} from './EnvironmentPresets.js?v=20261114w2';

export class ImitationLab3DView {
    constructor(options = {}) {
        this.canvas = options.canvas;
        this.container = options.container || this.canvas?.parentElement;
        this.onHudUpdate = options.onHudUpdate || (() => {});
        this.environmentId = options.initialEnvId || DEFAULT_ENVIRONMENT_ID;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.animId = null;
        this.isDisposed = false;

        // Camera spherical orbit state (centered on Wushu courtyard focus)
        this.camViewMode = 'front';
        this.camTheta = 0.0;
        this.camPhi = 1.24;
        this.camRadius = 4.65;
        this.camTarget = null;
        this.followRobot = true;

        // Pointer interaction state
        this._isDragging = false;
        this._lastMouse = { x: 0, y: 0 };

        // Robot Rig References
        this.robotRoot = null;
        this.pelvisGroup = null;
        this.upperBodyGroup = null;
        this.headGroup = null;
        this.leftArm = null;
        this.rightArm = null;
        this.leftLeg = null;
        this.rightLeg = null;
        this.headbandTails = null;

        // Dynamic Environment / Accent References
        this.currentAccentMode = 'HUMAN_DEMO';
        this.accentMaterials = [];
        this.envStepAccentMat = null;
        this.envGroup = null;
        this.envUpdateFn = () => {};
        this.floorReticleGroup = null;
        this.floorReticleRingMat = null;
        this.bodyShadowMesh = null;

        // Latest simulation snapshot from MotionLabEngine
        this.latestMotionState = null;

        // FPS + HUD budget throttles
        this._fpsFrames = 0;
        this._fpsLastAt = performance.now();
        this._lastRenderAt = performance.now();
        this._currentFps = 60;
        this._lastHudEmitAt = 0;

        this._init();
    }

    _init() {
        if (!this.canvas || typeof window.THREE === 'undefined') {
            console.error('Three.js or canvas missing for ImitationLab3DView.');
            return;
        }
        const THREE = window.THREE;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0d070c);
        this.scene.fog = new THREE.FogExp2(0x0d070c, 0.036);

        const w = Math.max(320, this.container?.clientWidth || 800);
        const h = Math.max(260, this.container?.clientHeight || 520);

        this.camera = new THREE.PerspectiveCamera(44, w / h, 0.1, 65);
        this.camTarget = new THREE.Vector3(0, 0.96, 0);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35));
        this.renderer.setSize(w, h, false);
        this.renderer.shadowMap.enabled = false;
        if ('outputColorSpace' in this.renderer && THREE.SRGBColorSpace) {
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        }

        this.envStepAccentMat = new THREE.MeshStandardMaterial({
            color: 0x22d3ee,
            emissive: 0x06b6d4,
            emissiveIntensity: 1.35,
            roughness: 0.22
        });
        this.envStepAccentMat.userData = { sharedMaterial: true };

        this.envGroup = new THREE.Group();
        this.scene.add(this.envGroup);

        this._buildFloorTrackingReticle();
        this.setEnvironment(this.environmentId);
        this._buildModernHumanoidRobot();

        this.setCameraPreset('front');
        this._bindPointerControls();

        this._resizeObserver = new ResizeObserver(() => this.resize());
        if (this.container) this._resizeObserver.observe(this.container);
        window.addEventListener('resize', this._onWinResize = () => this.resize());

        this._startRenderLoop();
    }

    _buildFloorTrackingReticle() {
        const THREE = window.THREE;
        this.floorReticleGroup = new THREE.Group();
        this.floorReticleRingMat = new THREE.MeshBasicMaterial({
            color: 0xf59e0b,
            transparent: true,
            opacity: 0.65,
            side: THREE.DoubleSide
        });
        const lockRing = new THREE.Mesh(
            new THREE.RingGeometry(0.46, 0.50, 36),
            this.floorReticleRingMat
        );
        lockRing.rotation.x = -Math.PI / 2;
        lockRing.position.y = 0.015;
        this.floorReticleGroup.add(lockRing);

        const bodyShadow = new THREE.Mesh(
            new THREE.CircleGeometry(0.42, 24),
            new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.46 })
        );
        bodyShadow.rotation.x = -Math.PI / 2;
        bodyShadow.position.y = 0.012;
        this.bodyShadowMesh = bodyShadow;
        this.floorReticleGroup.add(bodyShadow);
        this.scene.add(this.floorReticleGroup);
    }

    getEnvironmentId() {
        return this.environmentId;
    }

    /**
     * Dynamically swaps or previews any of the 11 Three.js environments without touching
     * the active Wushu warrior robot rig, motion state, or camera preset.
     */
    setEnvironment(envId) {
        if (!this.scene || !this.envGroup || typeof window.THREE === 'undefined') return null;
        const THREE = window.THREE;

        disposeThreeGroup(this.envGroup);

        const built = buildEnvironmentScene(THREE, envId, {
            parent: this.envGroup,
            stepAccentMat: this.envStepAccentMat
        });

        this.environmentId = built.meta.id;
        this.envUpdateFn = built.update;

        this.scene.background.setHex(built.meta.backgroundHex);
        this.scene.fog.color.setHex(built.meta.fogHex);
        this.scene.fog.density = built.meta.fogDensity;

        if (this.floorReticleRingMat) {
            this.floorReticleRingMat.color.setHex(built.meta.reticleHex);
        }

        this.setAccentTheme(this.currentAccentMode);
        return built.meta;
    }

    _buildModernHumanoidRobot() {
        const THREE = window.THREE;

        // Chinese Wushu Cyber-Monk / Kung Fu Master Materials
        const armorIvoryMat = new THREE.MeshStandardMaterial({
            color: 0xf1f5f9, metalness: 0.36, roughness: 0.28
        });
        const crimsonTunicMat = new THREE.MeshStandardMaterial({
            color: 0xb91c1c, metalness: 0.28, roughness: 0.38
        });
        const obsidianPantsMat = new THREE.MeshStandardMaterial({
            color: 0x181c28, metalness: 0.48, roughness: 0.44
        });
        const antiqueGoldMat = new THREE.MeshStandardMaterial({
            color: 0xfbbf24, metalness: 0.80, roughness: 0.22
        });
        const jointTitaniumMat = new THREE.MeshStandardMaterial({
            color: 0x475569, metalness: 0.78, roughness: 0.25
        });
        const visorMat = new THREE.MeshStandardMaterial({
            color: 0x06080f, metalness: 0.92, roughness: 0.12
        });
        const coreAccentMat = new THREE.MeshStandardMaterial({
            color: 0x22d3ee, emissive: 0x06b6d4, emissiveIntensity: 1.6, roughness: 0.2
        });
        this.accentMaterials.push(coreAccentMat);

        // Root placed at floor (y = 0), local +X front, +Y up, -Z Left, +Z Right
        this.robotRoot = new THREE.Group();
        this.scene.add(this.robotRoot);

        // Pelvis Group (vertical squat & jump displacement moves pelvisGroup.position.y)
        this.pelvisGroup = new THREE.Group();
        this.pelvisGroup.position.y = 0.92;
        this.robotRoot.add(this.pelvisGroup);

        const pelvisCore = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.15, 0.34), obsidianPantsMat);
        this.pelvisGroup.add(pelvisCore);

        // Martial Arts Crimson & Gold Waist Sash
        const sashBand = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.075, 0.37), crimsonTunicMat);
        sashBand.position.y = 0.055;
        this.pelvisGroup.add(sashBand);

        const sashGoldBuckle = new THREE.Mesh(new THREE.CylinderGeometry(0.052, 0.052, 0.03, 16), antiqueGoldMat);
        sashGoldBuckle.rotation.z = Math.PI / 2;
        sashGoldBuckle.position.set(0.145, 0.055, 0);
        this.pelvisGroup.add(sashGoldBuckle);

        // Side Martial Sash Tails (flared out on +/-Z so legs stay totally clear for High Kicks!)
        [-1, 1].forEach((sideSign) => {
            const sideTasset = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.21, 0.03), crimsonTunicMat);
            sideTasset.position.set(0, -0.06, sideSign * 0.205);
            sideTasset.rotation.x = sideSign * -0.14;
            this.pelvisGroup.add(sideTasset);

            const trim = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.025, 0.034), antiqueGoldMat);
            trim.position.set(0, -0.15, sideSign * 0.218);
            trim.rotation.x = sideSign * -0.14;
            this.pelvisGroup.add(trim);
        });

        // Articulated Upper Body Pivot
        this.upperBodyGroup = new THREE.Group();
        this.upperBodyGroup.position.y = 0.10;
        this.pelvisGroup.add(this.upperBodyGroup);

        const waistCol = new THREE.Mesh(new THREE.CylinderGeometry(0.105, 0.095, 0.16, 16), jointTitaniumMat);
        waistCol.position.y = 0.08;
        this.upperBodyGroup.add(waistCol);

        // Sculpted Wushu Tunic Chest
        const chestFrame = new THREE.Mesh(new THREE.BoxGeometry(0.27, 0.34, 0.40), crimsonTunicMat);
        chestFrame.position.y = 0.30;
        this.upperBodyGroup.add(chestFrame);

        // Asymmetric Crossed-Lapel Martial Vest Overlay (+X Chest Front)
        const chestIvoryPlate = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.29, 0.36), armorIvoryMat);
        chestIvoryPlate.position.set(0.12, 0.31, 0);
        this.upperBodyGroup.add(chestIvoryPlate);

        const lapelLeft = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.30, 0.065), antiqueGoldMat);
        lapelLeft.position.set(0.158, 0.31, -0.055);
        lapelLeft.rotation.x = 0.36;
        this.upperBodyGroup.add(lapelLeft);

        const lapelRight = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.30, 0.065), crimsonTunicMat);
        lapelRight.position.set(0.160, 0.31, 0.045);
        lapelRight.rotation.x = -0.36;
        this.upperBodyGroup.add(lapelRight);

        // Back Spine Armor + Chi Glow
        const backPack = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.28, 0.26), obsidianPantsMat);
        backPack.position.set(-0.14, 0.31, 0);
        this.upperBodyGroup.add(backPack);

        const spineLed = new THREE.Mesh(new THREE.BoxGeometry(0.03, 0.22, 0.05), coreAccentMat);
        spineLed.position.set(-0.19, 0.31, 0);
        this.upperBodyGroup.add(spineLed);

        // Chest Gold & Chi Core Medallion
        const reactorHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.068, 0.04, 20), antiqueGoldMat);
        reactorHousing.rotation.z = Math.PI / 2;
        reactorHousing.position.set(0.165, 0.34, 0);
        this.upperBodyGroup.add(reactorHousing);

        const reactorCore = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.045, 0.046, 20), coreAccentMat);
        reactorCore.rotation.z = Math.PI / 2;
        reactorCore.position.set(0.169, 0.34, 0);
        this.upperBodyGroup.add(reactorCore);

        // Expressive Martial Warrior Helm + Crimson Flowing Headband
        this.headGroup = new THREE.Group();
        this.headGroup.position.set(0.01, 0.50, 0);
        this.upperBodyGroup.add(this.headGroup);

        const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.10, 14), jointTitaniumMat);
        neck.position.y = 0.04;
        this.headGroup.add(neck);

        const helmet = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.22, 0.22), armorIvoryMat);
        helmet.position.y = 0.18;
        this.headGroup.add(helmet);

        const helmCrest = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.045, 0.05), antiqueGoldMat);
        helmCrest.position.set(0.01, 0.305, 0);
        this.headGroup.add(helmCrest);

        // Gold Martial Topknot Hairpin/Bun Finial
        const topKnot = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.052, 0.065, 14), obsidianPantsMat);
        topKnot.position.set(-0.02, 0.33, 0);
        this.headGroup.add(topKnot);

        const visor = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.105, 0.19), visorMat);
        visor.position.set(0.11, 0.175, 0);
        this.headGroup.add(visor);

        const eyeGeo = new THREE.BoxGeometry(0.02, 0.028, 0.050);
        const eyeL = new THREE.Mesh(eyeGeo, coreAccentMat);
        eyeL.position.set(0.133, 0.18, -0.048);
        this.headGroup.add(eyeL);
        const eyeR = new THREE.Mesh(eyeGeo, coreAccentMat);
        eyeR.position.set(0.133, 0.18, 0.048);
        this.headGroup.add(eyeR);

        // Signature Crimson Martial Headband + Back Ribbon Tails
        const headband = new THREE.Mesh(new THREE.BoxGeometry(0.252, 0.048, 0.232), crimsonTunicMat);
        headband.position.y = 0.245;
        this.headGroup.add(headband);

        this.headbandTails = new THREE.Group();
        this.headbandTails.position.set(-0.126, 0.245, 0);
        this.headGroup.add(this.headbandTails);

        const tail1 = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.036, 0.022), crimsonTunicMat);
        tail1.position.set(-0.09, -0.04, -0.035);
        tail1.rotation.z = 0.42;
        tail1.rotation.y = 0.25;
        this.headbandTails.add(tail1);

        const tail2 = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.032, 0.022), crimsonTunicMat);
        tail2.position.set(-0.08, -0.06, 0.035);
        tail2.rotation.z = 0.56;
        tail2.rotation.y = -0.25;
        this.headbandTails.add(tail2);

        // Dual-Axis Articulated Martial Arts Arms (with Upturned Wushu Pauldrons + Brass Forearm Rings)
        const createArm = (sideSign) => {
            const shoulderSocket = new THREE.Group();
            shoulderSocket.position.set(0.0, 0.44, sideSign * 0.255);
            this.upperBodyGroup.add(shoulderSocket);

            const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.075, 0.15), crimsonTunicMat);
            pauldron.position.set(0, 0.045, sideSign * 0.025);
            pauldron.rotation.x = sideSign * -0.26;
            shoulderSocket.add(pauldron);

            const pauldronGold = new THREE.Mesh(new THREE.BoxGeometry(0.17, 0.025, 0.155), antiqueGoldMat);
            pauldronGold.position.set(0, 0.015, sideSign * 0.028);
            pauldronGold.rotation.x = sideSign * -0.26;
            shoulderSocket.add(pauldronGold);

            const shoulderBall = new THREE.Mesh(new THREE.SphereGeometry(0.066, 16, 12), jointTitaniumMat);
            shoulderSocket.add(shoulderBall);

            const abductGroup = new THREE.Group();
            shoulderSocket.add(abductGroup);

            const pitchGroup = new THREE.Group();
            abductGroup.add(pitchGroup);

            const upperArmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.048, 0.042, 0.28, 14), obsidianPantsMat);
            upperArmMesh.position.y = -0.15;
            pitchGroup.add(upperArmMesh);

            const upperSleeve = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.16, 0.10), armorIvoryMat);
            upperSleeve.position.y = -0.14;
            pitchGroup.add(upperSleeve);

            const elbowGroup = new THREE.Group();
            elbowGroup.position.y = -0.30;
            pitchGroup.add(elbowGroup);

            const elbowJoint = new THREE.Mesh(new THREE.SphereGeometry(0.050, 14, 10), jointTitaniumMat);
            elbowGroup.add(elbowJoint);

            const forearmMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.044, 0.036, 0.26, 14), armorIvoryMat);
            forearmMesh.position.y = -0.14;
            elbowGroup.add(forearmMesh);

            // Signature Hung Gar Brass/Gold Kung Fu Forearm Rings
            [-0.12, -0.17, -0.22].forEach((ry) => {
                const brassRing = new THREE.Mesh(
                    new THREE.TorusGeometry(0.045, 0.009, 8, 16),
                    antiqueGoldMat
                );
                brassRing.rotation.x = Math.PI / 2;
                brassRing.position.y = ry;
                elbowGroup.add(brassRing);
            });

            const wristLed = new THREE.Mesh(new THREE.CylinderGeometry(0.043, 0.043, 0.028, 14), coreAccentMat);
            wristLed.position.y = -0.255;
            elbowGroup.add(wristLed);

            const hand = new THREE.Mesh(new THREE.BoxGeometry(0.088, 0.095, 0.058), crimsonTunicMat);
            hand.position.y = -0.30;
            elbowGroup.add(hand);

            return { abductGroup, pitchGroup, elbowGroup };
        };

        this.leftArm = createArm(-1);
        this.rightArm = createArm(+1);

        // Articulated Wushu Martial Legs (Loose Kung Fu Trousers + Gold Knee Armor + Bound Shin Wraps)
        const createLeg = (sideSign) => {
            const hipGroup = new THREE.Group();
            hipGroup.position.set(0, -0.05, sideSign * 0.125);
            this.pelvisGroup.add(hipGroup);

            const hipSphere = new THREE.Mesh(new THREE.SphereGeometry(0.068, 14, 10), jointTitaniumMat);
            hipGroup.add(hipSphere);

            const kungfuPantThigh = new THREE.Mesh(new THREE.CylinderGeometry(0.086, 0.098, 0.37, 14), obsidianPantsMat);
            kungfuPantThigh.position.y = -0.21;
            hipGroup.add(kungfuPantThigh);

            const thighCrimsonStripe = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.32, 0.02), crimsonTunicMat);
            thighCrimsonStripe.position.set(0, -0.21, sideSign * 0.088);
            hipGroup.add(thighCrimsonStripe);

            const kneeGroup = new THREE.Group();
            kneeGroup.position.y = -0.43;
            hipGroup.add(kneeGroup);

            const kneeJoint = new THREE.Mesh(new THREE.SphereGeometry(0.062, 14, 10), antiqueGoldMat);
            kneeGroup.add(kneeJoint);

            const shinWrapBase = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.052, 0.36, 14), armorIvoryMat);
            shinWrapBase.position.y = -0.20;
            kneeGroup.add(shinWrapBase);

            [-0.12, -0.21, -0.30].forEach((sy) => {
                const strap = new THREE.Mesh(new THREE.CylinderGeometry(0.064, 0.064, 0.028, 14), crimsonTunicMat);
                strap.position.y = sy;
                kneeGroup.add(strap);
            });

            const ankleGroup = new THREE.Group();
            ankleGroup.position.y = -0.42;
            kneeGroup.add(ankleGroup);

            // Traditional Black Cloth Wushu Martial Shoe with Ivory Sole
            const shoeUpper = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.052, 0.132), obsidianPantsMat);
            shoeUpper.position.set(0.045, -0.018, 0);
            ankleGroup.add(shoeUpper);

            const shoeSole = new THREE.Mesh(new THREE.BoxGeometry(0.248, 0.018, 0.136), armorIvoryMat);
            shoeSole.position.set(0.045, -0.048, 0);
            ankleGroup.add(shoeSole);

            return { hipGroup, kneeGroup, ankleGroup };
        };

        this.leftLeg = createLeg(-1);
        this.rightLeg = createLeg(+1);
    }

    /**
     * Updates robot pose & locomotion cleanly from MotionLabEngine snapshot.
     */
    applyMotionState(state) {
        if (!state || !this.robotRoot) return;
        this.latestMotionState = state;

        this.robotRoot.position.set(state.posX || 0, 0, state.posZ || 0);
        this.robotRoot.rotation.y = state.yaw || 0;

        if (this.floorReticleGroup) {
            this.floorReticleGroup.position.set(state.posX || 0, 0, state.posZ || 0);
        }

        const j = state.joints || {};
        const squat = Math.max(0, Math.min(1, Number(j.squatDepth ?? 0)));
        const jump = Math.max(0, Math.min(1, Number(j.jumpHeight ?? 0)));
        const kick = Math.max(-1, Math.min(1, Number(j.kickLeg ?? 0)));

        const standHipY = 0.92;
        const squatDrop = squat * 0.28;
        const jumpLift = jump * 0.92;

        const walkI = Number(state.walkIntensity ?? 0);
        const walkP = Number(state.walkPhase ?? 0);
        const walkBob = walkI * Math.abs(Math.sin(walkP)) * 0.025;

        this.pelvisGroup.position.y = standHipY - squatDrop + jumpLift + walkBob;

        if (this.bodyShadowMesh) {
            const shadowScale = Math.max(0.45, 1.0 - jump * 0.45);
            this.bodyShadowMesh.scale.set(shadowScale, shadowScale, 1);
            this.bodyShadowMesh.material.opacity = 0.46 * (1.0 - jump * 0.52);
        }

        const torsoPitch = Number(j.torsoPitch ?? 0) + squat * 0.24;
        const torsoRoll = Number(j.torsoRoll ?? 0);
        this.upperBodyGroup.rotation.z = -torsoPitch;
        this.upperBodyGroup.rotation.x = torsoRoll;

        if (this.headGroup) {
            this.headGroup.rotation.y = Number(j.headYaw ?? 0);
            this.headGroup.rotation.z = Math.max(-0.35, Math.min(0.45, torsoPitch * 0.45));
        }

        if (this.headbandTails) {
            const flutter = Math.sin(performance.now() * 0.012) * (0.10 + jump * 0.28 + walkI * 0.14);
            this.headbandTails.rotation.z = -0.15 - jump * 0.42 + flutter;
        }

        if (this.leftArm) {
            this.leftArm.abductGroup.rotation.x = Math.max(-0.15, Number(j.armAbductL ?? 0.08));
            const walkArmSwingL = walkI * Math.sin(walkP + Math.PI) * 0.35;
            this.leftArm.pitchGroup.rotation.z = Number(j.armRaiseL ?? 0) + walkArmSwingL;
            this.leftArm.elbowGroup.rotation.z = Math.max(0, Number(j.elbowFlexL ?? j.elbowL ?? 0.15));
        }
        if (this.rightArm) {
            this.rightArm.abductGroup.rotation.x = -Math.max(-0.15, Number(j.armAbductR ?? 0.08));
            const walkArmSwingR = walkI * Math.sin(walkP) * 0.35;
            this.rightArm.pitchGroup.rotation.z = Number(j.armRaiseR ?? 0) + walkArmSwingR;
            this.rightArm.elbowGroup.rotation.z = Math.max(0, Number(j.elbowFlexR ?? j.elbowR ?? 0.15));
        }

        const squatHipAngle = squat * 0.85;
        const squatKneeAngle = -squat * 1.65;
        const squatAnkleAngle = squat * 0.80;
        const horseStanceFlare = squat * 0.24;

        const strideHipL = walkI * Math.sin(walkP) * 0.48;
        const strideKneeL = -Math.max(0, -Math.cos(walkP)) * walkI * 0.55;
        const strideHipR = walkI * Math.sin(walkP + Math.PI) * 0.48;
        const strideKneeR = -Math.max(0, Math.cos(walkP)) * walkI * 0.55;

        const craneLeft = kick < -0.05 ? (-kick) : 0;
        const flyingRight = kick > 0.05 ? kick : 0;

        const kickHipL = craneLeft * 1.42 + jump * (flyingRight > 0.1 ? 0.92 : 0.72);
        const kickKneeL = -craneLeft * 1.65 - jump * (flyingRight > 0.1 ? 1.65 : 1.25);
        const kickHipR = flyingRight * 1.48 + jump * (craneLeft > 0.1 ? 0.78 : 0);
        const kickKneeR = -flyingRight * 0.14 - jump * (craneLeft > 0.1 ? 1.35 : 0);

        if (this.leftLeg) {
            this.leftLeg.hipGroup.rotation.x = -horseStanceFlare;
            this.leftLeg.hipGroup.rotation.z = squatHipAngle + strideHipL + kickHipL;
            this.leftLeg.kneeGroup.rotation.z = squatKneeAngle + strideKneeL + kickKneeL;
            this.leftLeg.ankleGroup.rotation.z = squatAnkleAngle * (1 - jump) - strideHipL * 0.4 - strideKneeL * 0.4;
        }
        if (this.rightLeg) {
            this.rightLeg.hipGroup.rotation.x = horseStanceFlare;
            this.rightLeg.hipGroup.rotation.z = squatHipAngle + strideHipR + kickHipR;
            this.rightLeg.kneeGroup.rotation.z = squatKneeAngle + strideKneeR + kickKneeR;
            this.rightLeg.ankleGroup.rotation.z = squatAnkleAngle * (1 - jump) - strideHipR * 0.4 - strideKneeR * 0.4;
        }
    }

    /**
     * Dynamically shifts stage & humanoid Chi core accent LEDs by Step / Mode.
     */
    setAccentTheme(mode) {
        this.currentAccentMode = mode || 'HUMAN_DEMO';
        const themes = {
            HUMAN_DEMO: { color: 0x22d3ee, emissive: 0x06b6d4 },
            REPLAY: { color: 0x38bdf8, emissive: 0x0284c7 },
            BC_TRAINING: { color: 0xfbbf24, emissive: 0xd97706 },
            BC_AUTONOMOUS: { color: 0x10b981, emissive: 0x059669 }
        };
        const t = themes[this.currentAccentMode] || themes.HUMAN_DEMO;
        for (const mat of this.accentMaterials) {
            mat.color.setHex(t.color);
            mat.emissive.setHex(t.emissive);
        }
        if (this.envStepAccentMat) {
            this.envStepAccentMat.color.setHex(t.color);
            this.envStepAccentMat.emissive.setHex(t.emissive);
        }
    }

    setCameraPreset(preset) {
        this.camViewMode = preset;
        switch (preset) {
            case 'front':
                this.camTheta = 0.0;
                this.camPhi = 1.28;
                this.camRadius = 4.65;
                this.camTarget.set(0, 1.0, 0);
                break;
            case 'iso':
                this.camTheta = 0.68;
                this.camPhi = 1.12;
                this.camRadius = 5.1;
                this.camTarget.set(0, 0.96, 0);
                break;
            case 'side':
                this.camTheta = Math.PI / 2;
                this.camPhi = 1.38;
                this.camRadius = 4.55;
                this.camTarget.set(0, 0.95, 0);
                break;
            case 'top':
                this.camTheta = 0.0;
                this.camPhi = 0.25;
                this.camRadius = 6.4;
                this.camTarget.set(0, 0.4, 0);
                break;
        }
        this._updateCameraTransform();
    }

    setFollowRobot(enabled) {
        this.followRobot = Boolean(enabled);
    }

    _updateCameraTransform() {
        if (!this.camera || !this.camTarget) return;
        let tx = this.camTarget.x;
        let ty = this.camTarget.y;
        let tz = this.camTarget.z;

        if (this.followRobot && this.robotRoot) {
            tx = this.robotRoot.position.x * 0.7;
            tz = this.robotRoot.position.z * 0.7;
        }

        const sinPhi = Math.sin(this.camPhi);
        const cx = tx + this.camRadius * sinPhi * Math.cos(this.camTheta);
        const cy = ty + this.camRadius * Math.cos(this.camPhi);
        const cz = tz + this.camRadius * sinPhi * Math.sin(this.camTheta);

        this.camera.position.set(cx, Math.max(0.35, cy), cz);
        this.camera.lookAt(tx, ty, tz);
    }

    _bindPointerControls() {
        this.canvas.addEventListener('pointerdown', (e) => {
            this._isDragging = true;
            this._lastMouse = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('pointermove', this._onPtrMove = (e) => {
            if (!this._isDragging) return;
            const dx = e.clientX - this._lastMouse.x;
            const dy = e.clientY - this._lastMouse.y;
            this._lastMouse = { x: e.clientX, y: e.clientY };

            this.camTheta += dx * 0.008;
            this.camPhi = Math.max(0.18, Math.min(1.48, this.camPhi - dy * 0.007));
        });

        window.addEventListener('pointerup', this._onPtrUp = () => {
            this._isDragging = false;
        });

        this.canvas.addEventListener('wheel', (e) => {
            e.preventDefault();
            this.camRadius = Math.max(2.3, Math.min(9.5, this.camRadius + e.deltaY * 0.004));
        }, { passive: false });

        this.canvas.addEventListener('dblclick', () => {
            this.setCameraPreset(this.camViewMode || 'front');
        });
    }

    resize() {
        if (!this.renderer || !this.camera || !this.container) return;
        const w = Math.max(280, this.container.clientWidth);
        const h = Math.max(240, this.container.clientHeight);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h, false);
    }

    _startRenderLoop() {
        this._lastRenderAt = performance.now();
        const render = () => {
            if (this.isDisposed) return;
            this.animId = requestAnimationFrame(render);

            const now = performance.now();
            const dtSec = Math.min(0.05, Math.max(0.001, (now - this._lastRenderAt) * 0.001));
            this._lastRenderAt = now;

            this._fpsFrames++;
            if (now - this._fpsLastAt >= 600) {
                this._currentFps = Math.round((this._fpsFrames * 1000) / (now - this._fpsLastAt));
                this._fpsFrames = 0;
                this._fpsLastAt = now;
            }

            if (this.envUpdateFn) {
                this.envUpdateFn(dtSec, now * 0.001);
            }

            if (this.floorReticleGroup) {
                this.floorReticleGroup.rotation.y += dtSec * 0.6;
            }

            this._updateCameraTransform();
            this.renderer.render(this.scene, this.camera);

            if (now - this._lastHudEmitAt >= 85) {
                this._lastHudEmitAt = now;
                this.onHudUpdate({
                    fps: this._currentFps,
                    motionState: this.latestMotionState
                });
            }
        };
        this.animId = requestAnimationFrame(render);
    }

    dispose() {
        this.isDisposed = true;
        if (this.animId) cancelAnimationFrame(this.animId);
        if (this._resizeObserver) this._resizeObserver.disconnect();
        window.removeEventListener('resize', this._onWinResize);
        window.removeEventListener('pointermove', this._onPtrMove);
        window.removeEventListener('pointerup', this._onPtrUp);
        if (this.envGroup) disposeThreeGroup(this.envGroup);
        if (this.envStepAccentMat) this.envStepAccentMat.dispose();
        if (this.renderer) this.renderer.dispose();
    }
}
