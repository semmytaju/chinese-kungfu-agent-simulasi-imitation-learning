/**
 * EnvironmentPreview3D.js
 * Lightweight interactive Three.js 3D Preview stage inside Studio Settings.
 * Allows users to orbit and visually inspect any of the 11 Kungfu 3D environments
 * live in 3D before clicking "Apply Environment" on the main simulation canvas.
 */

import {
    DEFAULT_ENVIRONMENT_ID,
    buildEnvironmentScene,
    disposeThreeGroup
} from './EnvironmentPresets.js?v=20261114w2';

export class EnvironmentPreview3D {
    constructor(options = {}) {
        this.canvas = options.canvas;
        this.container = options.container || this.canvas?.parentElement;
        this.currentEnvId = options.initialEnvId || DEFAULT_ENVIRONMENT_ID;

        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.envGroup = null;
        this.statueGroup = null;
        this.stepAccentMat = null;
        this.envUpdateFn = () => {};

        this.animId = null;
        this.isRunning = false;
        this.isDisposed = false;
        this._lastTickAt = 0;

        this._isDragging = false;
        this._userHasDragged = false;
        this._lastMouse = { x: 0, y: 0 };
        this.camTheta = 0.54;
        this.camPhi = 1.08;
        this.camRadius = 6.9;

        this._init();
    }

    _init() {
        if (!this.canvas || typeof window.THREE === 'undefined') return;
        const THREE = window.THREE;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x0d070c);
        this.scene.fog = new THREE.FogExp2(0x0d070c, 0.036);

        const w = Math.max(280, this.container?.clientWidth || 420);
        const h = Math.max(200, this.container?.clientHeight || 240);
        this.camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 55);

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setPixelRatio(1);
        this.renderer.setSize(w, h, false);
        this.renderer.shadowMap.enabled = false;
        if ('outputColorSpace' in this.renderer && THREE.SRGBColorSpace) {
            this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        }

        this.stepAccentMat = new THREE.MeshStandardMaterial({
            color: 0x22d3ee,
            emissive: 0x06b6d4,
            emissiveIntensity: 1.35,
            roughness: 0.22
        });
        this.stepAccentMat.userData = { sharedMaterial: true };

        this.envGroup = new THREE.Group();
        this.scene.add(this.envGroup);

        this._buildScaleStatue(THREE);
        this.setEnvironment(this.currentEnvId);
        this._bindPointer();
    }

    _buildScaleStatue(THREE) {
        this.statueGroup = new THREE.Group();
        const ivoryMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.3, metalness: 0.35 });
        const redMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.38, metalness: 0.25 });
        const goldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.25, metalness: 0.8 });
        const darkMat = new THREE.MeshStandardMaterial({ color: 0x181c28, roughness: 0.45, metalness: 0.45 });

        const torso = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.46, 0.38), redMat);
        torso.position.y = 1.18;
        this.statueGroup.add(torso);

        const chestCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.075, 0), this.stepAccentMat);
        chestCore.position.set(0.15, 1.24, 0);
        this.statueGroup.add(chestCore);

        const sash = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.08, 0.40), goldMat);
        sash.position.y = 0.92;
        this.statueGroup.add(sash);

        const head = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 0.24), ivoryMat);
        head.position.y = 1.56;
        this.statueGroup.add(head);

        const headband = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.06, 0.26), redMat);
        headband.position.y = 1.62;
        this.statueGroup.add(headband);

        const bun = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.065, 0.09, 10), goldMat);
        bun.position.y = 1.72;
        this.statueGroup.add(bun);

        [-0.25, 0.25].forEach((zOff, idx) => {
            const pauldron = new THREE.Mesh(new THREE.BoxGeometry(0.20, 0.10, 0.22), redMat);
            pauldron.position.set(0, 1.38, zOff);
            this.statueGroup.add(pauldron);

            const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.05, 0.48, 8), ivoryMat);
            arm.rotation.z = idx === 0 ? -1.15 : -0.65;
            arm.position.set(idx === 0 ? 0.26 : 0.14, 1.20, zOff * 1.1);
            this.statueGroup.add(arm);

            const leg = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.06, 0.85, 8), darkMat);
            leg.rotation.z = idx === 0 ? 0.25 : -0.25;
            leg.position.set(idx === 0 ? 0.12 : -0.10, 0.43, zOff * 0.55);
            this.statueGroup.add(leg);
        });

        const ring = new THREE.Mesh(
            new THREE.RingGeometry(0.45, 0.49, 32),
            new THREE.MeshBasicMaterial({ color: 0xfbbf24, transparent: true, opacity: 0.65, side: THREE.DoubleSide })
        );
        ring.rotation.x = -Math.PI / 2;
        ring.position.y = 0.015;
        this.statueGroup.add(ring);

        this.scene.add(this.statueGroup);
    }

    setEnvironment(envId) {
        if (!this.scene || !this.envGroup || !window.THREE) return null;
        const THREE = window.THREE;

        disposeThreeGroup(this.envGroup);

        const built = buildEnvironmentScene(THREE, envId, {
            parent: this.envGroup,
            stepAccentMat: this.stepAccentMat
        });
        this.currentEnvId = built.meta.id;
        this.envUpdateFn = built.update;

        this.scene.background.setHex(built.meta.backgroundHex);
        this.scene.fog.color.setHex(built.meta.fogHex);
        this.scene.fog.density = built.meta.fogDensity;

        this._userHasDragged = false;
        this._renderSingleFrame(0, 0);
        return built.meta;
    }

    _updateCamera(tSec) {
        if (!this.camera) return;
        if (!this._isDragging && !this._userHasDragged) {
            this.camTheta = 0.52 + Math.sin(tSec * 0.38) * 0.42;
        }
        const tx = -0.38;
        const ty = 1.05;
        const tz = 0;
        const sinPhi = Math.sin(this.camPhi);
        const cx = tx + this.camRadius * sinPhi * Math.cos(this.camTheta);
        const cy = ty + this.camRadius * Math.cos(this.camPhi);
        const cz = tz + this.camRadius * sinPhi * Math.sin(this.camTheta);
        this.camera.position.set(cx, Math.max(0.6, cy), cz);
        this.camera.lookAt(tx, ty, tz);
    }

    _renderSingleFrame(dtSec, tSec) {
        if (!this.renderer || !this.scene || !this.camera) return;
        this.envUpdateFn(dtSec, tSec);
        this._updateCamera(tSec);
        this.renderer.render(this.scene, this.camera);
    }

    start() {
        if (this.isDisposed || this.isRunning || !this.renderer) return;
        this.isRunning = true;
        this._lastTickAt = performance.now();
        this.resize();

        const loop = () => {
            if (!this.isRunning || this.isDisposed) return;
            this.animId = requestAnimationFrame(loop);
            const now = performance.now();
            const dtSec = Math.min(0.05, Math.max(0.001, (now - this._lastTickAt) * 0.001));
            this._lastTickAt = now;
            this._renderSingleFrame(dtSec, now * 0.001);
        };
        this.animId = requestAnimationFrame(loop);
    }

    stop() {
        this.isRunning = false;
        if (this.animId) {
            cancelAnimationFrame(this.animId);
            this.animId = null;
        }
    }

    resize() {
        if (!this.renderer || !this.camera || !this.container) return;
        const w = Math.max(260, this.container.clientWidth);
        const h = Math.max(190, this.container.clientHeight);
        this.camera.aspect = w / h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h, false);
    }

    _bindPointer() {
        if (!this.canvas) return;
        this.canvas.addEventListener('pointerdown', (e) => {
            this._isDragging = true;
            this._userHasDragged = true;
            this._lastMouse = { x: e.clientX, y: e.clientY };
        });

        window.addEventListener('pointermove', this._onPtrMove = (e) => {
            if (!this._isDragging) return;
            const dx = e.clientX - this._lastMouse.x;
            const dy = e.clientY - this._lastMouse.y;
            this._lastMouse = { x: e.clientX, y: e.clientY };
            this.camTheta += dx * 0.009;
            this.camPhi = Math.max(0.45, Math.min(1.42, this.camPhi - dy * 0.007));
        });

        window.addEventListener('pointerup', this._onPtrUp = () => {
            this._isDragging = false;
        });
    }

    dispose() {
        this.isDisposed = true;
        this.stop();
        window.removeEventListener('pointermove', this._onPtrMove);
        window.removeEventListener('pointerup', this._onPtrUp);
        if (this.envGroup) disposeThreeGroup(this.envGroup);
        if (this.statueGroup) disposeThreeGroup(this.statueGroup);
        if (this.stepAccentMat) this.stepAccentMat.dispose();
        if (this.renderer) this.renderer.dispose();
    }
}
