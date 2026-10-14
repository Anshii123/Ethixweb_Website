import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import { Globe, Bot, GitBranch, LineChart } from 'lucide-react';
import { SculptureFallback } from './SculptureFallback';

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
      camera.position.set(0, 0, width < 640 ? 9.6 : 8.4);

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
      renderer.domElement.style.touchAction = 'pan-y';
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
        camera.position.z = w < 640 ? 9.6 : 8.4;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      const resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);

      // 7. Render Loop with Visibility & Intersection Optimization
      const clock = new THREE.Clock();
      let isVisible = true;

      const intersectionObserver = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
        },
        { threshold: 0.05 }
      );
      intersectionObserver.observe(container);

      const handleVisibilityChange = () => {
        isVisible = document.visibilityState === 'visible';
      };
      document.addEventListener('visibilitychange', handleVisibilityChange);

      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        if (!isVisible) return;
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
        intersectionObserver.disconnect();
        document.removeEventListener('visibilitychange', handleVisibilityChange);
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
      onPointerUp={handlePointerLeave}
      onPointerCancel={handlePointerLeave}
      style={{ touchAction: 'pan-y' }}
      className={`relative w-full h-[350px] xs:h-[390px] sm:h-[440px] md:h-[480px] lg:h-[520px] flex items-center justify-center select-none overflow-visible touch-pan-y ${className}`}
    >
      {/* Fallback Graphic (Renders immediately or if WebGL is unavailable) */}
      {(!isLoaded || hasWebGLError) && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-700">
          <SculptureFallback showBadges={false} />
        </div>
      )}

      {/* Discrete Architectural Service Annotations (Staggered vertically on mobile to eliminate any overlap) */}
      <div className="absolute top-1 sm:top-2 left-1 sm:-left-3 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-1 max-w-[170px] xs:max-w-none">
        <Globe className="w-3.5 h-3.5 text-ethix-red shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
          Website Architecture
        </span>
        <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0">
          98 Score
        </span>
      </div>

      <div className="absolute top-12 sm:top-4 right-1 sm:-right-3 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-2 max-w-[170px] xs:max-w-none">
        <Bot className="w-3.5 h-3.5 text-ethix-brass shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
          AI Booking Agents
        </span>
        <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-ethix-brass font-semibold bg-ethix-brass/10 px-1.5 py-0.5 rounded shrink-0">
          24/7 Active
        </span>
      </div>

      <div className="absolute bottom-12 sm:bottom-4 left-1 sm:left-4 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-3 max-w-[170px] xs:max-w-none">
        <GitBranch className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
          CRM Pipelines
        </span>
        <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded shrink-0">
          Zero Leakage
        </span>
      </div>

      <div className="absolute bottom-1 sm:bottom-6 right-1 sm:right-4 z-20 pointer-events-none flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/95 dark:bg-[#14161C]/95 backdrop-blur-md border border-ethix-charcoal-200/80 dark:border-white/10 shadow-subtle animate-float-node-4 max-w-[170px] xs:max-w-none">
        <LineChart className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <span className="text-[10px] sm:text-[11px] font-bold text-[#0F1012] dark:text-[#F4F4F6] truncate">
          Live Telemetry
        </span>
        <span className="hidden xs:inline-block text-[8px] sm:text-[9px] font-mono text-ethix-charcoal-500 dark:text-ethix-charcoal-400 bg-black/5 dark:bg-white/5 px-1.5 py-0.5 rounded shrink-0">
          Real-Time
        </span>
      </div>
    </div>
  );
};
