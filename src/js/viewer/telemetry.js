/**
 * Telemetry HUD & Camera Calibration Data Module
 * Demonstrates precision camera matching (Focal length, Sensor, Altitude, FOV)
 */

export class TelemetryManager {
  constructor() {
    this.fpsCounter = 60;
    this.frameCount = 0;
    this.lastFpsTime = performance.now();
    
    // UI elements
    this.fpsEl = document.getElementById('hud-fps');
    this.splatsEl = document.getElementById('hud-splats');
    this.focalEl = document.getElementById('hud-focal');
    this.fovEl = document.getElementById('hud-fov');
    this.altEl = document.getElementById('hud-altitude');
    this.coordsEl = document.getElementById('hud-coords');
    this.solarEl = document.getElementById('hud-solar');
    this.modeEl = document.getElementById('hud-render-mode');
  }

  update(camera, splatCount, renderMode = 'Gaussian Splats', solarAngle = 45) {
    // 1. Calculate FPS
    this.frameCount++;
    const now = performance.now();
    if (now - this.lastFpsTime >= 500) {
      this.fpsCounter = Math.round((this.frameCount * 1000) / (now - this.lastFpsTime));
      this.frameCount = 0;
      this.lastFpsTime = now;
      if (this.fpsEl) this.fpsEl.textContent = `${this.fpsCounter} FPS`;
    }

    // 2. Compute 35mm Full-Frame Equivalent Focal Length
    // f = 36 / (2 * tan(fov_rad / 2))
    const fovRad = (camera.fov * Math.PI) / 180;
    const sensorWidth = 36.0; // mm (Full-frame standard)
    const focalLengthMm = Math.round((sensorWidth / (2 * Math.tan(fovRad / 2))));

    if (this.focalEl) this.focalEl.textContent = `${focalLengthMm}mm (FF Eq)`;
    if (this.fovEl) this.fovEl.textContent = `${camera.fov.toFixed(1)}° H-FOV`;

    // 3. Splat count formatting
    if (this.splatsEl) {
      const formattedCount = (splatCount >= 1000000) 
        ? `${(splatCount / 1000000).toFixed(2)}M Splats`
        : `${(splatCount / 1000).toFixed(0)}k Splats`;
      this.splatsEl.textContent = formattedCount;
    }

    // 4. Position & Altitude
    const altitude = Math.max(1.5, Math.round(camera.position.y * 10 + 120));
    if (this.altEl) this.altEl.textContent = `${altitude}m AMSL`;
    if (this.coordsEl) {
      this.coordsEl.textContent = `${camera.position.x.toFixed(1)}, ${camera.position.z.toFixed(1)}`;
    }

    // 5. Solar angle & mode
    if (this.solarEl) this.solarEl.textContent = `${solarAngle.toFixed(0)}° Azimuth`;
    if (this.modeEl) this.modeEl.textContent = renderMode;
  }
}
