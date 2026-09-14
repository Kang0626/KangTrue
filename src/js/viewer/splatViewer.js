/**
 * @file splatViewer.js
 * @description Backwards-compatible export wrapping AholoSplatViewer from aholoViewer.js.
 * Provides unified 3DGS interface powered by @manycore/aholo-viewer.
 */

import { AholoSplatViewer } from './aholoViewer.js';
import { TelemetryManager } from './telemetry.js';

export class SplatViewer {
  constructor(canvasContainerId) {
    this.containerId = canvasContainerId;
    this.container = document.getElementById(canvasContainerId);
    this.telemetry = new TelemetryManager();

    this.aholo = new AholoSplatViewer({
      initialScene: 'windfarm',
      onTelemetryUpdate: (data) => {
        if (this.telemetry && this.aholo.camera) {
          const modeLabel = data.renderMode === 'splats' ? '3DGS (ACES Filmic)' :
                            data.renderMode === 'points' ? 'SfM Rings' :
                            data.renderMode === 'wireframe' ? 'CAD Outline' : 'Metric Depth';
          this.telemetry.update(this.aholo.camera, data.splatCount, modeLabel, data.sunAzimuth);
        }
      }
    });

    if (this.container) {
      this.aholo.init(this.container);
    }
  }

  loadScene(sceneId) {
    return this.aholo.loadScene(sceneId);
  }

  setRenderMode(mode) {
    this.aholo.setRenderMode(mode);
  }

  setCameraPreset(preset) {
    this.aholo.setCameraPreset(preset);
  }

  setSunAzimuth(angle) {
    this.aholo.setSunAzimuth(angle);
  }

  setNavigationMode(mode) {
    this.aholo.setNavigationMode(mode);
  }

  loadSplatFile(source, fileType) {
    return this.aholo.loadSplatFile(source, fileType);
  }

  loadLodScene(metaUrl) {
    return this.aholo.loadLodScene(metaUrl);
  }

  dispose() {
    this.aholo.dispose();
  }
}

export { AholoSplatViewer };
