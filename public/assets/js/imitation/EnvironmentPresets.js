/**
 * EnvironmentPresets.js
 * Modular 3D Dojo & Arena Builder featuring:
 *   - 1 Classic Default: Shaolin Taiji Courtyard
 *   - 10 Brand-New 3D Environments (Bamboo Forest, Imperial Hall, Snow Peak, Sunset Cliff,
 *     Cyber Dojo, Waterfall Cavern, Sakura Garden, Obsidian Forge, Cloud Temple, Maple Yard)
 * Engineered for lightweight 60 FPS rendering alongside MoveNet WebGL inference and clean
 * resource disposal when switching or previewing environments in Studio Settings.
 */

export const DEFAULT_ENVIRONMENT_ID = 'shaolin_courtyard';

export const ENVIRONMENT_CATALOG = [
    {
        id: 'shaolin_courtyard',
        isNew: false,
        name: 'Shaolin Taiji Courtyard',
        category: 'Classic Temple',
        lightingMood: 'Lantern Moonlight',
        description: 'Classic octagonal basalt & rosewood Taiji podium framed by red lacquer lantern columns, Paifang archway, and Bo-staff racks.',
        palette: ['#0d070c', '#8f1d1d', '#f59e0b'],
        reticleHex: 0xf59e0b,
        backgroundHex: 0x0d070c,
        fogHex: 0x0d070c,
        fogDensity: 0.036
    },
    {
        id: 'bamboo_mist_grove',
        isNew: true,
        name: 'Misty Emerald Bamboo Forest',
        category: 'Nature Sanctuary',
        lightingMood: 'Jade Morning Mist',
        description: 'Moss-edged bluestone terrace surrounded by swaying emerald bamboo stalks, stone garden lanterns, and drifting jade fireflies.',
        palette: ['#071914', '#15803d', '#34d399'],
        reticleHex: 0x34d399,
        backgroundHex: 0x071914,
        fogHex: 0x09201a,
        fogDensity: 0.042
    },
    {
        id: 'imperial_palace_hall',
        isNew: true,
        name: 'Forbidden Imperial Dragon Hall',
        category: 'Imperial Palace',
        lightingMood: 'Golden Throne Glow',
        description: 'Carved white marble plinth with crimson-gold dragon carpet floor, spiral dragon pillars, imperial calligraphy screen, and brass censers.',
        palette: ['#18080b', '#991b1b', '#fbbf24'],
        reticleHex: 0xfbbf24,
        backgroundHex: 0x16070a,
        fogHex: 0x1a090d,
        fogDensity: 0.032
    },
    {
        id: 'snow_summit_dojo',
        isNew: true,
        name: 'Kunlun Snow Peak Dojo',
        category: 'Alpine Summit',
        lightingMood: 'Crisp Ice Twilight',
        description: 'High-altitude frosted granite octagon surrounded by jagged snow-capped crags, winter pines, blazing fire braziers, and falling snow.',
        palette: ['#0b1628', '#38bdf8', '#f1f5f9'],
        reticleHex: 0x38bdf8,
        backgroundHex: 0x0b1628,
        fogHex: 0x0f2038,
        fogDensity: 0.038
    },
    {
        id: 'sunset_canyon_pavilion',
        isNew: true,
        name: 'Huashan Cliff Sunset Arena',
        category: 'Cliffside Vista',
        lightingMood: 'Warm Amber Dusk',
        description: 'Sandstone cliff-edge sparring deck with pagoda pavilion eaves, fluttering crimson war banners, canyon monoliths, and rising dusk embers.',
        palette: ['#261015', '#ea580c', '#fde047'],
        reticleHex: 0xfb923c,
        backgroundHex: 0x261015,
        fogHex: 0x321417,
        fogDensity: 0.034
    },
    {
        id: 'neon_cyber_dojo',
        isNew: true,
        name: 'Neo-Shanghai Cyber Wushu Grid',
        category: 'Futuristic Cyber',
        lightingMood: 'Synthwave Neon',
        description: 'Carbon-alloy hex stage with holographic Taiji projection, glowing seal-script monoliths, scanning portal ring, and hovering quad drones.',
        palette: ['#050814', '#ec4899', '#22d3ee'],
        reticleHex: 0x22d3ee,
        backgroundHex: 0x050814,
        fogHex: 0x070b1c,
        fogDensity: 0.034
    },
    {
        id: 'waterfall_grotto_shrine',
        isNew: true,
        name: 'Heavenly Waterfall Cavern',
        category: 'Sacred Grotto',
        lightingMood: 'Aqua Bioluminescence',
        description: 'Slate lotus island ringed by an aqua spring moat, cascading shimmering waterfall curtain, cave stalagmites, and floating lotus lanterns.',
        palette: ['#06171d', '#0284c7', '#2dd4bf'],
        reticleHex: 0x2dd4bf,
        backgroundHex: 0x06171d,
        fogHex: 0x081e26,
        fogDensity: 0.036
    },
    {
        id: 'cherry_blossom_garden',
        isNew: true,
        name: 'Sakura & Red Bridge Garden',
        category: 'Blossom Courtyard',
        lightingMood: 'Plum Dusk Serenity',
        description: 'Zen slate and cedar pond deck adorned with an arched crimson footbridge, blooming cherry blossom trees, stone lanterns, and falling petals.',
        palette: ['#1a0e1e', '#f472b6', '#fca5a5'],
        reticleHex: 0xf472b6,
        backgroundHex: 0x1a0e1e,
        fogHex: 0x221226,
        fogDensity: 0.035
    },
    {
        id: 'volcanic_forge_foundry',
        isNew: true,
        name: 'Obsidian Shaolin Iron Forge',
        category: 'Volcanic Foundry',
        lightingMood: 'Molten Magma Underglow',
        description: 'Chain-suspended iron & basalt octagon hovering over glowing magma veins, molten cascade backdrop, war gong, and rising forge sparks.',
        palette: ['#160806', '#dc2626', '#f97316'],
        reticleHex: 0xf97316,
        backgroundHex: 0x160806,
        fogHex: 0x210b07,
        fogDensity: 0.035
    },
    {
        id: 'celestial_cloud_palace',
        isNew: true,
        name: 'Tianmen Cloud Temple',
        category: 'Celestial Realm',
        lightingMood: 'Luminous Sky Dawn',
        description: 'White celestial jade terrace inlaid with constellations above drifting cloud banks, golden heavenly gate pillars, and rotating dharma halos.',
        palette: ['#142038', '#e2e8f0', '#fcd34d'],
        reticleHex: 0xfcd34d,
        backgroundHex: 0x142038,
        fogHex: 0x192846,
        fogDensity: 0.030
    },
    {
        id: 'autumn_maple_temple',
        isNew: true,
        name: 'Crimson Maple Meditation Yard',
        category: 'Autumn Monastery',
        lightingMood: 'Burnt Sienna Sunset',
        description: 'Aged cedar deck inside a raked Zen gravel yard with wooden temple bell tower, balanced cairn stones, scarlet maples, and drifting leaves.',
        palette: ['#1e110a', '#c2410c', '#fbbf24'],
        reticleHex: 0xf59e0b,
        backgroundHex: 0x1e110a,
        fogHex: 0x27160c,
        fogDensity: 0.036
    }
];

export function getEnvironmentMeta(envId) {
    return ENVIRONMENT_CATALOG.find((e) => e.id === envId) || ENVIRONMENT_CATALOG[0];
}

export function disposeThreeGroup(group) {
    if (!group) return;
    const disposedTextures = new Set();
    const disposedMaterials = new Set();

    const disposeMat = (mat) => {
        if (!mat || disposedMaterials.has(mat) || mat.userData?.sharedMaterial) return;
        disposedMaterials.add(mat);
        const texKeys = ['map', 'emissiveMap', 'alphaMap', 'roughnessMap', 'bumpMap'];
        for (const k of texKeys) {
            if (mat[k] && !disposedTextures.has(mat[k]) && !mat[k].userData?.sharedTexture) {
                disposedTextures.add(mat[k]);
                mat[k].dispose();
            }
        }
        mat.dispose();
    };

    group.traverse((obj) => {
        if (obj.geometry) {
            obj.geometry.dispose();
        }
        if (obj.material) {
            if (Array.isArray(obj.material)) {
                obj.material.forEach(disposeMat);
            } else {
                disposeMat(obj.material);
            }
        }
    });

    while (group.children.length > 0) {
        group.remove(group.children[0]);
    }
}

function makeCanvasTexture(THREE, width, height, drawFn) {
    const c = document.createElement('canvas');
    c.width = width;
    c.height = height;
    const ctx = c.getContext('2d');
    drawFn(ctx, width, height);
    const tex = new THREE.CanvasTexture(c);
    if ('colorSpace' in tex && THREE.SRGBColorSpace) {
        tex.colorSpace = THREE.SRGBColorSpace;
    }
    return tex;
}

function createSoftParticleTexture(THREE, innerRgba, midRgba) {
    return makeCanvasTexture(THREE, 64, 64, (ctx, w, h) => {
        const g = ctx.createRadialGradient(w / 2, h / 2, 2, w / 2, h / 2, w / 2);
        g.addColorStop(0, innerRgba);
        g.addColorStop(0.45, midRgba);
        g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
    });
}

function drawTaijiMedallion(ctx, cx, cy, r, yinHex, yangHex, strokeRgba) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fillStyle = yinHex;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, r, -Math.PI / 2, Math.PI / 2);
    ctx.fillStyle = yangHex;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy - r / 2, r / 2, 0, Math.PI * 2);
    ctx.fillStyle = yangHex;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy + r / 2, r / 2, 0, Math.PI * 2);
    ctx.fillStyle = yinHex;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy - r / 2, r * 0.148, 0, Math.PI * 2);
    ctx.fillStyle = yinHex;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy + r / 2, r * 0.148, 0, Math.PI * 2);
    ctx.fillStyle = yangHex;
    ctx.fill();

    ctx.strokeStyle = strokeRgba;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
}

function drawBaguaTrigrams(ctx, cx, cy, radius, fillRgba) {
    const trigrams = [
        [1, 1, 1], [0, 1, 1], [1, 0, 1], [0, 0, 1],
        [1, 1, 0], [0, 1, 0], [1, 0, 0], [0, 0, 0]
    ];
    trigrams.forEach((bars, idx) => {
        const ang = (idx * Math.PI) / 4;
        ctx.save();
        ctx.translate(cx + Math.cos(ang) * radius, cy + Math.sin(ang) * radius);
        ctx.rotate(ang + Math.PI / 2);
        ctx.fillStyle = fillRgba;
        bars.forEach((solid, bIdx) => {
            const by = -9 + bIdx * 8;
            if (solid) {
                ctx.fillRect(-16, by, 32, 4);
            } else {
                ctx.fillRect(-16, by, 13, 4);
                ctx.fillRect(3, by, 13, 4);
            }
        });
        ctx.restore();
    });
}

function createStageMatTexture(THREE, opts) {
    return makeCanvasTexture(THREE, 512, 512, (ctx, w, h) => {
        const cx = w / 2;
        const cy = h / 2;
        const grad = ctx.createRadialGradient(cx, cy, 20, cx, cy, 255);
        grad.addColorStop(0, opts.bgInner);
        grad.addColorStop(0.6, opts.bgMid);
        grad.addColorStop(1, opts.bgOuter);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);

        if (opts.plankColor) {
            ctx.strokeStyle = opts.plankColor;
            ctx.lineWidth = 1.5;
            for (let y = 16; y < h; y += 22) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }
        }

        if (opts.hexGridColor) {
            ctx.strokeStyle = opts.hexGridColor;
            ctx.lineWidth = 1.5;
            for (let i = 0; i < w; i += 32) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, h);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(w, i);
                ctx.stroke();
            }
        }

        if (opts.crackColor) {
            ctx.strokeStyle = opts.crackColor;
            ctx.lineWidth = 2.6;
            for (let k = 0; k < 10; k++) {
                const a = (k / 10) * Math.PI * 2 + 0.2;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(a) * 110, cy + Math.sin(a) * 110);
                ctx.lineTo(cx + Math.cos(a + 0.14) * 175, cy + Math.sin(a + 0.14) * 175);
                ctx.lineTo(cx + Math.cos(a - 0.08) * 238, cy + Math.sin(a - 0.08) * 238);
                ctx.stroke();
            }
        }

        ctx.strokeStyle = opts.outerRingColor;
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.arc(cx, cy, 232, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = opts.innerRingColor;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(cx, cy, 184, 0, Math.PI * 2);
        ctx.stroke();

        if (opts.radialSpokes) {
            ctx.strokeStyle = opts.radialSpokes;
            ctx.lineWidth = 1.5;
            for (let i = 0; i < 12; i++) {
                const ang = (i * Math.PI) / 6;
                ctx.beginPath();
                ctx.moveTo(cx + Math.cos(ang) * 96, cy + Math.sin(ang) * 96);
                ctx.lineTo(cx + Math.cos(ang) * 232, cy + Math.sin(ang) * 232);
                ctx.stroke();
            }
        }

        if (opts.baguaColor) {
            drawBaguaTrigrams(ctx, cx, cy, 208, opts.baguaColor);
        }

        drawTaijiMedallion(
            ctx,
            cx,
            cy,
            opts.taijiRadius || 84,
            opts.yinColor || '#141216',
            opts.yangColor || '#e7d5b0',
            opts.taijiStroke || opts.outerRingColor
        );
    });
}

function createLatticeScreenTexture(THREE, topHex = '#78350f', midHex = '#9a3412', botHex = '#451a03', barHex = '#29100a') {
    return makeCanvasTexture(THREE, 256, 512, (ctx) => {
        const bg = ctx.createLinearGradient(0, 0, 0, 512);
        bg.addColorStop(0, topHex);
        bg.addColorStop(0.5, midHex);
        bg.addColorStop(1, botHex);
        ctx.fillStyle = bg;
        ctx.fillRect(0, 0, 256, 512);

        ctx.strokeStyle = barHex;
        ctx.lineWidth = 8;
        ctx.strokeRect(8, 8, 240, 496);

        ctx.lineWidth = 5;
        for (let y = 32; y < 500; y += 44) {
            ctx.beginPath();
            ctx.moveTo(10, y);
            ctx.lineTo(246, y);
            ctx.stroke();
        }
        for (let x = 44; x < 240; x += 52) {
            ctx.beginPath();
            ctx.moveTo(x, 10);
            ctx.lineTo(x, 502);
            ctx.stroke();
        }
    });
}

function addLightingRig(THREE, parent, cfg) {
    const hemi = new THREE.HemisphereLight(cfg.hemiSky, cfg.hemiGround, cfg.hemiIntensity);
    parent.add(hemi);

    const keyLight = new THREE.DirectionalLight(cfg.keyColor, cfg.keyIntensity);
    keyLight.position.set(4.5, 7.8, 3.8);
    parent.add(keyLight);

    const rimLight = new THREE.DirectionalLight(cfg.rimColor, cfg.rimIntensity);
    rimLight.position.set(-4.6, 4.4, -3.5);
    parent.add(rimLight);

    if (cfg.pointA) {
        const pA = new THREE.PointLight(cfg.pointA.color, cfg.pointA.intensity, 18);
        pA.position.set(...cfg.pointA.pos);
        parent.add(pA);
    }
    if (cfg.pointB) {
        const pB = new THREE.PointLight(cfg.pointB.color, cfg.pointB.intensity, 16);
        pB.position.set(...cfg.pointB.pos);
        parent.add(pB);
    }
}

function addParticleField(THREE, parent, count, bounds, colorHex, size, mode, softColorA, softColorB) {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);

    for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * bounds.x * 2;
        positions[i * 3 + 1] = bounds.yMin + Math.random() * (bounds.yMax - bounds.yMin);
        positions[i * 3 + 2] = (Math.random() - 0.5) * bounds.z * 2;
        speeds[i] = 0.45 + Math.random() * 0.85;
        phases[i] = Math.random() * Math.PI * 2;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const tex = createSoftParticleTexture(THREE, softColorA || 'rgba(255,255,255,1)', softColorB || 'rgba(255,255,255,0.45)');
    const mat = new THREE.PointsMaterial({
        color: colorHex,
        map: tex,
        size,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });

    const pts = new THREE.Points(geo, mat);
    parent.add(pts);

    return (dtSec, tSec) => {
        const attr = geo.getAttribute('position');
        const arr = attr.array;
        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const spd = speeds[i];
            const ph = phases[i];
            if (mode === 'fall') {
                arr[ix + 1] -= spd * dtSec * 0.95;
                arr[ix] += Math.sin(tSec * 1.1 + ph) * dtSec * 0.35;
                arr[ix + 2] += Math.cos(tSec * 0.9 + ph) * dtSec * 0.35;
                if (arr[ix + 1] < bounds.yMin) arr[ix + 1] = bounds.yMax;
            } else if (mode === 'rise') {
                arr[ix + 1] += spd * dtSec * 1.15;
                arr[ix] += Math.sin(tSec * 2.2 + ph) * dtSec * 0.25;
                if (arr[ix + 1] > bounds.yMax) arr[ix + 1] = bounds.yMin;
            } else {
                arr[ix] += Math.sin(tSec * 0.7 + ph) * dtSec * 0.28;
                arr[ix + 1] += Math.cos(tSec * 1.3 + ph) * dtSec * 0.16;
                arr[ix + 2] += Math.sin(tSec * 0.8 + ph * 1.3) * dtSec * 0.28;
            }
        }
        attr.needsUpdate = true;
    };
}

function addOctagonBase(THREE, parent, baseMat, rimMat, stageTex, stepAccentMat, radiusScale = 1.0) {
    const octBase = new THREE.Mesh(
        new THREE.CylinderGeometry(3.65 * radiusScale, 3.88 * radiusScale, 0.16, 8),
        baseMat
    );
    octBase.rotation.y = Math.PI / 8;
    octBase.position.y = -0.08;
    parent.add(octBase);

    const octRim = new THREE.Mesh(
        new THREE.TorusGeometry(3.52 * radiusScale, 0.036, 8, 8),
        rimMat
    );
    octRim.rotation.x = Math.PI / 2;
    octRim.rotation.z = Math.PI / 8;
    octRim.position.y = 0.008;
    parent.add(octRim);

    const arenaMat = new THREE.Mesh(
        new THREE.CylinderGeometry(3.32 * radiusScale, 3.32 * radiusScale, 0.022, 48),
        new THREE.MeshStandardMaterial({ map: stageTex, roughness: 0.52, metalness: 0.16 })
    );
    arenaMat.position.y = -0.002;
    parent.add(arenaMat);

    const outerStepRing = new THREE.Mesh(
        new THREE.TorusGeometry(3.34 * radiusScale, 0.018, 8, 56),
        stepAccentMat
    );
    outerStepRing.rotation.x = Math.PI / 2;
    outerStepRing.position.y = 0.012;
    parent.add(outerStepRing);
}

function buildLanternColumn(THREE, parent, x, z, woodMat, stoneMat, goldMat, lanternBodyMat, accentMat, sways) {
    const colGroup = new THREE.Group();
    colGroup.position.set(x, 0, z);
    colGroup.lookAt(0, 0, 0);

    const stoneBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.30, 0.24, 8), stoneMat);
    stoneBase.position.y = 0.12;
    colGroup.add(stoneBase);

    const goldCollar = new THREE.Mesh(new THREE.CylinderGeometry(0.145, 0.155, 0.08, 12), goldMat);
    goldCollar.position.y = 0.27;
    colGroup.add(goldCollar);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.115, 0.125, 3.0, 14), woodMat);
    post.position.y = 1.72;
    colGroup.add(post);

    const topAccent = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.9, 0.045), accentMat);
    topAccent.position.set(0, 1.5, 0.11);
    colGroup.add(topAccent);

    const armBeam = new THREE.Mesh(new THREE.BoxGeometry(0.10, 0.11, 0.68), woodMat);
    armBeam.position.set(0, 3.05, 0.28);
    colGroup.add(armBeam);

    const beamCap = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.14, 0.08), goldMat);
    beamCap.position.set(0, 3.05, 0.61);
    colGroup.add(beamCap);

    const lanternPivot = new THREE.Group();
    lanternPivot.position.set(0, 2.98, 0.54);

    const cord = new THREE.Mesh(new THREE.CylinderGeometry(0.01, 0.01, 0.26, 6), goldMat);
    cord.position.y = -0.13;
    lanternPivot.add(cord);

    const capTop = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.11, 0.045, 14), goldMat);
    capTop.position.y = -0.27;
    lanternPivot.add(capTop);

    const orb = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 12), lanternBodyMat);
    orb.scale.set(1.0, 1.22, 1.0);
    orb.position.y = -0.46;
    lanternPivot.add(orb);

    const capBot = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.09, 0.045, 14), goldMat);
    capBot.position.y = -0.66;
    lanternPivot.add(capBot);

    const tassel = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.036, 0.20, 8), lanternBodyMat);
    tassel.position.y = -0.78;
    lanternPivot.add(tassel);

    colGroup.add(lanternPivot);
    parent.add(colGroup);
    sways.push({ node: lanternPivot, axis: 'z', amp: 0.045, speed: 1.8 });
}

function buildStoneToroLantern(THREE, parent, x, z, stoneMat, glowMat) {
    const g = new THREE.Group();
    g.position.set(x, 0, z);
    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.30, 0.16, 6), stoneMat);
    base.position.y = 0.08;
    g.add(base);
    const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.10, 0.13, 0.62, 6), stoneMat);
    stem.position.y = 0.46;
    g.add(stem);
    const box = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.24, 0.26), glowMat);
    box.position.y = 0.89;
    g.add(box);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(0.38, 0.20, 6), stoneMat);
    roof.position.y = 1.11;
    g.add(roof);
    const finial = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), stoneMat);
    finial.position.y = 1.24;
    g.add(finial);
    parent.add(g);
}

// ---------------------------------------------------------------------------
// 0. CLASSIC SHAOLIN TAIJI COURTYARD
// ---------------------------------------------------------------------------
function buildShaolinCourtyard(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xfef3c7,
        hemiGround: 0x2a1014,
        hemiIntensity: 0.95,
        keyColor: 0xfffbeb,
        keyIntensity: 1.32,
        rimColor: 0xf97316,
        rimIntensity: 0.78,
        pointA: { color: 0xd97706, intensity: 0.95, pos: [-2.5, 2.8, 2.4] },
        pointB: { color: 0xfde68a, intensity: 0.55, pos: [3.6, 2.3, 0.0] }
    });

    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x221b1e, roughness: 0.85, metalness: 0.15 });
    const woodCrimsonMat = new THREE.MeshStandardMaterial({ color: 0x8f1d1d, metalness: 0.22, roughness: 0.42 });
    const darkRoofMat = new THREE.MeshStandardMaterial({ color: 0x161b26, metalness: 0.52, roughness: 0.38 });
    const goldMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.78, roughness: 0.24 });
    const lanternMat = new THREE.MeshStandardMaterial({
        color: 0xef4444,
        emissive: 0xdc2626,
        emissiveIntensity: 1.55,
        roughness: 0.35
    });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#4a1b16',
        bgMid: '#331210',
        bgOuter: '#1e0b0b',
        plankColor: 'rgba(255, 210, 140, 0.08)',
        outerRingColor: 'rgba(245, 158, 11, 0.58)',
        innerRingColor: 'rgba(251, 191, 36, 0.34)',
        baguaColor: 'rgba(251, 191, 36, 0.74)',
        taijiRadius: 88,
        yinColor: '#141216',
        yangColor: '#e7d5b0',
        taijiStroke: 'rgba(245, 158, 11, 0.72)'
    });

    addOctagonBase(THREE, parent, stoneMat, goldMat, stageTex, stepAccentMat);

    const sways = [];
    [[-3.35, -3.35], [-3.35, 3.35], [2.45, -3.95], [2.45, 3.95]].forEach(([px, pz]) => {
        buildLanternColumn(THREE, parent, px, pz, woodCrimsonMat, stoneMat, goldMat, lanternMat, stepAccentMat, sways);
    });

    // Paifang Archway behind -X
    const latticeTex = createLatticeScreenTexture(THREE);
    const latticeMat = new THREE.MeshStandardMaterial({
        map: latticeTex,
        emissive: 0x7c2d12,
        emissiveIntensity: 0.48,
        roughness: 0.65
    });
    const archGroup = new THREE.Group();
    archGroup.position.set(-5.1, 0, 0);
    [-2.5, 2.5].forEach((pz) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.16, 3.85, 14), woodCrimsonMat);
        col.position.set(0, 1.925, pz);
        archGroup.add(col);
        const plinth = new THREE.Mesh(new THREE.BoxGeometry(0.50, 0.28, 0.50), stoneMat);
        plinth.position.set(0, 0.14, pz);
        archGroup.add(plinth);
    });
    const beamL = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 6.2), woodCrimsonMat);
    beamL.position.set(0, 3.45, 0);
    archGroup.add(beamL);

    const plaque = new THREE.Mesh(new THREE.BoxGeometry(0.30, 0.42, 1.85), darkRoofMat);
    plaque.position.set(0.06, 3.75, 0);
    archGroup.add(plaque);

    const plaqueTrim = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.46, 1.92), goldMat);
    plaqueTrim.position.set(0.04, 3.75, 0);
    archGroup.add(plaqueTrim);

    const accentBar = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.06, 1.65), stepAccentMat);
    accentBar.position.set(0.22, 3.75, 0);
    archGroup.add(accentBar);

    const tier1 = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.18, 6.8), darkRoofMat);
    tier1.position.set(0, 4.02, 0);
    archGroup.add(tier1);
    const tier2 = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.22, 4.4), darkRoofMat);
    tier2.position.set(0, 4.30, 0);
    archGroup.add(tier2);

    const ridgeGold = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.10, 4.55), goldMat);
    ridgeGold.position.set(0, 4.45, 0);
    archGroup.add(ridgeGold);

    [-2.5, 2.5].forEach((ez) => {
        const eaveTip = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.18, 0.58), goldMat);
        eaveTip.position.set(0, 4.18, ez > 0 ? ez + 0.92 : ez - 0.92);
        eaveTip.rotation.x = ez > 0 ? 0.35 : -0.35;
        archGroup.add(eaveTip);
    });

    const screenFrame = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.95, 2.15), darkRoofMat);
    screenFrame.position.set(-0.22, 1.5, 0);
    archGroup.add(screenFrame);
    const screenPanel = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 2.8), latticeMat);
    screenPanel.position.set(-0.17, 1.5, 0);
    screenPanel.rotation.y = Math.PI / 2;
    archGroup.add(screenPanel);
    parent.add(archGroup);

    // Bo-Staff Training Racks
    [-4.05, 4.05].forEach((rz) => {
        const rack = new THREE.Group();
        rack.position.set(-1.1, 0, rz);
        [-0.45, 0.45].forEach((rx) => {
            const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 1.05, 0.12), darkRoofMat);
            leg.position.set(rx, 0.525, 0);
            rack.add(leg);
        });
        [0.42, 0.86].forEach((sy) => {
            const staff = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.55, 10), goldMat);
            staff.rotation.z = Math.PI / 2;
            staff.position.set(0, sy, 0);
            rack.add(staff);
        });
        parent.add(rack);
    });

    return (dtSec, tSec) => {
        sways.forEach((item, idx) => {
            item.node.rotation[item.axis] = Math.sin(tSec * item.speed + idx * 1.4) * item.amp;
        });
    };
}

// ---------------------------------------------------------------------------
// 1. MISTY EMERALD BAMBOO FOREST (NEW #1)
// ---------------------------------------------------------------------------
function buildBambooMistGrove(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xa7f3d0,
        hemiGround: 0x062018,
        hemiIntensity: 1.05,
        keyColor: 0xecfdf5,
        keyIntensity: 1.25,
        rimColor: 0x10b981,
        rimIntensity: 0.9,
        pointA: { color: 0xfbbf24, intensity: 0.85, pos: [-2.8, 2.0, -2.5] },
        pointB: { color: 0x34d399, intensity: 0.75, pos: [2.5, 2.5, 2.8] }
    });

    const mossStoneMat = new THREE.MeshStandardMaterial({ color: 0x1c2b27, roughness: 0.86, metalness: 0.12 });
    const jadeTrimMat = new THREE.MeshStandardMaterial({ color: 0x10b981, metalness: 0.45, roughness: 0.35 });
    const bambooGreenMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.42, metalness: 0.12 });
    const bambooNodeMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.55 });
    const leafMat = new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.5 });
    const warmGlowMat = new THREE.MeshStandardMaterial({ color: 0xfde68a, emissive: 0xf59e0b, emissiveIntensity: 1.5 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#1b382e',
        bgMid: '#122820',
        bgOuter: '#0b1a15',
        plankColor: 'rgba(110, 231, 183, 0.08)',
        outerRingColor: 'rgba(52, 211, 153, 0.65)',
        innerRingColor: 'rgba(167, 243, 208, 0.34)',
        baguaColor: 'rgba(52, 211, 153, 0.75)',
        yinColor: '#0c1c17',
        yangColor: '#d1fae5',
        taijiStroke: 'rgba(52, 211, 153, 0.8)'
    });
    addOctagonBase(THREE, parent, mossStoneMat, jadeTrimMat, stageTex, stepAccentMat);

    // Forest floor skirt
    const groundDisc = new THREE.Mesh(
        new THREE.CircleGeometry(14, 24),
        new THREE.MeshStandardMaterial({ color: 0x081a14, roughness: 0.95 })
    );
    groundDisc.rotation.x = -Math.PI / 2;
    groundDisc.position.y = -0.16;
    parent.add(groundDisc);

    // Segmented Swaying Bamboo Grove (focusing on -X & side perimeter)
    const bambooCoords = [
        [-4.5, -2.8, 4.6], [-4.9, -1.6, 5.2], [-4.6, -0.4, 4.8], [-5.0, 0.8, 5.4],
        [-4.5, 2.0, 4.5], [-4.8, 3.1, 5.0], [-3.8, -3.9, 4.2], [-2.5, -4.3, 4.7],
        [-1.0, -4.5, 4.4], [-3.7, 3.8, 4.3], [-2.2, 4.3, 4.8], [0.8, -4.5, 4.0], [1.1, 4.4, 4.2]
    ];
    const sways = [];
    bambooCoords.forEach(([bx, bz, h], idx) => {
        const pivot = new THREE.Group();
        pivot.position.set(bx, -0.1, bz);
        const stalk = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.085, h, 8), bambooGreenMat);
        stalk.position.y = h / 2;
        pivot.add(stalk);

        for (let r = 0.7; r < h - 0.3; r += 0.75) {
            const ring = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.014, 5, 8), bambooNodeMat);
            ring.rotation.x = Math.PI / 2;
            ring.position.y = r;
            pivot.add(ring);
        }

        for (let l = 0; l < 3; l++) {
            const canopy = new THREE.Mesh(new THREE.ConeGeometry(0.55 - l * 0.1, 0.42, 6), leafMat);
            canopy.position.set((l % 2 === 0 ? 0.18 : -0.18), h - 0.8 + l * 0.36, 0);
            canopy.rotation.z = l % 2 === 0 ? -0.35 : 0.35;
            pivot.add(canopy);
        }

        parent.add(pivot);
        sways.push({ node: pivot, axis: idx % 2 === 0 ? 'z' : 'x', amp: 0.032, speed: 1.15 });
    });

    // Stone Toro Lanterns
    [[-3.6, -2.5], [-3.6, 2.5], [2.1, -3.7], [2.1, 3.7]].forEach(([lx, lz]) => {
        buildStoneToroLantern(THREE, parent, lx, lz, mossStoneMat, warmGlowMat);
    });

    // Rustic Wood Torii Gate Backdrop
    const gate = new THREE.Group();
    gate.position.set(-4.3, 0, 0);
    [-1.4, 1.4].forEach((gz) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.13, 3.1, 10), bambooNodeMat);
        post.position.set(0, 1.55, gz);
        gate.add(post);
    });
    const kasagi = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.20, 3.8), bambooNodeMat);
    kasagi.position.set(0, 3.15, 0);
    gate.add(kasagi);
    const jadeSeal = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.38, 0.75), stepAccentMat);
    jadeSeal.position.set(0.12, 2.75, 0);
    gate.add(jadeSeal);
    parent.add(gate);

    const updateParticles = addParticleField(
        THREE, parent, 75,
        { x: 5.5, yMin: 0.25, yMax: 4.5, z: 5.5 },
        0x6ee7b7, 0.18, 'drift',
        'rgba(167,243,208,1)', 'rgba(16,185,129,0.4)'
    );

    return (dtSec, tSec) => {
        sways.forEach((s, idx) => {
            s.node.rotation[s.axis] = Math.sin(tSec * s.speed + idx * 0.9) * s.amp;
        });
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 2. FORBIDDEN IMPERIAL DRAGON HALL (NEW #2)
// ---------------------------------------------------------------------------
function buildImperialPalaceHall(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xfef08a,
        hemiGround: 0x310a10,
        hemiIntensity: 1.0,
        keyColor: 0xfffbeb,
        keyIntensity: 1.38,
        rimColor: 0xf59e0b,
        rimIntensity: 0.9,
        pointA: { color: 0xfbbf24, intensity: 1.15, pos: [-2.8, 3.2, 0] },
        pointB: { color: 0xef4444, intensity: 0.75, pos: [2.6, 2.2, 2.4] }
    });

    const marbleMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.35, metalness: 0.18 });
    const imperialRedMat = new THREE.MeshStandardMaterial({ color: 0x991b1b, roughness: 0.32, metalness: 0.24 });
    const imperialGoldMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, roughness: 0.22, metalness: 0.85 });
    const brassGlowMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, emissive: 0xd97706, emissiveIntensity: 1.15, roughness: 0.3 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#6b1218',
        bgMid: '#480c12',
        bgOuter: '#27070b',
        radialSpokes: 'rgba(251, 191, 36, 0.24)',
        outerRingColor: 'rgba(251, 191, 36, 0.82)',
        innerRingColor: 'rgba(253, 224, 71, 0.48)',
        baguaColor: 'rgba(251, 191, 36, 0.85)',
        yinColor: '#2c070b',
        yangColor: '#fde68a',
        taijiStroke: '#fbbf24'
    });
    addOctagonBase(THREE, parent, marbleMat, imperialGoldMat, stageTex, stepAccentMat);

    // Marble Palace Balustrade Step Skirt
    const palaceFloor = new THREE.Mesh(
        new THREE.CylinderGeometry(7.2, 7.6, 0.14, 16),
        new THREE.MeshStandardMaterial({ color: 0x2c0b10, roughness: 0.55 })
    );
    palaceFloor.position.y = -0.22;
    parent.add(palaceFloor);

    // Dragon-Coiled Crimson Palace Pillars
    [[-3.8, -3.2], [-3.8, 3.2], [2.4, -3.9], [2.4, 3.9]].forEach(([px, pz]) => {
        const col = new THREE.Group();
        col.position.set(px, 0, pz);
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.34, 0.28, 12), marbleMat);
        base.position.y = 0.14;
        col.add(base);
        const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.17, 3.8, 14), imperialRedMat);
        shaft.position.y = 2.04;
        col.add(shaft);
        for (let r = 0.65; r <= 3.35; r += 0.54) {
            const coil = new THREE.Mesh(new THREE.TorusGeometry(0.19, 0.026, 8, 16), imperialGoldMat);
            coil.rotation.x = Math.PI / 2 + 0.22;
            coil.position.y = r;
            col.add(coil);
        }
        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.16, 0.42), imperialGoldMat);
        cap.position.y = 3.98;
        col.add(cap);
        parent.add(col);
    });

    // Multi-Panel Imperial Throne Screen (Pin-feng)
    const screenTex = makeCanvasTexture(THREE, 256, 512, (ctx) => {
        const g = ctx.createLinearGradient(0, 0, 0, 512);
        g.addColorStop(0, '#78350f');
        g.addColorStop(0.5, '#b45309');
        g.addColorStop(1, '#451a03');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 512);
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 10;
        ctx.strokeRect(12, 12, 232, 488);
        ctx.fillStyle = 'rgba(254, 240, 138, 0.88)';
        ctx.beginPath();
        ctx.arc(128, 175, 58, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#991b1b';
        ctx.lineWidth = 6;
        ctx.beginPath();
        ctx.arc(128, 175, 42, 0, Math.PI * 2);
        ctx.stroke();
        for (let y = 285; y <= 440; y += 36) {
            ctx.fillStyle = '#fde68a';
            ctx.fillRect(58, y, 140, 12);
        }
    });
    const screenMat = new THREE.MeshStandardMaterial({ map: screenTex, emissive: 0x78350f, emissiveIntensity: 0.35, roughness: 0.35 });
    const screenGroup = new THREE.Group();
    screenGroup.position.set(-4.85, 0, 0);
    [-1.45, 0, 1.45].forEach((zOff, idx) => {
        const panel = new THREE.Mesh(new THREE.BoxGeometry(0.10, idx === 1 ? 3.65 : 3.2, 1.32), imperialRedMat);
        panel.position.set(idx === 1 ? 0 : 0.22, idx === 1 ? 1.825 : 1.6, zOff);
        panel.rotation.y = idx === 0 ? 0.28 : idx === 2 ? -0.28 : 0;
        screenGroup.add(panel);

        const face = new THREE.Mesh(new THREE.PlaneGeometry(1.18, idx === 1 ? 3.35 : 2.9), screenMat);
        face.rotation.y = Math.PI / 2 + (idx === 0 ? 0.28 : idx === 2 ? -0.28 : 0);
        face.position.set((idx === 1 ? 0.06 : 0.28), idx === 1 ? 1.825 : 1.6, zOff);
        screenGroup.add(face);
    });
    parent.add(screenGroup);

    // Brass Incense Censers
    [[-3.6, -1.65], [-3.6, 1.65]].forEach(([cx, cz]) => {
        const censer = new THREE.Group();
        censer.position.set(cx, 0, cz);
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.22, 0.42, 12), imperialGoldMat);
        bowl.position.y = 0.36;
        censer.add(bowl);
        const stand = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.34, 0.16, 8), marbleMat);
        stand.position.y = 0.08;
        censer.add(stand);
        const ember = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.24, 0.06, 12), brassGlowMat);
        ember.position.y = 0.56;
        censer.add(ember);
        parent.add(censer);
    });

    const updateParticles = addParticleField(
        THREE, parent, 65,
        { x: 4.5, yMin: 0.4, yMax: 4.0, z: 4.5 },
        0xfde047, 0.15, 'rise',
        'rgba(254,240,138,1)', 'rgba(245,158,11,0.35)'
    );

    return (dtSec, tSec) => {
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 3. KUNLUN SNOW PEAK DOJO (NEW #3)
// ---------------------------------------------------------------------------
function buildSnowSummitDojo(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xe0f2fe,
        hemiGround: 0x0f172a,
        hemiIntensity: 1.12,
        keyColor: 0xf0f9ff,
        keyIntensity: 1.35,
        rimColor: 0x38bdf8,
        rimIntensity: 0.85,
        pointA: { color: 0xf97316, intensity: 1.0, pos: [-3.2, 1.5, -2.5] },
        pointB: { color: 0xf97316, intensity: 1.0, pos: [-3.2, 1.5, 2.5] }
    });

    const graniteMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.78, metalness: 0.18 });
    const snowMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.65, metalness: 0.05 });
    const iceMat = new THREE.MeshStandardMaterial({ color: 0x7dd3fc, emissive: 0x0284c7, emissiveIntensity: 0.35, roughness: 0.22, metalness: 0.45 });
    const brazierFireMat = new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xea580c, emissiveIntensity: 1.8 });
    const pineMat = new THREE.MeshStandardMaterial({ color: 0x1e3a2f, roughness: 0.72 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#1e3a5f',
        bgMid: '#132742',
        bgOuter: '#0b1829',
        radialSpokes: 'rgba(186, 230, 253, 0.25)',
        outerRingColor: 'rgba(125, 211, 252, 0.72)',
        innerRingColor: 'rgba(224, 242, 254, 0.42)',
        baguaColor: 'rgba(186, 230, 253, 0.72)',
        yinColor: '#0c192c',
        yangColor: '#e0f2fe',
        taijiStroke: 'rgba(56, 189, 248, 0.85)'
    });
    addOctagonBase(THREE, parent, graniteMat, iceMat, stageTex, stepAccentMat);

    // Jagged Snow-Capped Crag Peaks framing backdrop (-X & flanks)
    [
        [-6.2, -4.0, 5.4, 2.4], [-6.8, -1.2, 6.8, 2.8], [-6.6, 1.8, 6.2, 2.5], [-5.8, 4.4, 5.0, 2.2]
    ].forEach(([mx, mz, mh, mr]) => {
        const crag = new THREE.Group();
        crag.position.set(mx, -0.3, mz);
        const rock = new THREE.Mesh(new THREE.ConeGeometry(mr, mh, 6), graniteMat);
        rock.position.y = mh / 2;
        crag.add(rock);
        const cap = new THREE.Mesh(new THREE.ConeGeometry(mr * 0.56, mh * 0.48, 6), snowMat);
        cap.position.y = mh * 0.78;
        crag.add(cap);
        parent.add(crag);
    });

    // Snow-Dusted Alpine Pines
    [[-4.2, -3.5], [-4.2, 3.5], [1.9, -4.3], [1.9, 4.3]].forEach(([px, pz]) => {
        const tree = new THREE.Group();
        tree.position.set(px, 0, pz);
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.12, 0.9, 7), graniteMat);
        trunk.position.y = 0.45;
        tree.add(trunk);
        [0, 1, 2].forEach((tier) => {
            const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.68 - tier * 0.14, 0.72, 7), pineMat);
            foliage.position.y = 1.05 + tier * 0.48;
            tree.add(foliage);
            const snowCap = new THREE.Mesh(new THREE.ConeGeometry(0.55 - tier * 0.12, 0.36, 7), snowMat);
            snowCap.position.y = 1.24 + tier * 0.48;
            tree.add(snowCap);
        });
        parent.add(tree);
    });

    // Burning Iron Fire Braziers
    const flames = [];
    [[-3.3, -2.1], [-3.3, 2.1]].forEach(([fx, fz]) => {
        const br = new THREE.Group();
        br.position.set(fx, 0, fz);
        const ped = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.32, 0.78, 8), graniteMat);
        ped.position.y = 0.39;
        br.add(ped);
        const bowl = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.22, 0.26, 8), graniteMat);
        bowl.position.y = 0.88;
        br.add(bowl);
        const flame = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), brazierFireMat);
        flame.position.y = 1.15;
        br.add(flame);
        flames.push(flame);
        parent.add(br);
    });

    const updateParticles = addParticleField(
        THREE, parent, 110,
        { x: 6.2, yMin: 0.1, yMax: 5.2, z: 6.2 },
        0xe0f2fe, 0.14, 'fall',
        'rgba(255,255,255,1)', 'rgba(186,230,253,0.45)'
    );

    return (dtSec, tSec) => {
        flames.forEach((f, idx) => {
            f.rotation.y += dtSec * 2.2;
            const s = 1.0 + Math.sin(tSec * 7.5 + idx) * 0.14;
            f.scale.set(1, s, 1);
        });
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 4. HUASHAN CLIFF SUNSET ARENA (NEW #4)
// ---------------------------------------------------------------------------
function buildSunsetCanyonPavilion(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xfdba74,
        hemiGround: 0x3b120e,
        hemiIntensity: 1.0,
        keyColor: 0xffedd5,
        keyIntensity: 1.38,
        rimColor: 0xf97316,
        rimIntensity: 0.95,
        pointA: { color: 0xfb923c, intensity: 1.15, pos: [-4.0, 3.0, 0] },
        pointB: { color: 0xfef08a, intensity: 0.65, pos: [3.2, 2.4, 2.0] }
    });

    const sandstoneMat = new THREE.MeshStandardMaterial({ color: 0x7c2d12, roughness: 0.85, metalness: 0.08 });
    const darkTimberMat = new THREE.MeshStandardMaterial({ color: 0x431407, roughness: 0.65, metalness: 0.15 });
    const bronzeMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.3, metalness: 0.72 });
    const bannerMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, side: THREE.DoubleSide, roughness: 0.55 });
    const sunDiscMat = new THREE.MeshBasicMaterial({ color: 0xfb923c, transparent: true, opacity: 0.88 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#7c2d12',
        bgMid: '#5a1e0c',
        bgOuter: '#331107',
        radialSpokes: 'rgba(253, 186, 116, 0.28)',
        outerRingColor: 'rgba(251, 146, 60, 0.78)',
        innerRingColor: 'rgba(254, 215, 170, 0.42)',
        baguaColor: 'rgba(251, 191, 36, 0.78)',
        yinColor: '#290d06',
        yangColor: '#fed7aa',
        taijiStroke: '#fb923c'
    });
    addOctagonBase(THREE, parent, sandstoneMat, bronzeMat, stageTex, stepAccentMat);

    // Setting Giant Horizon Sun behind Mountain Gorge
    const sunDisc = new THREE.Mesh(new THREE.CircleGeometry(2.6, 28), sunDiscMat);
    sunDisc.position.set(-10.5, 2.8, -0.5);
    sunDisc.rotation.y = Math.PI / 2;
    parent.add(sunDisc);

    // Distant Cliff Monoliths
    [[-7.8, -4.6, 5.2], [-8.2, 4.4, 5.6], [-7.5, -1.8, 3.8], [-7.5, 2.0, 4.1]].forEach(([cx, cz, ch]) => {
        const spire = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 1.45, ch, 7), sandstoneMat);
        spire.position.set(cx, ch / 2 - 1.5, cz);
        parent.add(spire);
    });

    // Cliffside Pagoda Pavilion Eave Frame at -X
    const pav = new THREE.Group();
    pav.position.set(-4.7, 0, 0);
    [-1.85, 1.85].forEach((pz) => {
        const p = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.15, 3.4, 10), darkTimberMat);
        p.position.set(0, 1.7, pz);
        pav.add(p);
    });
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.20, 4.4), darkTimberMat);
    beam.position.set(0, 3.3, 0);
    pav.add(beam);
    const roof = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 2.9, 0.85, 4), sandstoneMat);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(0.65, 1.0, 1.35);
    roof.position.set(0, 3.82, 0);
    pav.add(roof);
    parent.add(pav);

    // Fluttering Martial War Banners
    const sways = [];
    [[-3.1, -3.4], [-3.1, 3.4], [2.0, -3.9], [2.0, 3.9]].forEach(([bx, bz]) => {
        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.05, 3.2, 8), darkTimberMat);
        pole.position.set(bx, 1.6, bz);
        parent.add(pole);

        const flagPivot = new THREE.Group();
        flagPivot.position.set(bx, 2.85, bz);
        const cloth = new THREE.Mesh(new THREE.PlaneGeometry(0.58, 1.35), bannerMat);
        cloth.position.set(0, -0.68, 0.30);
        cloth.rotation.y = Math.PI / 2;
        flagPivot.add(cloth);
        parent.add(flagPivot);
        sways.push(flagPivot);
    });

    const updateParticles = addParticleField(
        THREE, parent, 70,
        { x: 5.5, yMin: 0.2, yMax: 4.2, z: 5.5 },
        0xfdba74, 0.16, 'rise',
        'rgba(255,237,213,1)', 'rgba(251,146,60,0.4)'
    );

    return (dtSec, tSec) => {
        sways.forEach((f, idx) => {
            f.rotation.y = Math.sin(tSec * 2.8 + idx * 1.1) * 0.18;
        });
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 5. NEO-SHANGHAI CYBER WUSHU GRID (NEW #5)
// ---------------------------------------------------------------------------
function buildNeonCyberDojo(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0x67e8f9,
        hemiGround: 0x090d1e,
        hemiIntensity: 1.05,
        keyColor: 0xe0f2fe,
        keyIntensity: 1.25,
        rimColor: 0xec4899,
        rimIntensity: 0.95,
        pointA: { color: 0x22d3ee, intensity: 1.15, pos: [-3.5, 2.5, -2.5] },
        pointB: { color: 0xec4899, intensity: 0.95, pos: [-3.5, 2.5, 2.5] }
    });

    const alloyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.28, metalness: 0.85 });
    const neonMagentaMat = new THREE.MeshStandardMaterial({
        color: 0xf472b6, emissive: 0xec4899, emissiveIntensity: 1.45, roughness: 0.2
    });
    const holoTex = makeCanvasTexture(THREE, 128, 256, (ctx) => {
        ctx.clearRect(0, 0, 128, 256);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.16)';
        ctx.fillRect(0, 0, 128, 256);
        ctx.strokeStyle = '#22d3ee';
        ctx.lineWidth = 4;
        ctx.strokeRect(6, 6, 116, 244);
        ctx.fillStyle = '#67e8f9';
        for (let y = 32; y < 225; y += 34) {
            ctx.fillRect(28, y, 72, 10);
            ctx.fillRect(46, y + 14, 36, 6);
        }
    });
    const holoMat = new THREE.MeshBasicMaterial({ map: holoTex, transparent: true, opacity: 0.85, side: THREE.DoubleSide });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#0c1b33',
        bgMid: '#081224',
        bgOuter: '#040814',
        hexGridColor: 'rgba(34, 211, 238, 0.18)',
        outerRingColor: 'rgba(34, 211, 238, 0.85)',
        innerRingColor: 'rgba(236, 72, 153, 0.62)',
        baguaColor: 'rgba(34, 211, 238, 0.85)',
        yinColor: '#040914',
        yangColor: '#22d3ee',
        taijiStroke: '#ec4899'
    });
    addOctagonBase(THREE, parent, alloyMat, neonMagentaMat, stageTex, stepAccentMat);

    // Subtle Outer Neon Grid Ring
    const gridHelper = new THREE.GridHelper(18, 22, 0x06b6d4, 0x1e293b);
    gridHelper.position.y = -0.17;
    parent.add(gridHelper);

    // Cyber Portal Archway with Rotating Energy Halo (-X)
    const portal = new THREE.Group();
    portal.position.set(-4.7, 0, 0);
    [-2.1, 2.1].forEach((pz) => {
        const pylon = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.8, 0.36), alloyMat);
        pylon.position.set(0, 1.9, pz);
        portal.add(pylon);
        const strip = new THREE.Mesh(new THREE.BoxGeometry(0.06, 3.5, 0.08), stepAccentMat);
        strip.position.set(0.15, 1.9, pz);
        portal.add(strip);
    });
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 4.7), alloyMat);
    lintel.position.set(0, 3.9, 0);
    portal.add(lintel);

    const haloRing = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.045, 8, 36), neonMagentaMat);
    haloRing.rotation.y = Math.PI / 2;
    haloRing.position.set(-0.08, 2.05, 0);
    portal.add(haloRing);
    parent.add(portal);

    // Hologram Banners & Hovering Drones
    const drones = [];
    [[-3.3, -3.1], [-3.3, 3.1], [2.1, -3.7], [2.1, 3.7]].forEach(([dx, dz], idx) => {
        if (idx < 2) {
            const holo = new THREE.Mesh(new THREE.PlaneGeometry(0.95, 2.05), holoMat);
            holo.position.set(dx - 0.5, 1.65, dz);
            holo.lookAt(0, 1.65, 0);
            parent.add(holo);
        }
        const drone = new THREE.Group();
        drone.position.set(dx, 2.55, dz);
        const body = new THREE.Mesh(new THREE.OctahedronGeometry(0.18, 0), alloyMat);
        drone.add(body);
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.09, 10, 10), stepAccentMat);
        drone.add(eye);
        parent.add(drone);
        drones.push(drone);
    });

    const updateParticles = addParticleField(
        THREE, parent, 70,
        { x: 5.5, yMin: 0.25, yMax: 4.5, z: 5.5 },
        0x22d3ee, 0.14, 'rise',
        'rgba(103,232,249,1)', 'rgba(236,72,153,0.4)'
    );

    return (dtSec, tSec) => {
        haloRing.rotation.x += dtSec * 0.75;
        drones.forEach((d, idx) => {
            d.position.y = 2.55 + Math.sin(tSec * 2.2 + idx * 1.5) * 0.16;
            d.rotation.y += dtSec * 1.2;
        });
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 6. HEAVENLY WATERFALL CAVERN (NEW #6)
// ---------------------------------------------------------------------------
function buildWaterfallGrottoShrine(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0x99f6e4,
        hemiGround: 0x081c22,
        hemiIntensity: 1.05,
        keyColor: 0xe0f2fe,
        keyIntensity: 1.25,
        rimColor: 0x2dd4bf,
        rimIntensity: 0.95,
        pointA: { color: 0x2dd4bf, intensity: 1.15, pos: [-3.8, 2.5, 0] },
        pointB: { color: 0x38bdf8, intensity: 0.75, pos: [2.2, 2.0, 2.5] }
    });

    const slateMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.42, metalness: 0.25 });
    const wetRockMat = new THREE.MeshStandardMaterial({ color: 0x172530, roughness: 0.75, metalness: 0.15 });
    const tealTrimMat = new THREE.MeshStandardMaterial({ color: 0x2dd4bf, emissive: 0x0d9488, emissiveIntensity: 0.7, roughness: 0.28 });
    const waterMat = new THREE.MeshStandardMaterial({ color: 0x083344, roughness: 0.15, metalness: 0.65 });
    const lotusGlowMat = new THREE.MeshStandardMaterial({ color: 0x99f6e4, emissive: 0x2dd4bf, emissiveIntensity: 1.45 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#13323e',
        bgMid: '#0d232c',
        bgOuter: '#07141a',
        radialSpokes: 'rgba(94, 234, 212, 0.25)',
        outerRingColor: 'rgba(45, 212, 191, 0.75)',
        innerRingColor: 'rgba(153, 246, 228, 0.42)',
        baguaColor: 'rgba(94, 234, 212, 0.72)',
        yinColor: '#061318',
        yangColor: '#ccfbf1',
        taijiStroke: '#2dd4bf'
    });
    addOctagonBase(THREE, parent, slateMat, tealTrimMat, stageTex, stepAccentMat);

    // Reflective Cavern Moat Pool
    const moat = new THREE.Mesh(new THREE.CircleGeometry(10.5, 32), waterMat);
    moat.rotation.x = -Math.PI / 2;
    moat.position.y = -0.17;
    parent.add(moat);

    // Limestone Cavern Cliff & Glowing Cascading Waterfall (-X)
    const cliffL = new THREE.Mesh(new THREE.CylinderGeometry(1.1, 1.8, 5.2, 7), wetRockMat);
    cliffL.position.set(-5.6, 2.3, -2.6);
    parent.add(cliffL);
    const cliffR = new THREE.Mesh(new THREE.CylinderGeometry(1.0, 1.7, 5.4, 7), wetRockMat);
    cliffR.position.set(-5.6, 2.4, 2.6);
    parent.add(cliffR);
    const cliffBack = new THREE.Mesh(new THREE.BoxGeometry(1.4, 5.6, 5.2), wetRockMat);
    cliffBack.position.set(-6.0, 2.5, 0);
    parent.add(cliffBack);

    const wfTex = makeCanvasTexture(THREE, 256, 256, (ctx) => {
        const g = ctx.createLinearGradient(0, 0, 256, 0);
        g.addColorStop(0, '#0ea5e9');
        g.addColorStop(0.5, '#5eead4');
        g.addColorStop(1, '#0284c7');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, 256, 256);
        for (let i = 0; i < 24; i++) {
            ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.45)' : 'rgba(153,246,228,0.28)';
            ctx.fillRect(i * 11, (i * 37) % 140, 5, 110);
        }
    });
    wfTex.wrapS = THREE.RepeatWrapping;
    wfTex.wrapT = THREE.RepeatWrapping;
    const waterfallMat = new THREE.MeshBasicMaterial({ map: wfTex, transparent: true, opacity: 0.82 });
    const waterfall = new THREE.Mesh(new THREE.PlaneGeometry(3.4, 4.9), waterfallMat);
    waterfall.position.set(-5.18, 2.25, 0);
    waterfall.rotation.y = Math.PI / 2;
    parent.add(waterfall);

    // Floating Lotus Lanterns on Moat
    const lotuses = [];
    [[-3.9, -3.7], [-3.9, 3.7], [0.8, -4.4], [0.8, 4.4], [2.9, -3.5], [2.9, 3.5]].forEach(([lx, lz]) => {
        const lotus = new THREE.Group();
        lotus.position.set(lx, -0.14, lz);
        const pad = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.03, 12), wetRockMat);
        lotus.add(pad);
        const blossom = new THREE.Mesh(new THREE.OctahedronGeometry(0.14, 0), lotusGlowMat);
        blossom.position.y = 0.12;
        lotus.add(blossom);
        parent.add(lotus);
        lotuses.push(lotus);
    });

    const updateParticles = addParticleField(
        THREE, parent, 75,
        { x: 5.5, yMin: 0.15, yMax: 3.8, z: 5.5 },
        0x5eead4, 0.15, 'drift',
        'rgba(204,251,241,1)', 'rgba(45,212,191,0.4)'
    );

    return (dtSec, tSec) => {
        wfTex.offset.y += dtSec * 1.35;
        lotuses.forEach((l, idx) => {
            l.position.y = -0.14 + Math.sin(tSec * 1.6 + idx) * 0.03;
            l.rotation.y += dtSec * 0.35;
        });
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 7. SAKURA & RED BRIDGE GARDEN (NEW #7)
// ---------------------------------------------------------------------------
function buildCherryBlossomGarden(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xfbcfe8,
        hemiGround: 0x201026,
        hemiIntensity: 1.05,
        keyColor: 0xfff1f2,
        keyIntensity: 1.28,
        rimColor: 0xf472b6,
        rimIntensity: 0.85,
        pointA: { color: 0xf472b6, intensity: 0.95, pos: [-3.5, 2.8, -2.0] },
        pointB: { color: 0xfde68a, intensity: 0.7, pos: [2.8, 2.2, 2.4] }
    });

    const gardenSlateMat = new THREE.MeshStandardMaterial({ color: 0x272030, roughness: 0.78, metalness: 0.14 });
    const sakuraPinkMat = new THREE.MeshStandardMaterial({ color: 0xf472b6, emissive: 0xbe185d, emissiveIntensity: 0.25, roughness: 0.58 });
    const bridgeRedMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.38, metalness: 0.18 });
    const barkMat = new THREE.MeshStandardMaterial({ color: 0x3b231d, roughness: 0.88 });
    const lanternMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 1.45 });
    const koiPondMat = new THREE.MeshStandardMaterial({ color: 0x13162b, roughness: 0.18, metalness: 0.55 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#3b1d35',
        bgMid: '#281326',
        bgOuter: '#170b18',
        plankColor: 'rgba(249, 168, 212, 0.10)',
        outerRingColor: 'rgba(244, 114, 182, 0.75)',
        innerRingColor: 'rgba(251, 207, 232, 0.42)',
        baguaColor: 'rgba(249, 168, 212, 0.72)',
        yinColor: '#1a0b1d',
        yangColor: '#fce7f3',
        taijiStroke: '#f472b6'
    });
    addOctagonBase(THREE, parent, gardenSlateMat, sakuraPinkMat, stageTex, stepAccentMat);

    // Koi Pond Water Skirt
    const pond = new THREE.Mesh(new THREE.CircleGeometry(11, 28), koiPondMat);
    pond.rotation.x = -Math.PI / 2;
    pond.position.y = -0.17;
    parent.add(pond);

    // Arched Crimson Garden Footbridge behind -X
    const bridge = new THREE.Group();
    bridge.position.set(-4.9, 0, 0);
    for (let i = -3; i <= 3; i++) {
        const z = i * 0.55;
        const archY = Math.cos((i / 3.4) * (Math.PI / 2)) * 0.72 + 0.18;
        const plank = new THREE.Mesh(new THREE.BoxGeometry(1.15, 0.10, 0.50), bridgeRedMat);
        plank.position.set(0, archY, z);
        bridge.add(plank);
        [-0.50, 0.50].forEach((rx) => {
            const post = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.65, 8), bridgeRedMat);
            post.position.set(rx, archY + 0.34, z);
            bridge.add(post);
        });
    }
    parent.add(bridge);

    // Blooming Cherry Blossom Trees framing courtyard
    [[-4.0, -3.5], [-4.0, 3.5], [1.6, -4.3], [1.6, 4.3]].forEach(([tx, tz]) => {
        const tree = new THREE.Group();
        tree.position.set(tx, -0.05, tz);
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.18, 2.3, 8), barkMat);
        trunk.position.y = 1.15;
        trunk.rotation.z = tx < 0 ? 0.12 : -0.10;
        tree.add(trunk);

        [[0, 2.45, 0, 0.92], [-0.45, 2.25, 0.4, 0.66], [0.45, 2.35, -0.35, 0.70]].forEach(([cx, cy, cz, cr]) => {
            const canopy = new THREE.Mesh(new THREE.DodecahedronGeometry(cr, 1), sakuraPinkMat);
            canopy.scale.set(1.15, 0.75, 1.15);
            canopy.position.set(cx, cy, cz);
            tree.add(canopy);
        });
        parent.add(tree);
    });

    [[-3.5, -1.8], [-3.5, 1.8]].forEach(([lx, lz]) => {
        buildStoneToroLantern(THREE, parent, lx, lz, gardenSlateMat, lanternMat);
    });

    const updateParticles = addParticleField(
        THREE, parent, 95,
        { x: 5.8, yMin: 0.12, yMax: 4.8, z: 5.8 },
        0xf9a8d4, 0.16, 'fall',
        'rgba(252,231,243,1)', 'rgba(244,114,182,0.45)'
    );

    return (dtSec, tSec) => {
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 8. OBSIDIAN SHAOLIN IRON FORGE (NEW #8)
// ---------------------------------------------------------------------------
function buildVolcanicForgeFoundry(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xfdba74,
        hemiGround: 0x3b0a06,
        hemiIntensity: 0.92,
        keyColor: 0xfff7ed,
        keyIntensity: 1.25,
        rimColor: 0xf97316,
        rimIntensity: 1.05,
        pointA: { color: 0xef4444, intensity: 1.25, pos: [-3.2, 2.2, 0] },
        pointB: { color: 0xf97316, intensity: 0.95, pos: [2.2, 1.8, -2.8] }
    });

    const basaltMat = new THREE.MeshStandardMaterial({ color: 0x181518, roughness: 0.72, metalness: 0.45 });
    const bronzeRimMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.28, metalness: 0.82 });
    const magmaMat = new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xea580c, emissiveIntensity: 1.55, roughness: 0.3 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#2a120d',
        bgMid: '#1d0b09',
        bgOuter: '#100605',
        crackColor: 'rgba(249, 115, 22, 0.65)',
        outerRingColor: 'rgba(249, 115, 22, 0.82)',
        innerRingColor: 'rgba(251, 146, 60, 0.45)',
        baguaColor: 'rgba(251, 191, 36, 0.78)',
        yinColor: '#110908',
        yangColor: '#fdba74',
        taijiStroke: '#f97316'
    });
    addOctagonBase(THREE, parent, basaltMat, bronzeRimMat, stageTex, stepAccentMat);

    // Molten Magma Sea Beneath
    const magmaPool = new THREE.Mesh(new THREE.CircleGeometry(12, 24), magmaMat);
    magmaPool.rotation.x = -Math.PI / 2;
    magmaPool.position.y = -0.24;
    parent.add(magmaPool);

    // Suspended Giant Bronze War Gong Frame (-X)
    const gongGroup = new THREE.Group();
    gongGroup.position.set(-4.75, 0, 0);
    [-1.7, 1.7].forEach((gz) => {
        const col = new THREE.Mesh(new THREE.BoxGeometry(0.28, 3.7, 0.28), basaltMat);
        col.position.set(0, 1.85, gz);
        gongGroup.add(col);
    });
    const crossbar = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.28, 4.0), basaltMat);
    crossbar.position.set(0, 3.65, 0);
    gongGroup.add(crossbar);

    const gongDisc = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.14, 24), bronzeRimMat);
    gongDisc.rotation.z = Math.PI / 2;
    gongDisc.position.set(0.08, 2.05, 0);
    gongGroup.add(gongDisc);
    parent.add(gongGroup);

    // Four Diagonal Obsidian Anchor Chains rising from Forge Corners
    [[-3.4, -3.4], [-3.4, 3.4], [2.8, -3.8], [2.8, 3.8]].forEach(([cx, cz]) => {
        const chain = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.08, 5.2, 6), basaltMat);
        chain.position.set(cx * 1.12, 2.4, cz * 1.12);
        chain.lookAt(0, -1.0, 0);
        chain.rotateX(Math.PI / 2);
        parent.add(chain);
    });

    const updateParticles = addParticleField(
        THREE, parent, 90,
        { x: 5.5, yMin: 0.1, yMax: 4.8, z: 5.5 },
        0xf97316, 0.16, 'rise',
        'rgba(254,215,170,1)', 'rgba(239,68,68,0.45)'
    );

    return (dtSec, tSec) => {
        magmaMat.emissiveIntensity = 1.35 + Math.sin(tSec * 2.4) * 0.25;
        gongDisc.rotation.y = Math.sin(tSec * 1.4) * 0.04;
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 9. TIANMEN CLOUD TEMPLE (NEW #9)
// ---------------------------------------------------------------------------
function buildCelestialCloudPalace(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xf8fafc,
        hemiGround: 0x1e293b,
        hemiIntensity: 1.18,
        keyColor: 0xffffff,
        keyIntensity: 1.35,
        rimColor: 0xfcd34d,
        rimIntensity: 0.88,
        pointA: { color: 0xfde68a, intensity: 1.0, pos: [-3.5, 3.2, 0] },
        pointB: { color: 0x93c5fd, intensity: 0.65, pos: [2.5, 2.5, 2.2] }
    });

    const whiteJadeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, roughness: 0.30, metalness: 0.20 });
    const skyGoldMat = new THREE.MeshStandardMaterial({ color: 0xfcd34d, roughness: 0.22, metalness: 0.85 });
    const cloudMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, emissive: 0x94a3b8, emissiveIntensity: 0.25, roughness: 0.85 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#334155',
        bgMid: '#1e293b',
        bgOuter: '#0f172a',
        radialSpokes: 'rgba(253, 224, 71, 0.34)',
        outerRingColor: 'rgba(252, 211, 77, 0.86)',
        innerRingColor: 'rgba(226, 232, 240, 0.55)',
        baguaColor: 'rgba(253, 224, 71, 0.84)',
        yinColor: '#1e293b',
        yangColor: '#f8fafc',
        taijiStroke: '#fcd34d'
    });
    addOctagonBase(THREE, parent, whiteJadeMat, skyGoldMat, stageTex, stepAccentMat);

    // Heavenly Gate Pillars & Twin Rotating Dharma Halos (-X)
    const gate = new THREE.Group();
    gate.position.set(-4.8, 0, 0);
    [-1.9, 1.9].forEach((gz) => {
        const col = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.19, 3.7, 14), whiteJadeMat);
        col.position.set(0, 1.85, gz);
        gate.add(col);
        const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.20, 0.22, 12), skyGoldMat);
        cap.position.set(0, 3.78, gz);
        gate.add(cap);
    });
    const lintel = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.22, 4.4), whiteJadeMat);
    lintel.position.set(0, 3.65, 0);
    gate.add(lintel);

    const haloOuter = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.045, 8, 36), skyGoldMat);
    haloOuter.rotation.y = Math.PI / 2;
    haloOuter.position.set(-0.2, 2.2, 0);
    gate.add(haloOuter);

    const haloInner = new THREE.Mesh(new THREE.TorusGeometry(1.18, 0.032, 8, 8), skyGoldMat);
    haloInner.rotation.y = Math.PI / 2;
    haloInner.position.set(-0.2, 2.2, 0);
    gate.add(haloInner);
    parent.add(gate);

    // Stylized Floating Celestial Cloud Clusters
    const clouds = [];
    [
        [-5.5, -0.5, -4.0, 1.3], [-6.2, 0.6, 4.2, 1.4], [-3.2, -0.65, -4.6, 1.1],
        [-3.2, -0.65, 4.6, 1.1], [2.2, -0.6, -4.4, 1.0], [2.2, -0.6, 4.4, 1.0]
    ].forEach(([cx, cy, cz, sc]) => {
        const cGroup = new THREE.Group();
        cGroup.position.set(cx, cy, cz);
        [[0, 0, 0, 0.8], [0.7, -0.1, 0.2, 0.6], [-0.65, -0.08, -0.2, 0.62]].forEach(([ox, oy, oz, r]) => {
            const puff = new THREE.Mesh(new THREE.DodecahedronGeometry(r * sc, 1), cloudMat);
            puff.scale.set(1.3, 0.62, 1.1);
            puff.position.set(ox * sc, oy * sc, oz * sc);
            cGroup.add(puff);
        });
        parent.add(cGroup);
        clouds.push(cGroup);
    });

    const updateParticles = addParticleField(
        THREE, parent, 75,
        { x: 5.5, yMin: 0.2, yMax: 4.5, z: 5.5 },
        0xfef08a, 0.16, 'drift',
        'rgba(255,255,255,1)', 'rgba(253,224,71,0.45)'
    );

    return (dtSec, tSec) => {
        haloOuter.rotation.x += dtSec * 0.45;
        haloInner.rotation.x -= dtSec * 0.72;
        clouds.forEach((c, idx) => {
            c.position.y += Math.sin(tSec * 1.1 + idx) * dtSec * 0.14;
        });
        updateParticles(dtSec, tSec);
    };
}

// ---------------------------------------------------------------------------
// 10. CRIMSON MAPLE MEDITATION YARD (NEW #10)
// ---------------------------------------------------------------------------
function buildAutumnMapleTemple(THREE, parent, stepAccentMat) {
    addLightingRig(THREE, parent, {
        hemiSky: 0xfde68a,
        hemiGround: 0x2c1409,
        hemiIntensity: 1.02,
        keyColor: 0xffedd5,
        keyIntensity: 1.32,
        rimColor: 0xea580c,
        rimIntensity: 0.88,
        pointA: { color: 0xf59e0b, intensity: 0.95, pos: [-3.5, 2.8, -2.2] },
        pointB: { color: 0xd97706, intensity: 0.7, pos: [2.6, 2.2, 2.4] }
    });

    const cedarMat = new THREE.MeshStandardMaterial({ color: 0x5c2c16, roughness: 0.72, metalness: 0.12 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.28, metalness: 0.78 });
    const gravelMat = new THREE.MeshStandardMaterial({ color: 0x332b24, roughness: 0.95 });
    const mapleRedMat = new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.65 });
    const mapleAmberMat = new THREE.MeshStandardMaterial({ color: 0xea580c, roughness: 0.65 });
    const zenStoneMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.82 });

    const stageTex = createStageMatTexture(THREE, {
        bgInner: '#542c16',
        bgMid: '#3a1e0f',
        bgOuter: '#211007',
        plankColor: 'rgba(251, 191, 36, 0.10)',
        outerRingColor: 'rgba(245, 158, 11, 0.72)',
        innerRingColor: 'rgba(253, 224, 71, 0.40)',
        baguaColor: 'rgba(251, 191, 36, 0.74)',
        yinColor: '#1f120b',
        yangColor: '#fef3c7',
        taijiStroke: '#d97706'
    });
    addOctagonBase(THREE, parent, cedarMat, brassMat, stageTex, stepAccentMat);

    // Raked Gravel Yard Skirt
    const gravel = new THREE.Mesh(new THREE.CircleGeometry(10.5, 24), gravelMat);
    gravel.rotation.x = -Math.PI / 2;
    gravel.position.y = -0.17;
    parent.add(gravel);

    // Wooden Temple Bell Tower Frame (Zhonglou) behind -X
    const bellFrame = new THREE.Group();
    bellFrame.position.set(-4.85, 0, 0);
    [-1.4, 1.4].forEach((bz) => {
        const post = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 3.4, 10), cedarMat);
        post.position.set(0, 1.7, bz);
        bellFrame.add(post);
    });
    const beam = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.24, 3.4), cedarMat);
    beam.position.set(0, 3.35, 0);
    bellFrame.add(beam);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(2.4, 0.95, 4), cedarMat);
    roof.rotation.y = Math.PI / 4;
    roof.scale.set(0.65, 1.0, 1.35);
    roof.position.set(0, 3.92, 0);
    bellFrame.add(roof);

    const bell = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.44, 0.78, 14), brassMat);
    bell.position.set(0, 2.65, 0);
    bellFrame.add(bell);
    parent.add(bellFrame);

    // Crimson & Amber Autumn Maple Trees
    [[-4.0, -3.5, true], [-4.0, 3.5, false], [1.7, -4.3, false], [1.7, 4.3, true]].forEach(([mx, mz, isRed]) => {
        const tree = new THREE.Group();
        tree.position.set(mx, 0, mz);
        const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.17, 2.2, 8), cedarMat);
        trunk.position.y = 1.1;
        tree.add(trunk);
        const leafMat = isRed ? mapleRedMat : mapleAmberMat;
        [[0, 2.45, 0, 0.88], [-0.4, 2.2, 0.35, 0.65], [0.4, 2.25, -0.35, 0.68]].forEach(([ox, oy, oz, r]) => {
            const c = new THREE.Mesh(new THREE.DodecahedronGeometry(r, 1), leafMat);
            c.scale.set(1.2, 0.72, 1.2);
            c.position.set(ox, oy, oz);
            tree.add(c);
        });
        parent.add(tree);
    });

    // Stacked Zen Meditation Cairn Stones
    [[-3.2, -2.0], [-3.2, 2.0]].forEach(([sx, sz]) => {
        const cairn = new THREE.Group();
        cairn.position.set(sx, 0, sz);
        [0.32, 0.24, 0.17, 0.11].forEach((r, idx) => {
            const rock = new THREE.Mesh(new THREE.SphereGeometry(r, 10, 8), zenStoneMat);
            rock.scale.set(1.25, 0.58, 1.25);
            rock.position.y = 0.12 + idx * 0.20;
            cairn.add(rock);
        });
        parent.add(cairn);
    });

    const updateParticles = addParticleField(
        THREE, parent, 85,
        { x: 5.5, yMin: 0.12, yMax: 4.5, z: 5.5 },
        0xf97316, 0.17, 'fall',
        'rgba(254,215,170,1)', 'rgba(220,38,38,0.45)'
    );

    return (dtSec, tSec) => {
        bell.rotation.z = Math.sin(tSec * 1.2) * 0.035;
        updateParticles(dtSec, tSec);
    };
}

const BUILDERS = {
    shaolin_courtyard: buildShaolinCourtyard,
    bamboo_mist_grove: buildBambooMistGrove,
    imperial_palace_hall: buildImperialPalaceHall,
    snow_summit_dojo: buildSnowSummitDojo,
    sunset_canyon_pavilion: buildSunsetCanyonPavilion,
    neon_cyber_dojo: buildNeonCyberDojo,
    waterfall_grotto_shrine: buildWaterfallGrottoShrine,
    cherry_blossom_garden: buildCherryBlossomGarden,
    volcanic_forge_foundry: buildVolcanicForgeFoundry,
    celestial_cloud_palace: buildCelestialCloudPalace,
    autumn_maple_temple: buildAutumnMapleTemple
};

export function buildEnvironmentScene(THREE, envId, { parent, stepAccentMat }) {
    const meta = getEnvironmentMeta(envId);
    const builder = BUILDERS[meta.id] || BUILDERS.shaolin_courtyard;
    const update = builder(THREE, parent, stepAccentMat);
    return {
        meta,
        update: typeof update === 'function' ? update : (() => {})
    };
}
