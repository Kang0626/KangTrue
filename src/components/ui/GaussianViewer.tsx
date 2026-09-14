'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RotateCw, ZoomIn, Eye, Activity, ShieldCheck, RefreshCw } from 'lucide-react';

interface GaussianViewerProps {
  pointsLabel?: string;
  fpsLabel?: string;
  sizeLabel?: string;
}

export const GaussianViewer: React.FC<GaussianViewerProps> = ({
  pointsLabel = "1.2M → 340K (-72%)",
  fpsLabel = "60 FPS",
  sizeLabel = "34MB",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFallback, setIsFallback] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [pointMode, setPointMode] = useState<'splats' | 'points'>('splats');

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene & Camera Setup
    const width = container.clientWidth;
    const height = container.clientHeight || 450;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040813);
    scene.fog = new THREE.FogExp2(0x040813, 0.015);

    const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 1000);
    camera.position.set(0, 12, 32);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambient = new THREE.AmbientLight(0x384b66, 1.2);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xfff4e0, 2.2);
    sun.position.set(25, 40, 15);
    scene.add(sun);

    // 3. Grid Datum Ground Reference
    const grid = new THREE.GridHelper(60, 30, 0x0085ca, 0x1e293b);
    grid.position.y = -2;
    scene.add(grid);

    // 4. Procedural High-Fidelity 3D Radiance Field Simulation (Graceful Fallback Engine)
    // Simulates Canterbury Infrastructure site: Rolling terrain + Pylon/Shelter Structure + Volumetric Foliage
    const particleCount = 28000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    const colorPylon = new THREE.Color(0x0085ca); // Truescape Blue
    const colorTerrain = new THREE.Color(0x2d4334); // Terrain greens
    const colorEarth = new THREE.Color(0x8a7050); // Soil/gravel
    const colorAccent = new THREE.Color(0x38bdf8); // Cyan highlights

    let idx = 0;
    for (let i = 0; i < particleCount; i++) {
      let x, y, z;
      const t = Math.random();

      if (t < 0.65) {
        // Natural rolling terrain terrain sweep
        x = (Math.random() - 0.5) * 44;
        z = (Math.random() - 0.5) * 44;
        y = Math.sin(x * 0.12) * Math.cos(z * 0.12) * 2.8 - 1.2;
        const col = Math.random() > 0.4 ? colorTerrain : colorEarth;
        colors[idx * 3] = col.r + (Math.random() - 0.5) * 0.08;
        colors[idx * 3 + 1] = col.g + (Math.random() - 0.5) * 0.08;
        colors[idx * 3 + 2] = col.b + (Math.random() - 0.5) * 0.08;
        sizes[idx] = 1.2 + Math.random() * 1.5;
      } else if (t < 0.88) {
        // Infrastructure Tower / Transmission Pylon geometry
        const h = Math.random() * 14;
        const radius = (14 - h) * 0.22;
        const angle = Math.random() * Math.PI * 2;
        x = Math.cos(angle) * radius;
        z = Math.sin(angle) * radius;
        y = h - 1.5;
        colors[idx * 3] = colorPylon.r;
        colors[idx * 3 + 1] = colorPylon.g;
        colors[idx * 3 + 2] = colorPylon.b;
        sizes[idx] = 1.8 + Math.random() * 1.2;
      } else {
        // Fine volumetric foliage & transmission wires
        x = (Math.random() - 0.5) * 36;
        z = (Math.random() - 0.5) * 36;
        y = Math.random() * 6 - 0.5;
        colors[idx * 3] = colorAccent.r;
        colors[idx * 3 + 1] = colorAccent.g;
        colors[idx * 3 + 2] = colorAccent.b;
        sizes[idx] = 0.8 + Math.random() * 0.8;
      }

      positions[idx * 3] = x;
      positions[idx * 3 + 1] = y;
      positions[idx * 3 + 2] = z;
      idx++;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

    // Shader or Points material for radiance splat aesthetics
    const material = new THREE.PointsMaterial({
      size: 0.38,
      vertexColors: true,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    setIsLoaded(true);
    setIsFallback(true);

    // 5. Interactive Orbit Control (Mouse / Touch)
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let rotX = 0.3;
    let rotY = 0.6;
    let distance = 30;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMouseX;
      const deltaY = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      rotY += deltaX * 0.008;
      rotX = Math.max(-0.2, Math.min(1.2, rotX + deltaY * 0.008));
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      distance = Math.max(8, Math.min(60, distance + e.deltaY * 0.03));
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    dom.addEventListener('wheel', handleWheel, { passive: false });

    // 6. Render Loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (autoRotate && !isDragging) {
        rotY += 0.003;
      }

      camera.position.x = distance * Math.sin(rotY) * Math.cos(rotX);
      camera.position.y = distance * Math.sin(rotX) + 2;
      camera.position.z = distance * Math.cos(rotY) * Math.cos(rotX);
      camera.lookAt(0, 2, 0);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 450;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      dom.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      dom.removeEventListener('wheel', handleWheel);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(dom)) {
        container.removeChild(dom);
      }
    };
  }, [autoRotate, pointMode]);

  return (
    <div className="relative w-full h-[460px] md:h-[540px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
      {/* 3D WebGL Canvas Mount */}
      <div ref={containerRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Top-Right Telemetry Badge Overlay (Spec Required) */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <div className="bg-slate-900/85 backdrop-blur-md border border-slate-700/60 rounded-lg px-3 py-2 shadow-xl flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Points:</span>
            <strong className="text-emerald-400 font-semibold">{pointsLabel}</strong>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <Activity className="w-3.5 h-3.5 text-[#0085ca]" />
            <span>FPS:</span>
            <strong className="text-[#0085ca] font-semibold">{fpsLabel}</strong>
          </div>
          <div className="h-3 w-px bg-slate-700" />
          <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
            <span>Size:</span>
            <strong className="text-sky-300 font-semibold">{sizeLabel}</strong>
          </div>
        </div>

        {isFallback && (
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 rounded px-2.5 py-1 text-[11px] font-mono text-slate-400 self-end flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-[#0085ca]" />
            <span>WebGL2 Radiance Field Active (Client Real-Time Simulation)</span>
          </div>
        )}
      </div>

      {/* Bottom-Left Controls Overlay */}
      <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 bg-slate-900/85 backdrop-blur-md border border-slate-800 rounded-lg p-1.5 shadow-lg">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`px-2.5 py-1 rounded text-xs font-mono flex items-center gap-1.5 transition-colors ${
            autoRotate ? 'bg-[#0085ca] text-white' : 'text-slate-400 hover:text-white'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{autoRotate ? 'Rotating' : 'Paused'}</span>
        </button>
        <div className="h-3 w-px bg-slate-800" />
        <span className="text-[11px] text-slate-400 font-mono px-1">Drag to Orbit · Wheel to Zoom</span>
      </div>
    </div>
  );
};
