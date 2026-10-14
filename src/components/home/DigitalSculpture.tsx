import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { Globe, Bot, GitBranch, LineChart } from 'lucide-react';

interface DigitalSculptureProps {
  className?: string;
}

export const DigitalSculpture: React.FC<DigitalSculptureProps> = ({ className = '' }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasWebGLError, setHasWebGLError] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  // Pointer tracking for smooth 3D parallax
  const pointerTarget = useRef({ x: 0, y: 0 });
  const pointerCurrent = useRef({ x: 0, y: 0 });
  const isHovered = useRef(false);

  // Check reduced motion preference
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);
    const handler = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    media.addEventListener('change', handler);
    return () => media.removeEventListener('change', handler);
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!mountRef.current) return;
    const rect = mountRef.current.getBoundingClientRect();
    // Normalized -1 to 1 coordinates from center
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    pointerTarget.current = { x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) };
  }, []);

  const handlePointerEnter = useCallback(() => {
    isHovered.current = true;
  }, []);

  const handlePointerLeave = useCallback(() => {
    isHovered.current = false;
    pointerTarget.current = { x: 0, y: 0 };
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;
    let animationFrameId: number | null = null;
    const disposables: (THREE.BufferGeometry | THREE.Material | THREE.Texture)[] = [];

    try {
      // 1. Scene & Camera
      scene = new THREE.Scene();
      const width = container.clientWidth || 500;
      const height = container.clientHeight || 500;

      camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
      camera.position.set(0, 0, 8.4);

      // 2. WebGL Renderer with transparency & high-performance settings
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = theme === 'dark' ? 1.2 : 1.05;
      container.appendChild(renderer.domElement);

      // 3. Lighting System tailored for light & dark themes
      const ambientLight = new THREE.AmbientLight(
        theme === 'dark' ? 0xffffff : 0xfcfbfa,
        theme === 'dark' ? 1.2 : 1.6
      );
      scene.add(ambientLight);

      // Main Key Light for specular facets
      const keyLight = new THREE.DirectionalLight(0xffffff, theme === 'dark' ? 2.6 : 2.2);
      keyLight.position.set(6, 8, 7);
      scene.add(keyLight);

      // Soft Warm Fill Light
      const fillLight = new THREE.DirectionalLight(0xf8ede3, 1.4);
      fillLight.position.set(-6, -4, 5);
      scene.add(fillLight);

      // Core Red Accent Glow
      const coreRedLight = new THREE.PointLight(0xdc2626, theme === 'dark' ? 3.5 : 2.5, 9);
      coreRedLight.position.set(0, 0, 0.2);
      scene.add(coreRedLight);

      // 4. Sculpture Composition Groups
      const masterGroup = new THREE.Group();
      scene.add(masterGroup);

      // --- CENTRAL NUCLEUS: Translucent Glass Octahedron & Metallic Core ---
      // Outer Crystalline Faceted Glass
      const outerGlassGeo = new THREE.IcosahedronGeometry(1.4, 0);
      disposables.push(outerGlassGeo);

      const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: theme === 'dark' ? 0xe2e8f0 : 0xffffff,
        metalness: 0.1,
        roughness: 0.08,
        transmission: 0.65,
        transparent: true,
        opacity: theme === 'dark' ? 0.8 : 0.72,
        reflectivity: 0.7,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
      });
      disposables.push(glassMaterial);

      const outerGlassMesh = new THREE.Mesh(outerGlassGeo, glassMaterial);
      masterGroup.add(outerGlassMesh);

      // Wireframe Accent Edges on Glass
      const wireframeGeo = new THREE.WireframeGeometry(outerGlassGeo);
      disposables.push(wireframeGeo);
      const wireframeMat = new THREE.LineBasicMaterial({
        color: theme === 'dark' ? 0xffffff : 0x121316,
        transparent: true,
        opacity: theme === 'dark' ? 0.18 : 0.12,
      });
      disposables.push(wireframeMat);
      const wireframeLines = new THREE.LineSegments(wireframeGeo, wireframeMat);
      outerGlassMesh.add(wireframeLines);

      // Inner Core Solid: High-polish Titanium / Brass Core
      const innerCoreGeo = new THREE.OctahedronGeometry(0.75, 1);
      disposables.push(innerCoreGeo);
      const innerCoreMat = new THREE.MeshStandardMaterial({
        color: theme === 'dark' ? 0xd4af37 : 0xc5a059,
        metalness: 0.85,
        roughness: 0.2,
      });
      disposables.push(innerCoreMat);
      const innerCoreMesh = new THREE.Mesh(innerCoreGeo, innerCoreMat);
      masterGroup.add(innerCoreMesh);

      // Radiant Center Seed: Ethixweb Red Pulsing Center
      const seedGeo = new THREE.SphereGeometry(0.32, 24, 24);
      disposables.push(seedGeo);
      const seedMat = new THREE.MeshBasicMaterial({
        color: 0xdc2626,
      });
      disposables.push(seedMat);
      const seedMesh = new THREE.Mesh(seedGeo, seedMat);
      masterGroup.add(seedMesh);

      // --- ARCHITECTURAL ORBITAL RINGS ---
      // Ring 1: Primary Titanium Gyro Ring
      const ring1Geo = new THREE.TorusGeometry(2.1, 0.024, 16, 120);
      disposables.push(ring1Geo);
      const ring1Mat = new THREE.MeshStandardMaterial({
        color: theme === 'dark' ? 0x94a3b8 : 0x27272a,
        metalness: 0.9,
        roughness: 0.25,
      });
      disposables.push(ring1Mat);
      const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
      ring1.rotation.set(Math.PI / 3, Math.PI / 6, 0);
      masterGroup.add(ring1);

      // Ring 2: Champagne Brass Ring
      const ring2Geo = new THREE.TorusGeometry(2.45, 0.018, 16, 120);
      disposables.push(ring2Geo);
      const ring2Mat = new THREE.MeshStandardMaterial({
        color: 0xc5a059,
        metalness: 0.85,
        roughness: 0.15,
      });
      disposables.push(ring2Mat);
      const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
      ring2.rotation.set(-Math.PI / 4, 0, Math.PI / 4);
      masterGroup.add(ring2);

      // Ring 3: Equatorial Subtle Horizon Loop
      const ring3Geo = new THREE.TorusGeometry(1.85, 0.014, 16, 100);
      disposables.push(ring3Geo);
      const ring3Mat = new THREE.MeshStandardMaterial({
        color: theme === 'dark' ? 0x64748b : 0x52525b,
        metalness: 0.75,
        roughness: 0.3,
      });
      disposables.push(ring3Mat);
      const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
      ring3.rotation.set(Math.PI / 2.2, 0, -Math.PI / 5);
      masterGroup.add(ring3);

      // --- 4 INTERCONNECTED SERVICE NODES & PATHWAYS ---
      // Defined positions representing:
      // 0: Website (Top-Left)
      // 1: AI Agents (Top-Right)
      // 2: CRM Pipelines (Bottom-Left)
      // 3: Telemetry (Bottom-Right)
      const nodeConfigs = [
        {
          pos: new THREE.Vector3(-2.2, 1.3, 0.6),
          color: 0xdc2626, // Red
          scale: 0.22,
          type: 'dodecahedron',
        },
        {
          pos: new THREE.Vector3(2.2, 1.4, -0.4),
          color: 0xc5a059, // Brass
          scale: 0.24,
          type: 'octahedron',
        },
        {
          pos: new THREE.Vector3(-1.9, -1.5, 0.5),
          color: 0x10b981, // Emerald
          scale: 0.2,
          type: 'box',
        },
        {
          pos: new THREE.Vector3(2.1, -1.3, 0.7),
          color: 0x3b82f6, // Blue
          scale: 0.22,
          type: 'dodecahedron',
        },
      ];

      const energyPulses: { mesh: THREE.Mesh; curve: THREE.CatmullRomCurve3; speed: number; offset: number }[] = [];

      nodeConfigs.forEach((cfg, i) => {
        // Node Geometry
        let nodeGeo: THREE.BufferGeometry;
        if (cfg.type === 'dodecahedron') {
          nodeGeo = new THREE.DodecahedronGeometry(cfg.scale);
        } else if (cfg.type === 'octahedron') {
          nodeGeo = new THREE.OctahedronGeometry(cfg.scale);
        } else {
          nodeGeo = new THREE.BoxGeometry(cfg.scale * 1.5, cfg.scale * 1.5, cfg.scale * 1.5);
        }
        disposables.push(nodeGeo);

        const nodeMat = new THREE.MeshStandardMaterial({
          color: cfg.color,
          metalness: 0.7,
          roughness: 0.2,
        });
        disposables.push(nodeMat);

        const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
        nodeMesh.position.copy(cfg.pos);
        masterGroup.add(nodeMesh);

        // Thin Connecting Spline to Center
        const midpoint = new THREE.Vector3(
          cfg.pos.x * 0.45 + (i % 2 === 0 ? 0.3 : -0.3),
          cfg.pos.y * 0.45 + (i > 1 ? 0.3 : -0.3),
          cfg.pos.z * 0.45 + 0.4
        );
        const curve = new THREE.CatmullRomCurve3([cfg.pos, midpoint, new THREE.Vector3(0, 0, 0)]);

        const points = curve.getPoints(36);
        const splineGeo = new THREE.BufferGeometry().setFromPoints(points);
        disposables.push(splineGeo);

        const splineMat = new THREE.LineBasicMaterial({
          color: theme === 'dark' ? 0xffffff : 0x121316,
          transparent: true,
          opacity: theme === 'dark' ? 0.16 : 0.1,
        });
        disposables.push(splineMat);

        const line = new THREE.Line(splineGeo, splineMat);
        masterGroup.add(line);

        // Moving Red Energy Packet along the pathway
        const pulseGeo = new THREE.SphereGeometry(0.065, 12, 12);
        disposables.push(pulseGeo);
        const pulseMat = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0xdc2626 : 0xc5a059,
        });
        disposables.push(pulseMat);
        const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
        masterGroup.add(pulseMesh);

        energyPulses.push({
          mesh: pulseMesh,
          curve,
          speed: 0.16 + i * 0.03,
          offset: i * 0.25,
        });
      });

      // 5. Initial Entrance Animation setup
      masterGroup.scale.set(0.85, 0.85, 0.85);
      let entranceProgress = 0;

      // 6. Responsive Resize Observer
      const handleResize = () => {
        if (!container || !renderer || !camera) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        if (w === 0 || h === 0) return;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // 7. Render Loop
      const clock = new THREE.Clock();

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        const delta = clock.getDelta();
        const time = clock.getElapsedTime();

        // Entrance scale interpolation
        if (entranceProgress < 1) {
          entranceProgress += delta * 1.4;
          const s = THREE.MathUtils.lerp(0.85, 1, Math.min(1, entranceProgress));
          masterGroup.scale.set(s, s, s);
        }

        // Pointer Lerp
        pointerCurrent.current.x = THREE.MathUtils.lerp(
          pointerCurrent.current.x,
          pointerTarget.current.x,
          0.06
        );
        pointerCurrent.current.y = THREE.MathUtils.lerp(
          pointerCurrent.current.y,
          pointerTarget.current.y,
          0.06
        );

        if (!isReducedMotion) {
          // Slow, elegant idle rotation
          outerGlassMesh.rotation.y += delta * 0.18;
          outerGlassMesh.rotation.x = Math.sin(time * 0.45) * 0.12;

          innerCoreMesh.rotation.y -= delta * 0.28;
          innerCoreMesh.rotation.z = Math.cos(time * 0.5) * 0.15;

          // Pulse breathing
          const pulseScale = 1 + Math.sin(time * 2.2) * 0.12;
          seedMesh.scale.set(pulseScale, pulseScale, pulseScale);

          // Rings counter-rotation
          ring1.rotation.z += delta * 0.09;
          ring2.rotation.y += delta * 0.08;
          ring3.rotation.x += delta * 0.07;

          // Master group pointer-responsive tilt
          masterGroup.rotation.y = time * 0.04 + pointerCurrent.current.x * 0.28;
          masterGroup.rotation.x = Math.sin(time * 0.3) * 0.06 - pointerCurrent.current.y * 0.22;
          masterGroup.position.y = Math.sin(time * 0.8) * 0.08;

          // Energy pulses progression along pathways
          energyPulses.forEach((ep) => {
            const t = (time * ep.speed + ep.offset) % 1;
            const pos = ep.curve.getPointAt(t);
            ep.mesh.position.copy(pos);
          });
        } else {
          // Stable static pose for reduced motion
          masterGroup.rotation.set(0.1, 0.2, 0);
          masterGroup.position.set(0, 0, 0);
        }

        if (renderer && scene && camera) {
          renderer.render(scene, camera);
        }
      };

      animate();
      setIsLoaded(true);

      // Cleanup
      return () => {
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        resizeObserver.disconnect();

        disposables.forEach((item) => item.dispose());

        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && renderer.domElement.parentElement) {
            renderer.domElement.parentElement.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.error('Failed to initialize 3D digital sculpture WebGL:', err);
      setHasWebGLError(true);
    }
  }, [theme, isReducedMotion]);

  return (
    <div
      ref={mountRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-[380px] sm:h-[440px] md:h-[480px] lg:h-[520px] flex items-center justify-center select-none overflow-visible ${className}`}
    >
      {/* Fallback Graphic (Renders immediately or if WebGL is unavailable) */}
      {(!isLoaded || hasWebGLError) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700">
          <SculptureFallback />
        </div>
      )}

      {/* Discrete Architectural Service Annotations (Placed safely around sculpture without cluttering text) */}
      <div className="absolute top-2 left-0 sm:-left-3 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#14161C]/90 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-1">
        <Globe className="w-3.5 h-3.5 text-ethix-red" />
        <span className="text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6]">
          Website Architecture
        </span>
        <span className="text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">
          98 Score
        </span>
      </div>

      <div className="absolute top-4 right-0 sm:-right-3 z-20 pointer-events-none hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#14161C]/90 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-2">
        <Bot className="w-3.5 h-3.5 text-ethix-brass" />
        <span className="text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6]">
          AI Booking Agents
        </span>
        <span className="text-[9px] font-mono text-ethix-brass font-semibold">
          24/7 Active
        </span>
      </div>

      <div className="absolute bottom-4 left-2 sm:left-4 z-20 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#14161C]/90 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-3">
        <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
        <span className="text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6]">
          CRM Pipelines
        </span>
        <span className="text-[9px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
          Zero Leakage
        </span>
      </div>

      <div className="absolute bottom-6 right-2 sm:right-4 z-20 pointer-events-none hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 dark:bg-[#14161C]/90 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-4">
        <LineChart className="w-3.5 h-3.5 text-blue-500" />
        <span className="text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6]">
          Live Telemetry
        </span>
        <span className="text-[9px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400">
          Real-Time
        </span>
      </div>
    </div>
  );
};

// --- PRECISE STATIC SVG/CSS SCULPTURAL FALLBACK ---
// Renders instantly to guarantee zero layout shifts before WebGL initializes
const SculptureFallback: React.FC = () => {
  return (
    <svg
      viewBox="0 0 400 400"
      className="w-full h-full max-w-[420px] max-h-[420px] opacity-90 dark:opacity-80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="fallbackCoreGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8" />
          <stop offset="40%" stopColor="#DC2626" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#DC2626" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ringBrass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#E6C875" />
          <stop offset="100%" stopColor="#997733" />
        </linearGradient>
        <linearGradient id="glassFacet" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* Ambient Glow */}
      <circle cx="200" cy="200" r="140" fill="url(#fallbackCoreGlow)" />

      {/* Orbital Titanium Ring */}
      <ellipse
        cx="200"
        cy="200"
        rx="150"
        ry="65"
        stroke="currentColor"
        className="text-ethix-charcoal-300 dark:text-white/20"
        strokeWidth="1.5"
        transform="rotate(-28 200 200)"
      />

      {/* Orbital Champagne Brass Ring */}
      <ellipse
        cx="200"
        cy="200"
        rx="165"
        ry="75"
        stroke="url(#ringBrass)"
        strokeWidth="2"
        transform="rotate(42 200 200)"
      />

      {/* Connecting Spline Paths */}
      <path
        d="M 60 120 Q 140 160 200 200"
        stroke="#DC2626"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.5"
      />
      <path
        d="M 330 110 Q 260 150 200 200"
        stroke="#C5A059"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.6"
      />
      <path
        d="M 80 290 Q 150 250 200 200"
        stroke="#10B981"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.4"
      />
      <path
        d="M 320 280 Q 250 240 200 200"
        stroke="#3B82F6"
        strokeWidth="1.5"
        strokeDasharray="4 4"
        strokeOpacity="0.4"
      />

      {/* Outer Glass Faceted Diamond */}
      <polygon
        points="200,110 260,165 240,245 160,245 140,165"
        fill="url(#glassFacet)"
        stroke="currentColor"
        className="text-ethix-charcoal-400/40 dark:text-white/30"
        strokeWidth="1.5"
      />
      <line x1="200" y1="110" x2="200" y2="290" stroke="currentColor" className="text-white/40" strokeWidth="1" />
      <line x1="140" y1="165" x2="260" y2="165" stroke="currentColor" className="text-white/40" strokeWidth="1" />
      <line x1="160" y1="245" x2="240" y2="245" stroke="currentColor" className="text-white/40" strokeWidth="1" />

      {/* Inner Metallic Octahedron */}
      <polygon
        points="200,150 235,185 200,250 165,185"
        fill="url(#ringBrass)"
        opacity="0.85"
      />

      {/* Center Glowing Seed */}
      <circle cx="200" cy="200" r="14" fill="#DC2626" />
      <circle cx="200" cy="200" r="6" fill="#FFFFFF" />

      {/* Satellite Nodes */}
      <circle cx="60" cy="120" r="9" fill="#DC2626" />
      <circle cx="330" cy="110" r="9" fill="#C5A059" />
      <circle cx="80" cy="290" r="8" fill="#10B981" />
      <circle cx="320" cy="280" r="8" fill="#3B82F6" />
    </svg>
  );
};
