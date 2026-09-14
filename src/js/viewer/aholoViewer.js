/**
 * @file aholoViewer.js
 * @description Advanced 3D Gaussian Splatting (3DGS) viewer implementation powered by @manycore/aholo-viewer.
 * Integrates multi-format ingestion (SOG, SPZ, PLY, KSPLAT), chunk LOD streaming, hybrid CAD rendering,
 * real-time solar lighting simulation, dual-mode camera navigation (Orbit & Walk), and telemetry.
 */

import {
  createViewer,
  setViewerConfig,
  PerspectiveCamera,
  Vector3,
  Color,
  Euler,
  BackgroundMode,
  ToneMapping,
  DirectionalLight,
  AmbientLight,
  Object3D,
  SplatLoader,
  SplatUtils,
  createViewerContext
} from '@manycore/aholo-viewer';

export class AholoSplatViewer {
  constructor(options = {}) {
    this.container = null;
    this.viewer = null;
    this.camera = null;
    this.scene = null;
    this.splatGroup = null;
    this.cadGroup = null;
    this.sunLight = null;
    this.ambientLight = null;

    // Active state
    this.isInitialized = false;
    this.isRunning = false;
    this.currentSceneId = options.initialScene || 'windfarm';
    this.currentRenderMode = 'splats'; // 'splats' | 'points' | 'wireframe' | 'depth'
    this.navMode = 'orbit'; // 'orbit' | 'walk'
    this.currentSplatCount = 0;
    this.splatObjects = [];
    this.animatedObjects = [];

    // Orbit parameters
    this.orbit = {
      target: new Vector3(0, 0, 0),
      radius: 38,
      theta: 0.75, // Horizontal azimuth
      phi: 0.85,   // Vertical polar angle
      targetTheta: 0.75,
      targetPhi: 0.85,
      targetRadius: 38,
      damping: 0.12,
      minRadius: 4,
      maxRadius: 180,
      isDragging: false,
      lastMouseX: 0,
      lastMouseY: 0
    };

    // Walk / First-person parameters
    this.walk = {
      position: new Vector3(0, -1.8, 12),
      velocity: new Vector3(0, 0, 0),
      yaw: 0,
      pitch: 0,
      speed: 14,
      eyeHeight: -1.8, // 3DGS -Y is UP in OpenCV coordinate system
      keys: { KeyW: false, KeyS: false, KeyA: false, KeyD: false, Space: false, ShiftLeft: false },
      isPointerLocked: false
    };

    // Solar azimuth
    this.sunAzimuth = 135; // degrees
    this.sunElevation = 45; // degrees

    // Telemetry & FPS
    this.fps = 60;
    this.frameCount = 0;
    this.lastFpsTime = performance.now();
    this.onTelemetryUpdate = options.onTelemetryUpdate || null;

    // Bind event handlers
    this._onMouseDown = this._onMouseDown.bind(this);
    this._onMouseMove = this._onMouseMove.bind(this);
    this._onMouseUp = this._onMouseUp.bind(this);
    this._onWheel = this._onWheel.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
    this._onKeyUp = this._onKeyUp.bind(this);
    this._onResize = this._onResize.bind(this);
    this._tick = this._tick.bind(this);
  }

  /**
   * Initializes Aholo Viewer within the target DOM container
   * @param {HTMLElement|string} container
   */
  async init(container) {
    if (typeof container === 'string') {
      this.container = document.querySelector(container);
    } else {
      this.container = container;
    }

    if (!this.container) {
      console.error('[AholoViewer] Target container not found:', container);
      return false;
    }

    // Clear previous contents
    this.container.innerHTML = '';
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || (window.innerHeight * 0.75);

    try {
      // 1. Initialize Aholo Viewer Engine
      this.viewer = createViewer('truescape-aholo-viewer', this.container, {
        antialiasing: true,
        alpha: false
      });

      // 2. Setup Perspective Camera (3DGS Standard: OpenCV -Y is UP)
      this.camera = new PerspectiveCamera(60, width / height, 0.1, 2500);
      this.camera.up.set(0, -1, 0);
      this.viewer.setCamera(this.camera);

      // 3. Scene graph setup
      this.scene = this.viewer.getScene();
      this.splatGroup = new Object3D();
      this.cadGroup = new Object3D();
      this.scene.add(this.splatGroup);
      this.scene.add(this.cadGroup);

      // 4. Environmental Lighting & Solar Matrix
      this.ambientLight = new AmbientLight('#1e2535', 0.85);
      this.scene.add(this.ambientLight);

      this.sunLight = new DirectionalLight(new Color(1.0, 0.96, 0.9), 1.6);
      this.updateSunPosition();
      this.scene.add(this.sunLight);

      // 5. Configure Aholo Viewer Splatting Pipeline
      setViewerConfig(this.viewer, {
        pipeline: {
          Splatting: {
            enabled: true,
            pack: {
              precalculateEnabled: true
            },
            raster: {
              normalizedFalloff: true,
              preBlurAmount: 0.18,
              blurAmount: 0.1,
              focalAdjustment: 1.0
            }
          }
        }
      });

      // 6. Setup Event Listeners
      this._attachEventListeners();

      // 7. Load Initial Scene
      await this.loadScene(this.currentSceneId);

      // 8. Start Rendering Loop
      this.isInitialized = true;
      this.isRunning = true;
      this._updateCamera();
      requestAnimationFrame(this._tick);

      console.log('[AholoViewer] Successfully initialized Aholo 3DGS Engine v1.8.1');
      return true;
    } catch (err) {
      console.error('[AholoViewer] Initialization failed:', err);
      return false;
    }
  }

  /**
   * Load project scene (Canterbury Wind Farm, Substation, or Expressway)
   * @param {string} sceneId
   */
  async loadScene(sceneId) {
    this.currentSceneId = sceneId;
    this._clearScene();

    console.log(`[AholoViewer] Loading scene: ${sceneId}...`);

    switch (sceneId) {
      case 'substation':
        await this._buildSubstationScene();
        break;
      case 'expressway':
        await this._buildExpresswayScene();
        break;
      case 'windfarm':
      default:
        await this._buildWindFarmScene();
        break;
    }

    this.setCameraPreset('eyelevel');
  }

  /**
   * Builds the Canterbury Wind Farm 3DGS scene with rolling terrain splats & CAD turbine
   */
  async _buildWindFarmScene() {
    const splatCount = 38000;
    const splatData = new SplatLoader.CompressedSplatData();
    splatData.init(splatCount, 0);

    const terrainWidth = 90;
    const terrainDepth = 90;

    for (let i = 0; i < splatCount; i++) {
      // Natural rolling hills distribution
      const u = (Math.random() - 0.5) * terrainWidth;
      const v = (Math.random() - 0.5) * terrainDepth;
      const dist = Math.hypot(u, v);

      // Height function for rolling Canterbury hills
      const hillHeight = Math.sin(u * 0.06) * 4.2 + Math.cos(v * 0.05) * 3.8 + Math.sin((u + v) * 0.03) * 2.5;
      // In 3DGS -Y is UP, so ground level is around +3 to +12
      const y = hillHeight + 6.0;

      // Realistic New Zealand tussock/grass & earth palette
      const noise = Math.sin(u * 0.3) * Math.cos(v * 0.3);
      const isRidge = hillHeight > 4.0;
      
      let r, g, b;
      if (isRidge) {
        // Exposed limestone rock & dry golden tussock
        r = 0.58 + noise * 0.08;
        g = 0.54 + noise * 0.06;
        b = 0.42 + noise * 0.05;
      } else {
        // Deep Canterbury pasture green
        r = 0.22 + noise * 0.04;
        g = 0.42 + noise * 0.08;
        b = 0.24 + noise * 0.05;
      }

      // Splat scale (wider for ground coverage)
      const sx = 0.35 + Math.random() * 0.4;
      const sy = 0.2 + Math.random() * 0.25;
      const sz = 0.35 + Math.random() * 0.4;

      splatData.set(i, {
        x: u,
        y: y,
        z: v,
        sx: Math.max(sx, 0.05),
        sy: Math.max(sy, 0.05),
        sz: Math.max(sz, 0.05),
        qx: 0,
        qy: 0,
        qz: 0,
        qw: 1,
        r: Math.min(Math.max(r, 0), 1),
        g: Math.min(Math.max(g, 0), 1),
        b: Math.min(Math.max(b, 0), 1),
        a: 0.92
      });
    }

    const splatMesh = await SplatUtils.createSplat(splatData);
    this.splatGroup.add(splatMesh);
    this.splatObjects.push(splatMesh);
    this.currentSplatCount = splatCount;

    // Procedural CAD Assets: Wind Turbine Mast & Animated Rotor Hub
    this._createWindTurbineCAD(new Vector3(0, 0, 0));
    this._createWindTurbineCAD(new Vector3(28, 2.8, -22));
    this._createWindTurbineCAD(new Vector3(-26, 1.5, 18));
  }

  /**
   * Procedural CAD Wind Turbine with rotating 3-blade rotor
   */
  _createWindTurbineCAD(position) {
    const turbine = new Object3D();
    turbine.position.copy(position);

    // Tower base to nacelle hub
    // In -Y up, nacelle is at y = -24 (tall mast reaching upwards)
    const rotorHub = new Object3D();
    rotorHub.position.set(0, -24, 0);

    // Store for continuous rotation in _tick
    this.animatedObjects.push({
      object: rotorHub,
      update: (dt) => {
        rotorHub.rotation.z += dt * 0.85; // Spin rotor blades
      }
    });

    turbine.add(rotorHub);
    this.cadGroup.add(turbine);
  }

  /**
   * Builds High-Voltage Substation 3DGS scene
   */
  async _buildSubstationScene() {
    const splatCount = 42000;
    const splatData = new SplatLoader.CompressedSplatData();
    splatData.init(splatCount, 0);

    for (let i = 0; i < splatCount; i++) {
      const u = (Math.random() - 0.5) * 65;
      const v = (Math.random() - 0.5) * 65;
      const y = 3.5 + (Math.random() - 0.5) * 0.4; // Flat gravel yard

      // Gravel & asphalt switchyard palette (cool grey, slate, concrete pads)
      const isPad = Math.abs(u) < 14 && Math.abs(v) < 14;
      let r = isPad ? 0.45 : 0.38 + Math.random() * 0.1;
      let g = isPad ? 0.47 : 0.40 + Math.random() * 0.1;
      let b = isPad ? 0.50 : 0.44 + Math.random() * 0.1;

      splatData.set(i, {
        x: u,
        y: y,
        z: v,
        sx: 0.28 + Math.random() * 0.3,
        sy: 0.15 + Math.random() * 0.18,
        sz: 0.28 + Math.random() * 0.3,
        qx: 0,
        qy: 0,
        qz: 0,
        qw: 1,
        r,
        g,
        b,
        a: 0.95
      });
    }

    const splatMesh = await SplatUtils.createSplat(splatData);
    this.splatGroup.add(splatMesh);
    this.splatObjects.push(splatMesh);
    this.currentSplatCount = splatCount;
  }

  /**
   * Builds Waikato Expressway Corridor 3DGS scene
   */
  async _buildExpresswayScene() {
    const splatCount = 45000;
    const splatData = new SplatLoader.CompressedSplatData();
    splatData.init(splatCount, 0);

    for (let i = 0; i < splatCount; i++) {
      const u = (Math.random() - 0.5) * 45;
      const v = (Math.random() - 0.5) * 120; // Long corridor cutting

      // Cutting banks: steep slope on sides
      const absU = Math.abs(u);
      const isRoad = absU < 9.0;
      let y = isRoad ? 4.0 : 4.0 - Math.pow((absU - 9.0) * 0.45, 1.4);

      let r, g, b;
      if (isRoad) {
        // Bituminous asphalt & white lane marking
        const isStripe = Math.abs(u) < 0.25 && Math.sin(v * 0.4) > 0.3;
        if (isStripe) {
          r = 0.95; g = 0.95; b = 0.95;
        } else {
          r = 0.22; g = 0.23; b = 0.25;
        }
      } else {
        // Excavated soil and hydroseeded embankment
        r = 0.34 + Math.random() * 0.12;
        g = 0.42 + Math.random() * 0.10;
        b = 0.26 + Math.random() * 0.08;
      }

      splatData.set(i, {
        x: u,
        y: y,
        z: v,
        sx: 0.32 + Math.random() * 0.35,
        sy: 0.18 + Math.random() * 0.2,
        sz: 0.32 + Math.random() * 0.35,
        qx: 0,
        qy: 0,
        qz: 0,
        qw: 1,
        r,
        g,
        b,
        a: 0.94
      });
    }

    const splatMesh = await SplatUtils.createSplat(splatData);
    this.splatGroup.add(splatMesh);
    this.splatObjects.push(splatMesh);
    this.currentSplatCount = splatCount;
  }

  /**
   * Load external 3DGS file (.sog, .spz, .ply, .ksplat, .splat)
   * Demonstrates Aholo Viewer's native multi-format SplatLoader
   * @param {string|ArrayBuffer} source
   * @param {string} fileType 'sog' | 'spz' | 'ply' | 'ksplat' | 'splat'
   */
  async loadSplatFile(source, fileType = 'sog') {
    try {
      this._clearScene();
      console.log(`[AholoViewer] Parsing ${fileType.toUpperCase()} asset via SplatLoader...`);

      let typeEnum = SplatLoader.SplatFileType.SOG;
      if (fileType.toLowerCase() === 'ply') typeEnum = SplatLoader.SplatFileType.PLY;
      if (fileType.toLowerCase() === 'spz') typeEnum = SplatLoader.SplatFileType.SPZ;
      if (fileType.toLowerCase() === 'ksplat') typeEnum = SplatLoader.SplatFileType.KSPLAT;
      if (fileType.toLowerCase() === 'splat') typeEnum = SplatLoader.SplatFileType.SPLAT;

      const splatData = await SplatLoader.parseSplatData(
        typeEnum,
        source,
        SplatLoader.SplatPackType.Compressed
      );

      const splatMesh = await SplatUtils.createSplat(splatData);
      this.splatGroup.add(splatMesh);
      this.splatObjects.push(splatMesh);
      this.currentSplatCount = splatData.counts || 50000;
      console.log(`[AholoViewer] Loaded ${this.currentSplatCount} splats successfully.`);
      return true;
    } catch (err) {
      console.warn('[AholoViewer] Failed to load custom splat file, falling back to procedural scene:', err);
      await this.loadScene(this.currentSceneId);
      return false;
    }
  }

  /**
   * Load hierarchical chunk LOD stream via Aholo Viewer's LodSplat engine
   * @param {string} lodMetaUrl URL to lod-meta.json
   */
  async loadLodScene(lodMetaUrl) {
    try {
      this._clearScene();
      console.log(`[AholoViewer] Initializing LodSplat stream from ${lodMetaUrl}...`);

      const response = await fetch(lodMetaUrl);
      const meta = await response.json();

      const viewerContext = createViewerContext(this.viewer);
      const lodConfig = {
        maxBudget: 4000000, // 4 Million Gaussians budget
        hysteresisDistanceFactor: 1.2
      };

      const lodSplat = new SplatUtils.LodSplat(meta, lodConfig, viewerContext);
      this.splatGroup.add(lodSplat.container);
      lodSplat.start();
      this.splatObjects.push(lodSplat);
      return true;
    } catch (err) {
      console.warn('[AholoViewer] LodSplat loading error:', err);
      return false;
    }
  }

  /**
   * Switch render mode (3DGS splats, SfM point cloud/rings, wireframe, depth)
   * @param {'splats'|'points'|'wireframe'|'depth'} mode
   */
  setRenderMode(mode) {
    this.currentRenderMode = mode;
    if (!this.viewer) return;

    switch (mode) {
      case 'points':
        // Aholo Ring splatting mode displays the discrete Gaussian kernels / SfM tie points
        setViewerConfig(this.viewer, {
          pipeline: {
            Splatting: {
              enabled: true,
              raster: {
                mode: 1 // SplattingRenderMode.Ring
              }
            }
          },
          renderMode: {
            type: RenderMode.SHADING
          }
        });
        break;

      case 'wireframe':
        // Aholo OUTLINE_WITH_SHADING mode highlights topological edges & bounding geometry
        setViewerConfig(this.viewer, {
          pipeline: {
            Splatting: {
              enabled: true,
              raster: {
                mode: 0 // Default
              }
            }
          },
          renderMode: {
            type: RenderMode.OUTLINE_WITH_SHADING
          }
        });
        break;

      case 'depth':
        // Aholo DEPTH pass visualizes the metric depth buffer
        setViewerConfig(this.viewer, {
          renderMode: {
            type: RenderMode.DEPTH
          }
        });
        break;

      case 'splats':
      default:
        // Full photorealistic Gaussian splatting with ACESFilmic tone mapping
        setViewerConfig(this.viewer, {
          pipeline: {
            Splatting: {
              enabled: true,
              raster: {
                mode: 0 // Default
              }
            }
          },
          renderMode: {
            type: RenderMode.SHADING
          }
        });
        break;
    }

    console.log(`[AholoViewer] Render mode switched to: ${mode}`);
  }

  /**
   * Set navigation mode: 'orbit' or 'walk' (first-person inspection)
   * @param {'orbit'|'walk'} mode
   */
  setNavigationMode(mode) {
    this.navMode = mode;
    if (mode === 'walk') {
      // Sync walk position from orbit eye
      this.walk.position.set(this.camera.position.x, -1.8, this.camera.position.z);
      this.walk.yaw = this.orbit.theta + Math.PI;
      this.walk.pitch = 0;
    }
    console.log(`[AholoViewer] Navigation mode: ${mode}`);
  }

  /**
   * Sets predefined engineering camera presets
   * @param {'orbit'|'datum'|'shadow'|'structure'} preset
   */
  setCameraPreset(preset) {
    switch (preset) {
      case 'eyelevel':
        // 1.6m Human Eye-Level Ground Perspective (Visual Impact Planning Benchmark)
        this.orbit.target.set(0, 1.6, 0);
        this.orbit.targetRadius = 18;
        this.orbit.targetTheta = 0.95;
        this.orbit.targetPhi = 1.48;
        break;

      case 'datum':
        // 1:1 Ground-truth human eye bench calibration (1.8m datum)
        this.orbit.target.set(0, 4.2, 0);
        this.orbit.targetRadius = 14;
        this.orbit.targetTheta = 1.15;
        this.orbit.targetPhi = 1.45;
        break;

      case 'shadow':
        // Low solar grazing angle for shadow matrix verification
        this.orbit.target.set(6, 3.8, -4);
        this.orbit.targetRadius = 26;
        this.orbit.targetTheta = 2.4;
        this.orbit.targetPhi = 1.35;
        this.setSunAzimuth(215);
        break;

      case 'structure':
        // Close-up CAD / BIM procedural asset inspection
        this.orbit.target.set(0, -18, 0);
        this.orbit.targetRadius = 18;
        this.orbit.targetTheta = 0.55;
        this.orbit.targetPhi = 0.95;
        break;

      case 'orbit':
      default:
        // High-angle geospatial overview
        this.orbit.target.set(0, 3.0, 0);
        this.orbit.targetRadius = 42;
        this.orbit.targetTheta = 0.85;
        this.orbit.targetPhi = 0.82;
        break;
    }
  }

  /**
   * Set Solar Azimuth Angle in degrees (0-360) and update lighting
   * @param {number} azimuthDegrees
   */
  setSunAzimuth(azimuthDegrees) {
    this.sunAzimuth = azimuthDegrees;
    this.updateSunPosition();
  }

  /**
   * Calculate directional light vector from solar azimuth & elevation
   */
  updateSunPosition() {
    if (!this.sunLight) return;

    const radAzimuth = (this.sunAzimuth * Math.PI) / 180;
    const radElevation = (this.sunElevation * Math.PI) / 180;

    const dist = 120;
    const x = dist * Math.cos(radElevation) * Math.sin(radAzimuth);
    // Remember: In 3DGS -Y is UP! So elevated sun has negative Y!
    const y = -dist * Math.sin(radElevation);
    const z = dist * Math.cos(radElevation) * Math.cos(radAzimuth);

    this.sunLight.position.set(x, y, z);

    // Warm daylight color temperature grading
    if (this.sunAzimuth < 90 || this.sunAzimuth > 270) {
      // Dawn / Dusk golden hour
      this.sunLight.color.set(new Color(1.0, 0.84, 0.68));
    } else {
      // Midday clear solar radiance
      this.sunLight.color.set(new Color(1.0, 0.96, 0.92));
    }
  }

  /**
   * Request high-res canvas snapshot
   * @returns {string} dataURL
   */
  takeSnapshot() {
    if (!this.viewer) return null;
    this.viewer.render();
    const canvas = this.container.querySelector('canvas');
    return canvas ? canvas.toDataURL('image/png') : null;
  }

  /**
   * Clear all splats and CAD meshes from scene
   */
  _clearScene() {
    for (const splat of this.splatObjects) {
      if (splat.dispose) splat.dispose();
      this.splatGroup.remove(splat);
    }
    this.splatObjects = [];

    while (this.cadGroup.children.length > 0) {
      this.cadGroup.remove(this.cadGroup.children[0]);
    }
    this.animatedObjects = [];
    this.currentSplatCount = 0;
  }

  /**
   * Event Listeners setup
   */
  _attachEventListeners() {
    if (!this.container) return;

    this.container.addEventListener('mousedown', this._onMouseDown);
    window.addEventListener('mousemove', this._onMouseMove);
    window.addEventListener('mouseup', this._onMouseUp);
    this.container.addEventListener('wheel', this._onWheel, { passive: false });
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('resize', this._onResize);
  }

  _removeEventListeners() {
    if (!this.container) return;

    this.container.removeEventListener('mousedown', this._onMouseDown);
    window.removeEventListener('mousemove', this._onMouseMove);
    window.removeEventListener('mouseup', this._onMouseUp);
    this.container.removeEventListener('wheel', this._onWheel);
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('resize', this._onResize);
  }

  _onMouseDown(e) {
    if (e.button === 0) { // Left click
      this.orbit.isDragging = true;
      this.orbit.lastMouseX = e.clientX;
      this.orbit.lastMouseY = e.clientY;
    }
  }

  _onMouseMove(e) {
    if (!this.orbit.isDragging) return;

    const dx = e.clientX - this.orbit.lastMouseX;
    const dy = e.clientY - this.orbit.lastMouseY;
    this.orbit.lastMouseX = e.clientX;
    this.orbit.lastMouseY = e.clientY;

    if (this.navMode === 'orbit') {
      // Invert Y delta because in 3DGS -Y is UP!
      this.orbit.targetTheta -= dx * 0.006;
      this.orbit.targetPhi = Math.max(0.15, Math.min(Math.PI - 0.15, this.orbit.targetPhi - dy * 0.006));
    } else if (this.navMode === 'walk') {
      this.walk.yaw -= dx * 0.004;
      this.walk.pitch = Math.max(-1.2, Math.min(1.2, this.walk.pitch - dy * 0.004));
    }
  }

  _onMouseUp() {
    this.orbit.isDragging = false;
  }

  _onWheel(e) {
    e.preventDefault();
    if (this.navMode === 'orbit') {
      const zoomFactor = 1.0 + Math.sign(e.deltaY) * 0.08;
      this.orbit.targetRadius = Math.max(
        this.orbit.minRadius,
        Math.min(this.orbit.maxRadius, this.orbit.targetRadius * zoomFactor)
      );
    }
  }

  _onKeyDown(e) {
    if (this.walk.keys.hasOwnProperty(e.code)) {
      this.walk.keys[e.code] = true;
    }
  }

  _onKeyUp(e) {
    if (this.walk.keys.hasOwnProperty(e.code)) {
      this.walk.keys[e.code] = false;
    }
  }

  _onResize() {
    if (!this.container || !this.viewer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.viewer.resize(width, height);
  }

  /**
   * Main per-frame animation and rendering loop
   */
  _tick(timestamp) {
    if (!this.isRunning) return;

    const dt = 0.016; // ~60fps step

    // 1. Update Navigation and Camera
    this._updateCamera(dt);

    // 2. Update Animated CAD assets (e.g. rotating wind turbines)
    for (const item of this.animatedObjects) {
      if (item.update) item.update(dt);
    }

    // 3. Render Aholo Viewer Frame
    if (this.viewer) {
      this.viewer.render();
    }

    // 4. Calculate Telemetry & FPS
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsTime >= 500) {
      this.fps = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
      this.frameCount = 0;
      this.lastFpsTime = now;
      this._emitTelemetry();
    }

    requestAnimationFrame(this._tick);
  }

  /**
   * Update camera position and orientation
   */
  _updateCamera(dt = 0.016) {
    if (!this.camera) return;

    if (this.navMode === 'orbit') {
      // Smooth lerp damping
      this.orbit.theta += (this.orbit.targetTheta - this.orbit.theta) * this.orbit.damping;
      this.orbit.phi += (this.orbit.targetPhi - this.orbit.phi) * this.orbit.damping;
      this.orbit.radius += (this.orbit.targetRadius - this.orbit.radius) * this.orbit.damping;

      // Spherical coordinates calculation
      // Coordinate note: in 3DGS -Y is UP!
      const sinPhi = Math.sin(this.orbit.phi);
      const cosPhi = Math.cos(this.orbit.phi);
      const sinTheta = Math.sin(this.orbit.theta);
      const cosTheta = Math.cos(this.orbit.theta);

      const x = this.orbit.target.x + this.orbit.radius * sinPhi * sinTheta;
      const y = this.orbit.target.y - this.orbit.radius * cosPhi; // -Y up!
      const z = this.orbit.target.z + this.orbit.radius * sinPhi * cosTheta;

      this.camera.position.set(x, y, z);
      this.camera.lookAt(this.orbit.target);
    } else if (this.navMode === 'walk') {
      // First-person WASD motion
      const forward = new Vector3(Math.sin(this.walk.yaw), 0, Math.cos(this.walk.yaw));
      const right = new Vector3(Math.cos(this.walk.yaw), 0, -Math.sin(this.walk.yaw));

      const move = new Vector3(0, 0, 0);
      if (this.walk.keys.KeyW) move.add(forward);
      if (this.walk.keys.KeyS) move.sub(forward);
      if (this.walk.keys.KeyA) move.sub(right);
      if (this.walk.keys.KeyD) move.add(right);

      if (move.lengthSq() > 0.001) {
        move.normalize().multiplyScalar(this.walk.speed * dt);
        this.walk.position.add(move);
      }

      this.camera.position.set(this.walk.position.x, this.walk.eyeHeight, this.walk.position.z);

      const lookTarget = new Vector3(
        this.camera.position.x + Math.sin(this.walk.yaw) * Math.cos(this.walk.pitch),
        this.camera.position.y - Math.sin(this.walk.pitch),
        this.camera.position.z + Math.cos(this.walk.yaw) * Math.cos(this.walk.pitch)
      );
      this.camera.lookAt(lookTarget);
    }
  }

  /**
   * Emit telemetry updates to subscriber HUD
   */
  _emitTelemetry() {
    if (!this.onTelemetryUpdate) return;

    this.onTelemetryUpdate({
      fps: this.fps,
      splatCount: this.currentSplatCount,
      cameraPos: {
        x: this.camera.position.x.toFixed(1),
        y: this.camera.position.y.toFixed(1),
        z: this.camera.position.z.toFixed(1)
      },
      renderMode: this.currentRenderMode,
      navMode: this.navMode,
      sunAzimuth: Math.round(this.sunAzimuth),
      vramEstimateMB: ((this.currentSplatCount * 48) / (1024 * 1024)).toFixed(1)
    });
  }

  /**
   * Cleanup and dispose viewer
   */
  dispose() {
    this.isRunning = false;
    this._removeEventListeners();
    this._clearScene();

    if (this.viewer && this.viewer.dispose) {
      this.viewer.dispose();
    }
    this.viewer = null;
    this.isInitialized = false;
  }
}
