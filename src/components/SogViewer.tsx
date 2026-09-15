'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { 
  Maximize2, 
  Minimize2, 
  RefreshCw, 
  Play, 
  Pause, 
  Box, 
  Compass,
  Sparkles,
  Info,
  ArrowUpDown,
  ZoomIn,
  ZoomOut,
  Camera,
  Copy,
  Check
} from 'lucide-react';

interface SogViewerProps {
  sogUrl?: string;
  fallbackUrl?: string;
  title?: string;
  splatCount?: string;
  initialDistance?: number;
  initialPitch?: number;
  initialYaw?: number;
  initialTarget?: { x: number; y: number; z: number };
  initialUpright?: boolean;
  enableAutoRotate?: boolean;
  modelCenter?: { x: number; y: number; z: number };
  minDistance?: number;
  maxDistance?: number;
  isReferenceExample?: boolean;
  enableCameraInspector?: boolean;
  showCameraInspectorDefault?: boolean;
}

export const SogViewer: React.FC<SogViewerProps> = ({
  sogUrl = '/assets/case1/the_bowes_museum/meta.json',
  fallbackUrl = '/assets/case1/the_bowes_museum/meta.json',
  title = 'The Bowes Museum — Real-Time 3DGS Radiance Field',
  splatCount = '17,493,093 Splats',
  initialDistance = 68.0,
  initialPitch = 18.0,
  initialYaw = 25.0,
  initialTarget = { x: 0, y: 0, z: 0 },
  initialUpright = true,
  enableAutoRotate = true,
  modelCenter = { x: 0.78, y: -0.74, z: 5.2 },
  minDistance = 6.0,
  maxDistance = 350.0,
  isReferenceExample = false,
  enableCameraInspector = false,
  showCameraInspectorDefault = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasId = useRef<string>(`sog-canvas-${Math.random().toString(36).slice(2, 9)}`);
  const appRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const pivotEntityRef = useRef<any>(null);
  const splatEntityRef = useRef<any>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [autoRotate, setAutoRotate] = useState(enableAutoRotate);
  const [fps, setFps] = useState(60);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [viewerMode, setViewerMode] = useState<'orbit' | 'top' | 'front'>('orbit');
  const [isUpright, setIsUpright] = useState(true);
  const baseEulerX = initialUpright ? 180 : 0;

  // Camera Inspector State
  const [showCameraInspector, setShowCameraInspector] = useState(showCameraInspectorDefault);
  const [isCopied, setIsCopied] = useState(false);
  const [currentPose, setCurrentPose] = useState({
    distance: initialDistance,
    pitch: initialPitch,
    yaw: initialYaw,
    target: { ...initialTarget },
  });
  const lastPoseUpdateTime = useRef(0);

  const toggleFlipY = useCallback(() => {
    setIsUpright((prev) => {
      const next = !prev;
      if (pivotEntityRef.current) {
        const eulerX = next ? baseEulerX : (baseEulerX === 180 ? 0 : 180);
        pivotEntityRef.current.setLocalEulerAngles(eulerX, 0, 0);
      }
      return next;
    });
  }, [baseEulerX]);

  const orbitState = useRef({
    distance: initialDistance,
    pitch: initialPitch,
    yaw: initialYaw,
    target: { ...initialTarget },
    isDragging: false,
    dragButton: 0,
    prevX: 0,
    prevY: 0,
    autoRotate: enableAutoRotate,
  });

  orbitState.current.autoRotate = autoRotate;

  const resetCamera = useCallback(() => {
    orbitState.current.distance = initialDistance;
    orbitState.current.pitch = initialPitch;
    orbitState.current.yaw = initialYaw;
    orbitState.current.target = { ...initialTarget };
    setViewerMode('orbit');
  }, [initialDistance, initialPitch, initialYaw, initialTarget]);

  const setViewPreset = useCallback((mode: 'orbit' | 'top' | 'front') => {
    setViewerMode(mode);
    setAutoRotate(false);
    if (mode === 'top') {
      orbitState.current.pitch = 88.0;
      orbitState.current.yaw = 0.0;
      orbitState.current.distance = initialDistance * 1.35;
      orbitState.current.target = { ...initialTarget };
    } else if (mode === 'front') {
      orbitState.current.pitch = 8.0;
      orbitState.current.yaw = 0.0;
      orbitState.current.distance = initialDistance * 0.95;
      orbitState.current.target = { ...initialTarget };
    } else {
      resetCamera();
    }
  }, [resetCamera, initialDistance, initialTarget]);

  const handleZoom = useCallback((delta: number) => {
    orbitState.current.distance = Math.max(
      minDistance,
      Math.min(maxDistance, orbitState.current.distance + delta)
    );
  }, [minDistance, maxDistance]);

  const handleCopyPose = useCallback(() => {
    const st = orbitState.current;
    const normalizedYaw = Number((((st.yaw % 360) + 360) % 360).toFixed(1));
    const poseData = {
      initialDistance: Number(st.distance.toFixed(1)),
      initialPitch: Number(st.pitch.toFixed(1)),
      initialYaw: normalizedYaw,
      initialTarget: {
        x: Number(st.target.x.toFixed(2)),
        y: Number(st.target.y.toFixed(2)),
        z: Number(st.target.z.toFixed(2)),
      },
    };
    const text = JSON.stringify(poseData, null, 2);
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 3000);
      }).catch(() => {
        console.log('Camera Pose JSON:', text);
      });
    }
    console.log('Current Camera Pose:', poseData);
  }, []);

  const resizeViewerCanvas = useCallback(() => {
    if (!containerRef.current || !appRef.current) return;
    const isFs = !!document.fullscreenElement;
    const w = isFs ? window.innerWidth : containerRef.current.clientWidth;
    const h = isFs ? window.innerHeight : containerRef.current.clientHeight;

    if (w > 0 && h > 0) {
      appRef.current.resizeCanvas(w, h);
      if (cameraRef.current && cameraRef.current.camera) {
        cameraRef.current.camera.aspectRatio = w / h;
      }
      if (appRef.current.renderNextFrame !== undefined) {
        appRef.current.renderNextFrame = true;
      }
    }
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
        [0, 50, 150, 300, 500].forEach((delay) => setTimeout(resizeViewerCanvas, delay));
      }).catch(() => {});
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
        [0, 50, 150, 300, 500].forEach((delay) => setTimeout(resizeViewerCanvas, delay));
      }).catch(() => {});
    }
  }, [resizeViewerCanvas]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!document.fullscreenElement;
      setIsFullscreen(isFs);
      [0, 50, 150, 300, 500].forEach((delay) => {
        setTimeout(resizeViewerCanvas, delay);
      });
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    window.addEventListener('resize', resizeViewerCanvas);
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      window.removeEventListener('resize', resizeViewerCanvas);
    };
  }, [resizeViewerCanvas]);

  // Native non-passive wheel listener: reliably intercepts wheel and prevents window/page scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleWheelNative = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();

      const zoomFactor = e.deltaY * (orbitState.current.distance * 0.0018 + 0.05);
      orbitState.current.distance = Math.max(
        minDistance,
        Math.min(maxDistance, orbitState.current.distance + zoomFactor)
      );
    };

    container.addEventListener('wheel', handleWheelNative, { passive: false });
    return () => {
      container.removeEventListener('wheel', handleWheelNative);
    };
  }, [minDistance, maxDistance]);

  useEffect(() => {
    let isMounted = true;
    let app: any = null;
    let observer: IntersectionObserver | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const initPlayCanvas = async () => {
      try {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        // Dynamic client import of PlayCanvas
        const pc = await import('playcanvas');
        if (!isMounted) return;

        app = new pc.Application(canvas, {
          mouse: new pc.Mouse(canvas),
          touch: new pc.TouchDevice(canvas),
          elementInput: new pc.ElementInput(canvas),
          graphicsDeviceOptions: {
            antialias: false,
            alpha: false,
            preferWebGpu: false,
            powerPreference: 'high-performance',
          },
        });

        appRef.current = app;
        app.start();
        app.setCanvasFillMode(pc.FILLMODE_NONE);
        app.setCanvasResolution(pc.RESOLUTION_AUTO);

        // Splat budget configuration for high-density rendering (5M splats)
        if (app.scene?.gsplat) {
          app.scene.gsplat.splatBudget = 5000000;
        }

        // Register the GSplatHandler for SOG parsing if not present
        if (!app.loader.getHandler('gsplat')) {
          app.loader.addHandler('gsplat', new pc.GSplatHandler(app));
        }

        // Create Camera Entity
        const cameraEntity = new pc.Entity('ViewerCamera');
        cameraEntity.addComponent('camera', {
          clearColor: new pc.Color(0.04, 0.06, 0.10, 1.0),
          farClip: 5000,
          nearClip: 0.5,
          fov: 48,
        });
        app.root.addChild(cameraEntity);
        cameraRef.current = cameraEntity;

        // Add soft directional fill light
        const lightEntity = new pc.Entity('SoftAmbient');
        lightEntity.addComponent('light', {
          type: 'directional',
          color: new pc.Color(1, 0.98, 0.95),
          intensity: 0.8,
        });
        lightEntity.setEulerAngles(45, 30, 0);
        app.root.addChild(lightEntity);

        // Scene Hierarchy: app.root -> pivotEntity -> splatEntity
        // The pivot stays at (0,0,0) and rotates the model in-place.
        const pivotEntity = new pc.Entity('SplatPivot');
        pivotEntity.setLocalEulerAngles(initialUpright ? 180 : 0, 0, 0);
        app.root.addChild(pivotEntity);
        pivotEntityRef.current = pivotEntity;

        const splatEntity = new pc.Entity('SplatEntity');
        pivotEntity.addChild(splatEntity);
        splatEntityRef.current = splatEntity;

        const handleResize = () => {
          if (!container || !app || !isMounted) return;
          resizeViewerCanvas();
        };
        window.addEventListener('resize', handleResize);
        handleResize();

        // ResizeObserver tracks all dimension changes including fullscreen transitions
        if (typeof ResizeObserver !== 'undefined' && container) {
          resizeObserver = new ResizeObserver(() => {
            if (!isMounted) return;
            resizeViewerCanvas();
          });
          resizeObserver.observe(container);
        }

        // IntersectionObserver pauses rendering when offscreen
        if (typeof IntersectionObserver !== 'undefined') {
          observer = new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              if (appRef.current && isMounted) {
                appRef.current.autoRender = entry.isIntersecting;
                if (entry.isIntersecting) {
                  appRef.current.renderNextFrame = true;
                }
              }
            },
            { threshold: 0.05 }
          );
          observer.observe(container);
        }

        let frameTimes: number[] = [];
        let lastTime = performance.now();

        app.on('update', (dt: number) => {
          if (!isMounted || !cameraEntity) return;

          const now = performance.now();
          frameTimes.push(now - lastTime);
          lastTime = now;
          if (frameTimes.length > 30) {
            frameTimes.shift();
            const avgDelta = frameTimes.reduce((a, b) => a + b, 0) / frameTimes.length;
            const currentFps = Math.round(1000 / Math.max(1, avgDelta));
            setFps(Math.min(60, currentFps));
          }

          const state = orbitState.current;
          if (state.autoRotate && !state.isDragging) {
            state.yaw += dt * 6.5;
          }

          const phi = (90 - state.pitch) * pc.math.DEG_TO_RAD;
          const theta = (state.yaw + 180) * pc.math.DEG_TO_RAD;
          const x = state.distance * Math.sin(phi) * Math.sin(theta);
          const y = state.distance * Math.cos(phi);
          const z = state.distance * Math.sin(phi) * Math.cos(theta);

          cameraEntity.setPosition(
            state.target.x + x,
            state.target.y + y,
            state.target.z + z
          );
          cameraEntity.lookAt(new pc.Vec3(state.target.x, state.target.y, state.target.z));

          // Throttled update of current camera pose for live inspector (~10Hz)
          if (now - lastPoseUpdateTime.current > 100) {
            lastPoseUpdateTime.current = now;
            setCurrentPose({
              distance: Number(state.distance.toFixed(1)),
              pitch: Number(state.pitch.toFixed(1)),
              yaw: Number((((state.yaw % 360) + 360) % 360).toFixed(1)),
              target: {
                x: Number(state.target.x.toFixed(2)),
                y: Number(state.target.y.toFixed(2)),
                z: Number(state.target.z.toFixed(2)),
              },
            });
          }
        });

        const loadSogAsset = (url: string, isRetry = false) => {
          const assetName = url.split('/').pop() || 'SplatScene';
          const asset = new pc.Asset(assetName, 'gsplat', { url });

          asset.on('progress', (received: number, total: number) => {
            if (!isMounted) return;
            if (total > 0) {
              const pct = Math.min(99, Math.round((received / total) * 100));
              setLoadProgress(pct);
            }
          });

          asset.on('load', (loadedAsset: any) => {
            if (!isMounted) return;
            setLoadProgress(100);
            setTimeout(() => {
              if (isMounted) setIsLoading(false);
            }, 300);

            // Compute center offset from calibrated prop or resource AABB center
            const center = modelCenter || (loadedAsset.resource?.aabb?.center ? {
              x: loadedAsset.resource.aabb.center.x,
              y: loadedAsset.resource.aabb.center.y,
              z: loadedAsset.resource.aabb.center.z,
            } : { x: 0, y: 0, z: 0 });

            // Shift splatEntity by -center so that the model's visual core is pinned at (0, 0, 0)
            splatEntity.setLocalPosition(-center.x, -center.y, -center.z);

            // Attach gsplat component to the entity already in the scene graph
            splatEntity.addComponent('gsplat', {
              asset: loadedAsset,
            });
          });

          asset.on('error', (err: any) => {
            console.warn(`Asset load failed for ${url}:`, err);
            if (!isRetry && fallbackUrl) {
              console.log(`Falling back to ${fallbackUrl}...`);
              loadSogAsset(fallbackUrl, true);
            } else {
              if (isMounted) {
                setError('Unable to stream SOG asset directly. Please check browser WebGL2 status.');
                setIsLoading(false);
              }
            }
          });

          app.assets.add(asset);
          app.assets.load(asset);
        };

        loadSogAsset(sogUrl);

      } catch (err: any) {
        console.error('PlayCanvas initialization error:', err);
        if (isMounted) {
          setError(err.message || 'WebGL initialization failure');
          setIsLoading(false);
        }
      }
    };

    initPlayCanvas();

    return () => {
      isMounted = false;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (resizeObserver) {
        resizeObserver.disconnect();
        resizeObserver = null;
      }
      splatEntityRef.current = null;
      pivotEntityRef.current = null;
      if (appRef.current) {
        try {
          appRef.current.destroy();
        } catch (e) {}
        appRef.current = null;
      }
    };
  }, [sogUrl, fallbackUrl, initialUpright, modelCenter, resizeViewerCanvas]);

  const handlePointerDown = (e: React.PointerEvent) => {
    orbitState.current.isDragging = true;
    orbitState.current.dragButton = e.button;
    orbitState.current.prevX = e.clientX;
    orbitState.current.prevY = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!orbitState.current.isDragging) return;

    const dx = e.clientX - orbitState.current.prevX;
    const dy = e.clientY - orbitState.current.prevY;
    orbitState.current.prevX = e.clientX;
    orbitState.current.prevY = e.clientY;

    if (orbitState.current.dragButton === 0 && !e.shiftKey && !e.ctrlKey) {
      orbitState.current.yaw -= dx * 0.32;
      orbitState.current.pitch = Math.max(-89, Math.min(89, orbitState.current.pitch - dy * 0.32));
    } else {
      // 3D View-Plane Pan (Screen Right & Screen Up)
      // Uses the camera's actual view orientation for 1:1 responsive, non-stuck panning in all directions
      const cam = cameraRef.current;
      const panSpeed = orbitState.current.distance * 0.0016;

      if (cam) {
        const right = cam.right;
        const up = cam.up;
        orbitState.current.target.x += (-right.x * dx + up.x * dy) * panSpeed;
        orbitState.current.target.y += (-right.y * dx + up.y * dy) * panSpeed;
        orbitState.current.target.z += (-right.z * dx + up.z * dy) * panSpeed;
      } else {
        const rad = (orbitState.current.yaw) * (Math.PI / 180);
        const pitchRad = (orbitState.current.pitch) * (Math.PI / 180);
        const cosY = Math.cos(rad);
        const sinY = Math.sin(rad);
        const sinP = Math.sin(pitchRad);
        const cosP = Math.cos(pitchRad);

        orbitState.current.target.x -= (dx * cosY - dy * sinY * sinP) * panSpeed;
        orbitState.current.target.z -= (-dx * sinY - dy * cosY * sinP) * panSpeed;
        orbitState.current.target.y += dy * cosP * panSpeed;
      }
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    orbitState.current.isDragging = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) {}
  };

  return (
    <div 
      ref={containerRef}
      style={{ overscrollBehavior: 'contain' }}
      className={`relative w-full overflow-hidden bg-slate-950 flex flex-col select-none overscroll-none touch-none ${
        isFullscreen
          ? '!fixed !inset-0 !z-50 !w-screen !h-screen !rounded-none !border-none'
          : 'rounded-2xl border border-slate-200 shadow-xl h-[520px] sm:h-[620px] lg:h-[680px]'
      }`}
    >
      {/* 1. Top HUD Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-transparent pointer-events-none">
        {/* Left: Model Identity & Live Telemetry */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-9 h-9 rounded-xl bg-[#0085ca]/20 border border-[#0085ca]/40 flex items-center justify-center text-[#38bdf8] shadow-lg">
            <Box className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="text-sm sm:text-base font-bold text-white font-sans tracking-tight">
                {title}
              </h4>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] font-mono text-emerald-400 font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                WebGL2 3DGS
              </span>
              {isReferenceExample && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-500/15 border border-amber-500/30 text-[10px] font-mono text-amber-300 font-semibold">
                  Reference Benchmark
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs font-mono text-slate-400 mt-0.5">
              <span>{splatCount}</span>
              <span className="text-slate-600">·</span>
              <span className="text-sky-300">{sogUrl.toLowerCase().endsWith('.ply') ? '3DGS PLY Stream' : 'SOG Chunked LOD'}</span>
              <span className="text-slate-600">·</span>
              <span className="text-emerald-400 font-bold">{fps} FPS</span>
            </div>
          </div>
        </div>

        {/* Right: Camera Presets & Viewer Controls */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Live Camera Pose Inspector Toggle (only when enabled) */}
          {enableCameraInspector && (
            <button
              onClick={() => setShowCameraInspector(!showCameraInspector)}
              title="Inspect and copy real-time camera pose coordinates (Live Camera Pose Inspector)"
              className={`p-2 sm:px-3 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                showCameraInspector 
                  ? 'bg-amber-500/25 border-amber-500/60 text-amber-300 shadow-sm' 
                  : 'bg-slate-900/80 border-slate-800 text-amber-400 hover:text-amber-300 hover:bg-slate-800'
              }`}
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline text-[11px] font-semibold">Cam Pose</span>
            </button>
          )}

          {/* View Presets */}
          <div className="hidden sm:inline-flex items-center rounded-lg bg-slate-900/80 border border-slate-800 p-1 text-xs font-mono">
            <button
              onClick={() => setViewPreset('orbit')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewerMode === 'orbit' ? 'bg-[#0085ca] text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Perspective
            </button>
            <button
              onClick={() => setViewPreset('front')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewerMode === 'front' ? 'bg-[#0085ca] text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Front Facade
            </button>
            <button
              onClick={() => setViewPreset('top')}
              className={`px-2.5 py-1 rounded transition-colors ${
                viewerMode === 'top' ? 'bg-[#0085ca] text-white font-semibold shadow-xs' : 'text-slate-400 hover:text-white'
              }`}
            >
              Aerial Top
            </button>
          </div>

          {/* Auto-Rotate Toggle (Hidden if disabled) */}
          {enableAutoRotate && (
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              title={autoRotate ? 'Pause Auto Orbit' : 'Resume Auto Orbit'}
              className={`p-2 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
                autoRotate 
                  ? 'bg-[#0085ca]/20 border-[#0085ca]/50 text-[#38bdf8]' 
                  : 'bg-slate-900/80 border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span className="hidden md:inline font-semibold">{autoRotate ? 'Auto Orbit' : 'Static'}</span>
            </button>
          )}

          {/* Flip Vertical (Y-Axis Orientation) */}
          <button
            onClick={toggleFlipY}
            title={isUpright ? 'Model Upright (180° X correction). Click to invert.' : 'Model Inverted (0°). Click to set upright.'}
            className={`p-2 rounded-lg border text-xs font-mono transition-colors flex items-center gap-1.5 ${
              isUpright
                ? 'bg-slate-900/80 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800'
                : 'bg-amber-500/20 border-amber-500/50 text-amber-300'
            }`}
          >
            <ArrowUpDown className="w-4 h-4" />
            <span className="hidden xl:inline text-[11px] font-semibold">{isUpright ? 'Y-Up' : 'Inverted'}</span>
          </button>

          {/* Zoom Controls */}
          <div className="hidden sm:inline-flex items-center rounded-lg bg-slate-900/80 border border-slate-800 p-0.5">
            <button
              onClick={() => handleZoom(-3.0)}
              title="Zoom In (or Scroll Up)"
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => handleZoom(3.0)}
              title="Zoom Out (or Scroll Down)"
              className="p-1.5 rounded text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Reset View */}
          <button
            onClick={resetCamera}
            title="Reset Camera Angle"
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Live Camera Pose Inspector Floating Panel (only when enabled) */}
      {enableCameraInspector && showCameraInspector && (
        <div className="absolute top-20 right-4 sm:right-6 z-30 w-84 max-w-[calc(100%-2rem)] rounded-2xl bg-slate-950/95 backdrop-blur-md border border-amber-500/40 shadow-2xl p-4 text-xs font-mono text-slate-200 pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800">
            <div className="flex items-center gap-2 text-amber-400 font-bold">
              <Camera className="w-4 h-4" />
              <span className="text-xs tracking-tight">Live Camera Pose</span>
            </div>
            <button
              onClick={() => setShowCameraInspector(false)}
              className="text-slate-400 hover:text-white text-base leading-none px-1.5 py-0.5 rounded hover:bg-slate-800 transition-colors"
              title="Close"
            >
              ×
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mb-3 leading-relaxed">
            Orbit, pan, or zoom the viewer to update live coordinates. Click Copy below to export the exact camera pose JSON.
          </p>

          <div className="space-y-1.5 mb-3.5 bg-slate-900/90 rounded-xl p-3 border border-slate-800 text-[11px]">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">initialDistance:</span>
              <span className="text-sky-300 font-bold font-mono">{currentPose.distance.toFixed(1)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">initialPitch:</span>
              <span className="text-sky-300 font-bold font-mono">{currentPose.pitch.toFixed(1)}°</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">initialYaw:</span>
              <span className="text-sky-300 font-bold font-mono">{currentPose.yaw.toFixed(1)}°</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">initialTarget:</span>
              <span className="text-emerald-400 font-bold font-mono">
                {`{ x: ${currentPose.target.x.toFixed(2)}, y: ${currentPose.target.y.toFixed(2)}, z: ${currentPose.target.z.toFixed(2)} }`}
              </span>
            </div>
          </div>

          <button
            onClick={handleCopyPose}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98]"
          >
            {isCopied ? <Check className="w-4 h-4 text-emerald-950 stroke-[3]" /> : <Copy className="w-4 h-4 text-slate-950" />}
            <span>{isCopied ? 'Copied to Clipboard!' : 'Copy Camera Pose (JSON)'}</span>
          </button>

          {isCopied && (
            <span className="block text-center text-[10px] text-emerald-400 font-semibold mt-2">
              ✓ Copied to clipboard! Ready to apply to initial camera configuration.
            </span>
          )}
        </div>
      )}

      {/* 2. Interactive WebGL Canvas */}
      <div 
        className="relative flex-1 w-full h-full min-h-0 cursor-grab active:cursor-grabbing overflow-hidden touch-none overscroll-none"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onContextMenu={(e) => e.preventDefault()}
      >
        <canvas 
          ref={canvasRef} 
          id={canvasId.current}
          className="w-full h-full block touch-none"
          style={{ touchAction: 'none', width: '100%', height: '100%' }}
        />
      </div>

      {/* 3. Loading Overlay with Progress */}
      {isLoading && !error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md p-6 text-center">
          <div className="relative w-16 h-16 mb-5 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#0085ca]/20 animate-ping" />
            <div className="w-12 h-12 rounded-full border-3 border-t-[#0085ca] border-slate-800 animate-spin" />
            <Sparkles className="w-5 h-5 text-[#38bdf8] absolute" />
          </div>

          <h5 className="text-base font-bold text-white font-sans mb-1.5">
            {sogUrl.toLowerCase().endsWith('.ply') ? 'Streaming 3D Gaussian Splatting PLY' : 'Streaming 3D Gaussian Splatting Octree'}
          </h5>
          <p className="text-xs text-slate-400 font-mono mb-4 max-w-sm">
            Unpacking {splatCount} into GPU texture buffers...
          </p>

          <div className="w-64 h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
            <div 
              className="h-full bg-gradient-to-r from-[#0085ca] to-sky-400 transition-all duration-300"
              style={{ width: `${Math.max(8, loadProgress)}%` }}
            />
          </div>
          <span className="text-[11px] font-mono text-sky-300">
            {loadProgress > 0 ? `${loadProgress}% complete` : 'Initializing WebGL2 device...'}
          </span>
        </div>
      )}

      {/* 4. Error Fallback */}
      {error && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/90 p-6 text-center">
          <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 mb-3">
            <Info className="w-6 h-6" />
          </div>
          <h5 className="text-sm font-bold text-white font-sans mb-1">Viewer Streaming Notice</h5>
          <p className="text-xs text-slate-400 max-w-md font-mono mb-4 leading-relaxed">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 rounded-lg bg-[#0085ca] text-white text-xs font-mono font-semibold hover:bg-[#0070ab] transition-colors"
          >
            Retry WebGL Connection
          </button>
        </div>
      )}

      {/* 5. Bottom Instructions Pill Bar */}
      <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none text-xs font-mono">
        <div className="pointer-events-auto inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-300 shadow-md text-[11px]">
          <span className="flex items-center gap-1.5">
            <span className="text-sky-300 font-bold">Left Drag</span> Orbit
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-sky-300 font-bold">Right / Shift+Drag</span> Pan
          </span>
          <span className="text-slate-600">·</span>
          <span className="flex items-center gap-1.5">
            <span className="text-sky-300 font-bold">Scroll</span> Zoom
          </span>
        </div>

        <div className="pointer-events-auto hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-800 text-slate-400 text-[11px]">
          <Compass className="w-3.5 h-3.5 text-[#0085ca]" />
          <span>Interactive 3DGS Web Ingestion Prototype</span>
        </div>
      </div>
    </div>
  );
};
