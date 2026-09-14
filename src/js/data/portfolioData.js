/**
 * Portfolio Data Configuration
 * Flagship Project: 3DGS in Infrastructure Visualization: Feasibility, Pipeline Automation & R&D
 * A Case Study on Rapid Reality Capture, Procedural Optimization, and Web-Ready Delivery for Truescape
 * Author: Kangsik (Kang) Ko | Senior VFX Compositor & Pipeline R&D | Christchurch, NZ
 */

export const ARTIST_INFO = {
  name: "Kangsik (Kang) Ko",
  shortName: "Kang Ko",
  role: "Senior Compositor & VFX Artist",
  subtitle: "16+ Years Experience | Specializing in photorealistic integration, procedural pipelines, and technical problem-solving",
  location: "Christchurch, New Zealand",
  workRights: "Full NZ Work Rights, Local Resident (Immediate Availability)",
  email: "kang0626@gmail.com",
  phone: "+64 21 000 0000",
  showreelUrl: "https://vimeo.com/manage/videos",
  linkedinUrl: "https://www.linkedin.com/in/kangsik-ko/"
};

export const CASE_STUDY = {
  title: "3DGS in Infrastructure Visualization: Feasibility, Pipeline Automation & R&D",
  subtitle: "A Case Study on Rapid Reality Capture, Procedural Optimization, and Web-Ready Delivery for Truescape",
  authorByline: "By Kangsik (Kang) Ko | Senior VFX Compositor & Pipeline R&D | Christchurch, NZ",
  
  // Section 01: Introduction
  intro: {
    lead: "3D Gaussian Splatting (3DGS) is transforming computer graphics from rigid polygonal surfaces to dense radiance fields.",
    pillars: [
      {
        tag: "CURRENT STAGE",
        title: "Commercial Adoption Horizon",
        desc: "While still in its emerging commercial adoption phase, 3DGS already matches or exceeds traditional photogrammetry in real-time radiance representation, view-dependent reflections, and organic geometry reconstruction."
      },
      {
        tag: "INDUSTRY SHIFT",
        title: "Mainstream DCC & Engine Integration",
        desc: "Major engines and DCC platforms (SideFX Houdini, Unreal Engine 5, PlayCanvas) are rapidly integrating 3DGS primitives, establishing radiance fields as standard production geometry."
      },
      {
        tag: "THE OPPORTUNITY",
        title: "Photorealism Meets Real-Time Free Roam",
        desc: "For visual impact assessment, 3DGS bridges the historical trade-off between photorealism and real-time navigation, allowing stakeholders to experience proposed infrastructure from any eye-level perspective without the multi-week turnaround of brute-force polygon rebuilding."
      }
    ]
  },

  // Section 02: Why 3DGS for Truescape?
  whyTruescape: {
    objective: "To evaluate whether a lightweight 3DGS pipeline can accelerate Truescape's core deliverables: accurate photo-simulations, ground-level environmental assessments, and interactive client reviews.",
    comparisonTable: [
      {
        traditional: "Hand-modeling dense background terrain & vegetation",
        pipeline3dgs: "Captured directly from real-world site sweeps in hours",
        impact: "90% Reduction in Modeling Hours"
      },
      {
        traditional: "Static single-angle photo montages",
        pipeline3dgs: "Full 360° ground-level volumetric navigation",
        impact: "Comprehensive Spatial Verification"
      },
      {
        traditional: "Heavy asset re-rendering for every camera angle adjustment",
        pipeline3dgs: "Real-time viewport review with instant perspective changes",
        impact: "Zero Turnaround Render Latency"
      },
      {
        traditional: "High manual cleanup and texture baking costs",
        pipeline3dgs: "Automated dataset ingestion and procedural refinement",
        impact: "Repeatable & Scalable Pipeline"
      }
    ],
    benefits: [
      {
        index: "01",
        title: "Accelerated Site Capture",
        desc: "Transforms everyday site photography and drone sweeps into 1:1 digital twins without demanding million-dollar LiDAR units."
      },
      {
        index: "02",
        title: "True-to-Life Atmosphere",
        desc: "Faithfully preserves regional lighting conditions, vegetation density, and horizon context with sub-centimeter fidelity."
      },
      {
        index: "03",
        title: "Interactive Stakeholder Presentations",
        desc: "Delivers 60fps web-based inspections directly to regulatory panels, councils, and commercial clients without software installations."
      }
    ]
  },

  // Section 03: End-to-End Production Workflow
  workflow: {
    // 3.1 Precision Capture Protocol
    captureProtocol: {
      lead: "High-end LiDAR scanners are not mandatory to achieve sub-centimeter fidelity, but capture methodology must follow disciplined survey rules:",
      rules: [
        {
          id: "exposure",
          title: "Exposure & Focus Lock",
          desc: "Manual exposure, uniform white balance, and deep depth-of-field (f/8–f/11) to prevent floating floaters/artifacts caused by optical breathing."
        },
        {
          id: "overlap",
          title: "Overlap & Coverage",
          desc: "70–80% lateral and forward overlap with convergent loop patterns rather than purely planar passes to lock parallax geometry."
        },
        {
          id: "datum",
          title: "Ground Control Reference",
          desc: "Capturing at least one known physical metric benchmark (e.g., standard 1.8m park bench, road curb height) for post-scale calibration in Houdini."
        }
      ]
    },

    // 3.2 Custom Pipeline Controller
    controller: {
      title: "Points & Reality 3DGS Controller (v2.248)",
      lead: "Managing disparate tools (FFmpeg, RealityCapture, COLMAP converters, Trainer CLI, Houdini, SOG bundlers) introduces human error and production downtime. To solve this, I developed the Points & Reality 3DGS Controller (v2.248)—a dedicated production GUI that standardizes and automates the entire ingestion-to-training handoff.",
      image: "/assets/controller-ui.png",
      caption: "Figure 1: Custom Pipeline Controller managing automated video extraction, LUT calibration, and RealityCapture-to-Trainer bridging.",
      features: [
        {
          title: "Automated Footage Ingest",
          desc: "Extracts calibrated, lossless 8-bit PNG sequences with customizable frame rates (4–6 FPS) and integrated LUT transformations."
        },
        {
          title: "Seamless Alignment Bridge",
          desc: "Automatically synchronizes RealityCapture telemetry into COLMAP-compatible camera registrations (sparse/0) ready for trainer ingestion."
        },
        {
          title: "Live Telemetry & Batch Processing",
          desc: "Real-time log monitoring prevents failed builds and ensures uniform folder hierarchy across team projects."
        }
      ]
    },

    // 3.3 Trainer Engine Benchmark
    trainerBenchmark: {
      lead: "I benchmarked multiple training frameworks (open-source research implementations vs. commercial specialized engines such as Postshot):",
      engines: [
        {
          category: "RESEARCH / OPEN-SOURCE",
          name: "Vanilla 3DGS & Nerfstudio",
          speed: "45–90 min convergence",
          memory: "Erratic VRAM peaks (16GB+)",
          stability: "Variable export stability",
          skyHandling: "Peripheral sky noise requires manual masking",
          summary: "Highly flexible for algorithmic experimentation, but suffer from longer training times, erratic memory overhead, and varying export stability."
        },
        {
          category: "SPECIALIZED COMMERCIAL",
          name: "Postshot",
          speed: "Sub-15 minute iterations",
          memory: "Predictable & efficient VRAM usage",
          stability: "Robust densification & clean PLY/SOG exports",
          skyHandling: "Integrated automated sky clipping",
          summary: "Superior optimization speed (sub-15 minute iterations), robust densification control, and cleaner background sky clipping for rapid commercial turnaround."
        }
      ],
      recommendation: "For a production house with strict client deadlines and QA standards, deploying an enterprise-grade/commercial engine minimizes technical debt and guarantees consistent reconstruction quality."
    },

    // 3.4 Houdini Cleansing, Metric Calibration & Proxy Meshing
    houdini: {
      lead: "Raw splats inevitably contain peripheral noise, camera floaters, and lack coordinate scale.",
      steps: [
        {
          step: "01",
          title: "Outlier & Floater Pruning",
          desc: "Ingested the raw .ply into SideFX Houdini. Used bounding volume selections and normal-based attribute pruning to discard sky noise and background artifacts."
        },
        {
          step: "02",
          title: "1:1 Metric Calibration",
          desc: "Aligned the reference bench geometry against surveyed dimensions, locking the global scale matrix to real-world meters."
        },
        {
          step: "03",
          title: "Ground Proxy Extraction",
          desc: "Generated a lightweight terrain collision mesh via VDB from Particles to serve as a raytraced shadow/ambient occlusion receiver."
        }
      ]
    },

    // 3.5 3D Asset Integration & Interactive Web Delivery
    webDelivery: {
      lead: "Final compositing and frictionless browser deployment:",
      points: [
        {
          title: "Asset Placement",
          desc: "Positioned procedural infrastructure models (e.g., transit shelters, noise barriers, utility equipment) into the calibrated point field."
        },
        {
          title: "Lighting & Contact Shadow",
          desc: "Matched sun azimuth and elevation to Christchurch geospatial conditions (43.53° S, 172.63° E). Cast contact shadows onto the ground proxy to anchor the CG elements naturally into the real-world scene."
        },
        {
          title: "Client Delivery via Open-Source Web Viewers",
          desc: "Exported compressed .sog datasets embedded into open-source web viewers (SuperSplat / PlayCanvas / Aholo), enabling instant 60fps browser-based review without software installation."
        }
      ],
      viewerSpecs: {
        engine: "WebGL2 3DGS Core (Aholo Engine v1.8.1)",
        format: "SOG / SPZ / PLY",
        fps: "60 FPS Real-Time",
        defaultElevation: "1.6m Human Eye-Level View",
        cameraBookmarks: [
          { id: "orbit", label: "Orbit Overview", desc: "Wide 360° high-angle context showing full topography" },
          { id: "eyelevel", label: "1.6m Eye-Level (Default)", desc: "Ground pedestrian perspective for visual impact assessment" },
          { id: "datum", label: "1.8m Bench (1:1 Datum)", desc: "Physical surveyed metric calibration reference" },
          { id: "shadow", label: "Contact Shadow Zone", desc: "Solar azimuth & ground occlusion matrix" },
          { id: "structure", label: "CAD Infrastructure", desc: "Procedural infrastructure shelter integration" }
        ]
      }
    }
  },

  // Section 04: Evaluation: Opportunities & Current Boundaries
  evaluation: {
    advantages: [
      {
        title: "Turnaround Speed",
        desc: "Real-world environments digitized and client-ready within hours instead of days."
      },
      {
        title: "Photorealistic Foliage & Textures",
        desc: "Naturally captures intricate tree canopies and complex ground cover that traditionally require immense polygon budgets."
      },
      {
        title: "Dynamic Stakeholder Engagement",
        desc: "Moves client presentations beyond static 2D renders to real-time interactive ground-view walkthroughs."
      }
    ],
    boundaries: [
      {
        title: "Dynamic Re-lighting Limitations",
        challenge: "3DGS bakes existing ambient lighting into the radiance field.",
        mitigation: "Use neutral overcast capture sessions when drastic daylight modifications are required, or utilize Houdini proxy shadow-catchers for additive lighting."
      },
      {
        title: "File Footprint & Memory Overhead",
        challenge: "Raw PLY files are heavy (hundreds of megabytes to gigabytes).",
        mitigation: "Enforce automated pruning and SOG (Super-compressed Octree Gaussian) compression to keep web payloads under 30MB for instant client streaming."
      }
    ],
    verdict: "For infrastructure visualization, 3DGS is ready today as a high-impact complementary pipeline, drastically reducing site-modeling costs while setting Truescape apart in competitive pitches."
  }
};

export const CORE_SKILLS = [
  "RealityScan (Aerial & Ground Reality Capture)",
  "Postshot (Commercial 3DGS Training & Optimization)",
  "SideFX Houdini (Procedural Modeling, VDB Proxies, 1:1 Metric Calibration)",
  "Adobe After Effects & Photoshop (Photo-Simulation Compositing)",
  "WebGL2 3DGS Engines (SOG / SPZ / PLY, Chunk LOD Streaming)",
  "Geospatial Solar Alignment & Contact Shadow Matrix (Christchurch Datum)"
];
