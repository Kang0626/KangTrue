/**
 * Interactive End-to-End Pipeline Workflow Component
 * Highlights the 6-stage workflow matching Truescape requirements
 */

export const PIPELINE_STEPS = [
  {
    step: "01",
    title: "Reality Capture & RTK Survey",
    desc: "Multi-altitude aerial drone flights (DJI Matrice 350 RTK) and terrestrial DSLR photogrammetry tied to NZTM2000 surveyor control points.",
    tools: ["DJI Terra", "RTK GPS", "Sony A7R V", "GCP Survey"],
    highlight: "Millimeter ground resolution & geospatial anchoring"
  },
  {
    step: "02",
    title: "SfM & Camera Calibration",
    desc: "COLMAP feature extraction, high-precision lens distortion estimation, principal point alignment and camera intrinsic matrix solving.",
    tools: ["COLMAP", "RealityCapture", "OpenCV"],
    highlight: "Zero lens drift & exact focal length matching"
  },
  {
    step: "03",
    title: "3DGS Training & Splat Pruning",
    desc: "Optimizing 2-4M Gaussian primitives with spherical harmonics (SH) for photorealistic lighting reflection, foliage, and transparent haze.",
    tools: ["3D Gaussian Splatting", "PostShot", "Nerfstudio"],
    highlight: "Spherical harmonics degree 3 + densification"
  },
  {
    step: "04",
    title: "CAD & BIM Hybrid Integration",
    desc: "Importing engineering CAD assets (turbines, substations, highway barriers) directly into the calibrated 3DGS coordinate frame.",
    tools: ["Autodesk 3ds Max", "Maya", "Rhino 3D", "Revit"],
    highlight: "Seamless spatial registration & occlusion handling"
  },
  {
    step: "05",
    title: "Redshift Render & Post-Production",
    desc: "Matching sun trajectory, environmental shadows, atmospheric fog, and grain matching in Adobe Premiere & After Effects for RMA hearings.",
    tools: ["Redshift", "Adobe Photoshop", "After Effects", "Nuke"],
    highlight: "Court-defensible visual accuracy & RMA compliance"
  }
];

export class PipelineChart {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.detailBox = document.getElementById('pipeline-detail-box');
    this.init();
  }

  init() {
    if (!this.container) return;
    this.renderNodes();
  }

  renderNodes() {
    this.container.innerHTML = '';

    PIPELINE_STEPS.forEach((step, idx) => {
      const node = document.createElement('div');
      node.className = `pipeline-node ${idx === 0 ? 'active' : ''}`;
      node.innerHTML = `
        <div class="pipeline-step-num">
          <span>STEP ${step.step}</span>
          <span class="badge badge-cyan" style="font-size:0.6rem">PHASE</span>
        </div>
        <h4 class="pipeline-node-title">${step.title}</h4>
        <p class="pipeline-node-desc">${step.desc}</p>
        <div class="pipeline-tool-list">
          ${step.tools.map(t => `<span class="pipeline-tool-tag">${t}</span>`).join('')}
        </div>
      `;

      node.addEventListener('click', () => {
        const allNodes = this.container.querySelectorAll('.pipeline-node');
        allNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        this.updateDetail(step);
      });

      this.container.appendChild(node);
    });
  }

  updateDetail(step) {
    if (!this.detailBox) return;
    this.detailBox.innerHTML = `
      <div class="glass-panel" style="padding: 20px; border-radius: var(--radius-md); border-left: 3px solid var(--accent-cyan);">
        <h4 style="color: var(--accent-cyan); margin-bottom: 6px;">[Step ${step.step}] ${step.title} - Quality Assurance Focus</h4>
        <p style="font-size: 0.9rem; color: var(--text-secondary); margin-bottom: 10px;">${step.desc}</p>
        <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--accent-emerald);">
          ✓ Key Deliverable: <strong>${step.highlight}</strong>
        </div>
      </div>
    `;
  }
}
