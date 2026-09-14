/**
 * Truescape 3DGS Showcase - Portfolio Projects & Data Specification
 * Tailored for Truescape (Energy, Resources, Infrastructure, Environmental Visualisation)
 */

export const PROJECTS_DATA = [
  {
    id: "canterbury-wind",
    title: "Canterbury Wind Energy Park",
    category: "Renewable Energy & Landscape Assessment",
    badge: "3DGS + 3ds Max / Redshift",
    badgeColor: "cyan",
    desc: "Large-scale 12 sq km reality capture using RTK drone photogrammetry and 3D Gaussian Splatting. Seamlessly integrated 14 proposed 120m wind turbines with accurate shadow flicker and sightline impact from Christchurch arterial viewpoints.",
    metrics: {
      area: "12.4 km²",
      splats: "2.85M",
      accuracy: "< 12mm",
      focalMatch: "35mm / 50mm"
    },
    tools: ["3D Gaussian Splatting", "3ds Max", "Redshift", "COLMAP", "After Effects"],
    thumbnail: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&w=1200&q=80",
    simulationParams: {
      turbineHeight: 120,
      turbinesCount: 14,
      viewpointAltitude: "420m AMSL"
    }
  },
  {
    id: "alpine-substation",
    title: "Southern Alps 220kV Substation & Grid",
    category: "Power & Infrastructure",
    badge: "Sub-Millimeter Splatting",
    badgeColor: "emerald",
    desc: "Complex terrain slope reconstruction in sub-alpine conditions. Solved fine lattice steel transmission tower and wire rendering artifacts using progressive Gaussian splat pruning, and composited CAD expansion models with physically-matched solar lighting.",
    metrics: {
      area: "4.2 km²",
      splats: "1.92M",
      accuracy: "< 8mm",
      focalMatch: "24mm / 85mm"
    },
    tools: ["PostShot 3DGS", "Autodesk Maya", "Redshift", "Forest Pack", "Photoshop"],
    thumbnail: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1200&q=80",
    simulationParams: {
      transformerBays: 4,
      gantryHeight: "28m",
      viewpointAltitude: "280m AMSL"
    }
  },
  {
    id: "waikato-expressway",
    title: "Waikato Expressway Interchange Corridor",
    category: "Civil Infrastructure & Roading",
    badge: "Ground-Level Video Sim",
    badgeColor: "purple",
    desc: "Ground-level and aerial corridor 3DGS capture for a 6km highway bypass. Recreated driver's perspective sightline clearance, road barrier glare, and vegetative mitigation screening for council resource consent hearings.",
    metrics: {
      area: "6.0 km Corridor",
      splats: "3.40M",
      accuracy: "< 15mm",
      focalMatch: "50mm Prime"
    },
    tools: ["3DGS Nerfstudio", "3ds Max", "Premiere Pro", "After Effects", "Nuke"],
    thumbnail: "https://images.unsplash.com/photo-1545459720-aac8509eb02c?auto=format&fit=crop&w=1200&q=80",
    simulationParams: {
      speedLimit: "100 km/h",
      cuttingsDepth: "14m",
      viewpointAltitude: "Ground (1.2m)"
    }
  },
  {
    id: "quarry-reclamation",
    title: "Alpine Quarry Rehabilitation & Earthworks",
    category: "Mining & Resources",
    badge: "Volumetric & Terrain",
    badgeColor: "cyan",
    desc: "Temporal multi-epoch 3DGS capture tracking quarry bench excavation and phased revegetation modeling. Enabled accurate visual impact simulation of proposed 10-year native planting stages for regulatory approvals.",
    metrics: {
      area: "8.1 km²",
      splats: "2.10M",
      accuracy: "< 10mm",
      focalMatch: "28mm / 70mm"
    },
    tools: ["COLMAP", "Gaussian Splatting", "Blender", "Redshift", "Photoshop"],
    thumbnail: "https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=1200&q=80",
    simulationParams: {
      benchCount: 8,
      revegetationStages: 4,
      viewpointAltitude: "560m AMSL"
    }
  }
];

export const SHOWREEL_CHAPTERS = [
  {
    title: "01. Drone Photogrammetry & LiDAR Alignment",
    timecode: "00:00",
    duration: 30,
    desc: "Raw high-res multi-angle aerial drone capture & RTK ground control point survey alignment."
  },
  {
    title: "02. 3D Gaussian Splatting Training & Pruning",
    timecode: "00:30",
    duration: 40,
    desc: "Generating millions of 3D Gaussians with spherical harmonics for photorealistic foliage and atmospheric reflection."
  },
  {
    title: "03. 3ds Max / Redshift CAD Asset Integration",
    timecode: "01:10",
    duration: 40,
    desc: "Importing engineering CAD models (turbines, substations, bridges) into the calibrated 3DGS spatial coordinate system."
  },
  {
    title: "04. Camera Matching & Lens Distortion Calibration",
    timecode: "01:50",
    duration: 30,
    desc: "Matching exact DSLR/telephoto camera focal lengths (24mm, 35mm, 50mm), sensor crop factors, and chromatic distortion."
  },
  {
    title: "05. Final Photo-Simulation & Stakeholder Delivery",
    timecode: "02:20",
    duration: 40,
    desc: "Compositing in Adobe Premiere & After Effects for RMA (Resource Management Act) hearings and public consultation."
  }
];

export const TRUESCAPE_SKILLS_MATRIX = [
  { name: "3D Gaussian Splatting & NeRF (Real-time Reality Capture)", level: 98, category: "Emerging AI & 3D Tech" },
  { name: "Autodesk 3ds Max & Maya (Modeling & Scene Assembly)", level: 95, category: "Core 3D Production" },
  { name: "Redshift / V-Ray Rendering (Lighting & Shaders)", level: 92, category: "Core 3D Production" },
  { name: "Camera Calibration & Photo-Simulation Matching", level: 96, category: "Truescape Speciality" },
  { name: "Adobe Photoshop, Premiere Pro & After Effects (Compositing)", level: 94, category: "Post-Production" },
  { name: "Forest Pack & Complex Vegetation Scattering", level: 90, category: "Environment VFX" },
  { name: "Three.js / WebGL / WebGPU 3DGS Viewer Development", level: 92, category: "Web & Real-Time" },
  { name: "Resource Management & Environmental Data Interpretation", level: 90, category: "Domain Knowledge" }
];
