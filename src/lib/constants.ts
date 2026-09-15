export const SITE_METADATA = {
  title: "Spatial Visualization & OpenUSD Pipeline | Truescape Production Lead Proposal",
  description: "A technical proposal and production leadership case study for Elliot Payne, Project Managers, and the Truescape Hiring Committee by Kangsik (Kang) Ko | Candidate for Production Lead, Christchurch, NZ.",
  author: "Kangsik (Kang) Ko",
  role: "Production Lead Candidate | Senior VFX Supervisor & Pipeline Lead",
  location: "Christchurch, New Zealand",
  email: "kang0626@gmail.com",
  linkedin: "https://www.linkedin.com/in/kangsik-ko/",
};

export const HERO_CONTENT = {
  eyebrow: "R&D CASE STUDY // TRUESCAPE PRODUCTION LEAD PROPOSAL",
  targetBadge: "FOR ELLIOT PAYNE, PROJECT MANAGERS & HIRING COMMITTEE",
  headline: "Next-Gen Spatial Visualization: OpenUSD & 3D Gaussian Splatting Pipeline",
  subheadline: "Accelerating infrastructure feasibility and consent delivery by bridging survey-grade photorealism, procedural USD graphs, and frictionless real-time web review.",
  leadQuote: "Bridging 16+ years of VFX supervision with procedural OpenUSD/3DGS workflows — driving Truescape’s Christchurch team to deliver on-time, on-budget, and defensibly accurate visualization for resource consents.",
};

export const TECH_VALUES = [
  {
    index: "01",
    tag: "INTERACTIVE 6-DOF FREEDOM",
    title: "Real-Time Spatial Verification vs. Locked Video",
    lead: "Interactive 6-DoF exploration replacing pre-rendered video plates.",
    desc: "Clients and municipal consent panels freely inspect surveyed infrastructure in real time from any vantage point, eliminating locked camera angles and hidden blind spots.",
    metricValue: "6-DoF Live",
    metricLabel: "Unrestricted View Freedom",
  },
  {
    index: "02",
    tag: "PRODUCTION REALLOCATION",
    title: "Streamlining Spatial Camera Alignment",
    lead: "Reinvesting tedious manual alignment hours into engineering fidelity.",
    desc: "Survey-referenced volumetric environments eliminate error-prone perspective matching and drone camera drift, freeing senior artists to focus entirely on visual accuracy and regulatory precision.",
    metricValue: "Zero Matchmove",
    metricLabel: "Tracking Overhead Eliminated",
  },
  {
    index: "03",
    tag: "FACT-BASED ACCURACY",
    title: "Sub-Centimeter Radiance Fields",
    lead: "Capturing high-frequency micro-structures that meshes lose.",
    desc: "Reconstructs overhead powerlines, dense foliage, and terrain into defensible, survey-accurate radiance fields ready for council consent scrutiny at a smooth 60 FPS in-browser.",
    metricValue: "60 FPS WebGL",
    metricLabel: "Survey-Grade Radiance Fields",
  },
  {
    index: "04",
    tag: "CONSENT & SCHEDULE CERTAINTY",
    title: "Instant Multi-Angle Consent Validation",
    lead: "Zero render farm bottlenecks when sightlines shift.",
    desc: "When planning commissioners request alternative viewpoints, interactive 3DGS delivers live visual verification during meetings — compressing multi-week review loops into minutes.",
    metricValue: "-80% Latency",
    metricLabel: "Stakeholder Feedback Cycle",
  },
];

export const WORKFLOW_COMPARISON = {
  badge: "WORKFLOW COMPARATIVE MATRIX",
  title: "Legacy Video Matchmoving vs. Next-Gen 3DGS & OpenUSD Delivery",
  subtitle: "A direct production comparison between traditional locked-angle video simulation and interactive spatial radiance field delivery.",
  metrics: [
    {
      dimension: "Spatial Exploration & Sightlines",
      legacy: "Restricted to pre-baked camera paths; hidden blind spots and locked angles.",
      nextGen: "Full 6-DoF real-time navigation across any corridor, viewpoint, or elevation in-browser.",
      highlight: "Complete Spatial Transparency",
    },
    {
      dimension: "Camera Tracking / Matchmoving",
      legacy: "Days lost per sequence micro-solving 3D camera tracks, distortion grids, and track slip.",
      nextGen: "Zero matchmoving required. Volumetric capture directly aligned to survey GIS/LiDAR coordinates.",
      highlight: "Zero Tracking Overhead",
    },
    {
      dimension: "Artist & TD Focus",
      legacy: "Disproportionate hours consumed by plate cleanup, track stabilization, and matte painting.",
      nextGen: "100% of production energy dedicated to asset quality, photorealism, and engineering accuracy.",
      highlight: "Maximized Quality Focus",
    },
    {
      dimension: "Revision Turnaround & Agility",
      legacy: "Angle change requests require re-filming or complete 3D scene re-renders via offline render farms.",
      nextGen: "Instant camera repositioning during live hearings with zero re-rendering turnaround delay.",
      highlight: "Instant Approval Turnaround",
    },
  ],
};

export const CASE_STUDY_01 = {
  badge: "CASE STUDY 01",
  title: "Reality Capture to Clean Web Delivery",
  subtitle: "Procedural Houdini SOP hygiene transforming raw, noisy drone sweeps into lightweight, survey-accurate 3DGS web deliverables.",
  pipelineSteps: [
    { step: "01", label: "Reality Capture", sub: "Survey-grade drone & LiDAR sweeps", icon: "Camera" },
    { step: "02", label: "3DGS Training", sub: "RealityScan solve & Postshot training", icon: "Cpu" },
    { step: "03", label: "Procedural Hygiene", sub: "Houdini k-NN pruning & scale lock", icon: "Layers" },
    { step: "04", label: "Chunked Compression", sub: "Optimized .sog octree serialization", icon: "FileCode" },
    { step: "05", label: "Web Delivery", sub: "Instant 60 FPS interactive browser review", icon: "Globe" },
  ],
  trainingShowcase: {
    badge: "REFERENCE BENCHMARK · FOR ILLUSTRATIVE PURPOSES",
    title: "3DGS Training & Radiance Field Synthesis",
    lead: "Open reference benchmark illustrating progressive radiance field convergence. (All subsequent RealityScan solves, Houdini cleanups, and Case 2 hybrid pipelines were directly authored by the applicant.)",
    datasets: [
      {
        id: "data-01",
        label: "3DGS Training Dataset 01: Architectural Heritage & Estate (Reference Example)",
        badge: "Reference 01",
        imagePath: "/assets/case1/3dgs_data01.mp4",
        alt: "3DGS Training Dataset 01: Architectural Heritage Estate Radiance Field (Reference Example)",
        description: "Progressive convergence from sparse point initialization to sub-centimeter heritage estate radiance.",
        recommendedSize: "Full Sequence (100% Frames · 30 FPS)",
      },
      {
        id: "data-02",
        label: "3DGS Training Dataset 02: Industrial Infrastructure & Terrain (Reference Example)",
        badge: "Reference 02",
        imagePath: "/assets/case1/3dgs_data02.mp4",
        alt: "3DGS Training Dataset 02: Industrial Infrastructure & Ground Terrain Radiance Field (Reference Example)",
        description: "Real-time depth alignment and radiance field convergence across complex industrial ground terrain.",
        recommendedSize: "Full Sequence (100% Frames · 30 FPS)",
      },
    ],
  },
  houdiniCleanup: {
    badge: "STEP 03 · PROCEDURAL HYGIENE & POINT OPTIMIZATION",
    title: "Houdini SOP Hygiene & Heavy PLY Optimization",
    lead: "Automated SOP networks prune airborne floaters, crop sweep noise, and serialize survey-calibrated PLYs for composite integration.",
    whyHoudini: {
      headline: "The Industry Standard for Massive Point Cloud Scale",
      subline: "Houdini effortlessly ingests and filters multi-gigabyte point clouds containing 50M+ to 100M+ splats with real-time viewport responsiveness and zero precision loss.",
    },
    video: {
      imagePath: "/assets/case1/houdini_filtering.mp4",
      fallbackGif: "/assets/case1/houdini_filtering.gif",
      alt: "Houdini SOP Procedural Hygiene & Heavy PLY Point Cloud Optimization",
      label: "Houdini SOP: Heavy PLY Point Cloud Optimization",
      description: "Live screen recording of procedural box clipping, k-NN cluster isolation, and blast nodes purging millions of noise points.",
      recommendedSize: "Full HD Video (1080p · 30 FPS)",
    },
    steps: [
      {
        num: "01",
        step: "01",
        title: "Heavy PLY Ingestion & Attribute Binding",
        name: "Heavy PLY Ingestion & Attribute Binding",
        desc: "Directly streams multi-gigabyte raw PLY point fields into SOPs while preserving position, normals, and spherical harmonics.",
      },
      {
        num: "02",
        step: "02",
        title: "Bounding Box & Perimeter Clipping",
        name: "Bounding Box & Perimeter Clipping",
        desc: "Procedural box clip volumes isolate project boundaries, discarding extraneous peripheral terrain and sky noise.",
      },
      {
        num: "03",
        step: "03",
        title: "Statistical Floater Culling (VEX)",
        name: "Statistical Floater Culling (VEX)",
        desc: "Executes Point VEX k-NN density checks (search_isolated) to systematically purge airborne floaters and loose clusters.",
      },
      {
        num: "04",
        step: "04",
        title: "Clean PLY Export for Multi-Asset Integration",
        name: "Clean PLY Export for Multi-Asset Integration",
        desc: "Serializes sanitized point geometry into clean, survey-calibrated PLYs ready for direct composite merging.",
      },
    ],
    telemetry: {
      pointsBefore: "1.2M+ Points (Multi-GB)",
      pointsAfter: "340K Clean Points",
      reduction: "-72% Storage & Memory",
      fps: "60 FPS",
      size: "24MB",
      integrationStatus: "Multi-Asset Composite Ready",
    },
  },
};

export const CASE_STUDY_02 = {
  badge: "CASE STUDY 02",
  title: "Bridging Proposed Engineering Assets with Real-World Radiance",
  subtitle: "Automated Solaris/LOPs to 3DGS pipeline for rapid CAD/BIM synthetic ground truth generation and hybrid composite verification.",
  caption: "Seamless radiance field integration between synthetic CAD/USD assets and real-world surveyed drone scan environments.",
  strategicAdvantage: {
    badge: "Core Strategic Advantage",
    subtitle: "Universal 3D Integration & Rapid Client Feedback",
    headline: "Any 3D Model Integrated into Millimeter-Calibrated Real Space",
    subline: "Converting CAD/BIM models into 3DGS and compositing them into surveyed drone scans eliminates weeks of multi-pass offline rendering, enabling instant stakeholder reviews in true geospatial context.",
    callout: "Instant Stakeholder Feedback",
    calloutSub: "Zero Multi-Pass Render Bottleneck",
  },
  videoShowcase: {
    badge: "Live Pipeline Execution",
    title: "CAD/BIM to 3DGS Hybrid Radiance Synthesis",
    lead: "Automated end-to-end procedural execution: USD ingestion, deterministic 50-camera sampling, Karma XPU batching, and depth-consistent drone composite.",
    video: {
      imagePath: "/assets/case2/usd_to_3dgs.mp4",
      alt: "Houdini Machine Learning USD-to-3DGS Conversion & Real-World Drone Scan Compositing",
      label: "Houdini Solaris & SOPs: USD to 3DGS ML Pipeline",
      description: "Automated 50-camera orbital array, in-engine ML_Train_GSplats training, and dual-branch SOP merge compositing.",
      recommendedSize: "Full HD 1080p (Autoplay / Loop)",
    },
    steps: [
      {
        step: "01",
        name: "Deterministic Perspective Sampling",
        desc: "Procedurally generates a 360-degree hemispherical camera rig around the target structure in Solaris, ensuring uniform viewpoint density and zero perspective bias.",
      },
      {
        step: "02",
        name: "Stage Hygiene & USD Governance",
        desc: "Resolves texture typing, flattens layer breaks, and references client CAD/BIM assets with calibrated MaterialX shaders under physical lighting.",
      },
      {
        step: "03",
        name: "Automated Stage Synthesis (Karma XPU & PDG)",
        desc: "Offloads multi-camera EXR rendering and dataset packaging to background TOPs batches, generating training-ready ground truth without production halts.",
      },
      {
        step: "04",
        name: "Depth-Consistent Hybrid Simulation",
        desc: "Directly merges synthetic splats into surveyed real-world drone scans, achieving natural foreground occlusion and millimeter placement precision.",
      },
    ],
    telemetry: {
      assetCompatibility: "Universal USD / CAD",
      trainingRig: "50-Cam Automated Rig",
      mlConvergence: "ML_Train_GSplats (30k Steps)",
      clientImpact: "Instant Feedback Loops",
    },
  },
  sogViewer: {
    badge: "Interactive 3DGS WebGL2 Model Preview",
    title: "caseStudy10_dc_fast.sog — Procedural Cleaned Radiance Field",
    lead: "Interactive 3DGS inspection of the survey-calibrated, procedural-cleaned radiance field (caseStudy10_dc_fast.sog) at 60 FPS in-browser.",
    sogUrl: "/assets/case2/caseStudy10_dc_fast.sog",
    splatCount: "2,371,074 Splats",
  },
  verificationGallery: {
    badge: "Verification Gallery — Production Stills & Live 3DGS Review",
    title: "Houdini Solaris Stage & SOP Compositing Evidence",
    subtitle: "Interactive WebGL2 3DGS inspection of the cleaned radiance field alongside high-resolution production stage captures.",
    slots: [
      {
        imagePath: "/assets/case2/solaris_camera_dome_rig.png",
        alt: "Houdini Solaris 50-Camera Spherical Dome Rig, Scene Graph Tree, & ML_Train_GSplats Network",
        label: "Solaris LOPs: 50-Camera Dome Rig & In-Engine ML Training",
        description: "Solaris LOPs stage synchronizing MaterialX shaders and routing 50 camera transforms into ML_Train_GSplats.",
        recommendedSize: "1024x613 (Solaris Viewport & LOPs)",
      },
      {
        imagePath: "/assets/case2/sop_hybrid_composite_viewport.png",
        alt: "Houdini SOPs: High-Resolution Viewport Composite of Asset in Drone Scan with Dual-Branch merge1",
        label: "Procedural SOPs: Dual-Branch Radiance Merge & Real-World Composite",
        description: "SOP viewport exhibiting millimeter-calibrated integration of the synthetic 3DGS asset into the surveyed Ocean Beach drone scan.",
        recommendedSize: "1024x571 (SOP Viewport & Node Graph)",
      },
    ],
  },
};

export const PIPELINE_TOOLING = {
  badge: "PIPELINE & AI INNOVATION",
  title: "Co-Engineered with AI: Custom Pipeline Tooling & Visual Leadership",
  subtitle: "How 16+ years of senior VFX supervision and modern agentic AI co-engineering converge to deliver automated spatial pipelines.",
  manifesto: {
    badge: "THE PRODUCTION LEAD ADVANTAGE",
    title: "Not a Traditional Developer — A Visual VFX Supervisor with Pipeline Superpowers",
    lead: "Visual discernment paired with agentic AI orchestration delivers superior production results than traditional development alone.",
    background: "16+ years of visual effects supervision provides a decisive visual advantage: acute aesthetic discernment for photorealism, physical scale, and spatial fidelity essential for defensible council consent hearings.",
    aiCollab: "Partnered with agentic AI (Google Antigravity & MCP) to co-engineer this custom Python GUI controller, headless Houdini Solaris automation scripts, and interactive web application with zero technical debt.",
    keyPillars: [
      { label: "16+ Years VFX Supervision", desc: "Trained aesthetic eye for photorealism, scale, and spatial believability." },
      { label: "AI Co-Engineered R&D", desc: "Hands-on collaboration with AI coding agents to rapid-prototype production tools." },
      { label: "Zero Technical Debt", desc: "Modular Python & Houdini scripts directly deployable to studio network storage." },
    ],
  },
  controller: {
    badge: "CUSTOM GUI PIPELINE CONTROLLER",
    title: "Points & Reality 3DGS Controller (v2.248)",
    imagePath: "/assets/controller-ui.png",
    alt: "Points & Reality 3DGS Custom Pipeline Controller GUI",
    desc: "A custom Python GUI built to unify and automate the fragmented reality capture toolchain — seamlessly bridging FFmpeg extraction, RealityCapture alignment, Postshot 3DGS training, and Houdini SOP procedural hygiene handoffs into an intuitive studio workflow.",
    features: [
      "Automated batch video ingest with lossless PNG extraction & configurable FPS presets (1–6 FPS)",
      "One-click dataset formatting for RealityCapture photogrammetry & Postshot 3DGS training",
      "Direct pipeline handoff into Houdini SOP procedural cleaning & 1:1 scale-lock networks",
    ],
  },
  mcp: {
    badge: "AGENTIC AUTOMATION & HEADLESS PYTHON",
    title: "SideFX Houdini + Google Antigravity MCP Service",
    desc: "A custom Model Context Protocol (MCP) server that empowers production leads to dispatch complex Houdini setups, camera arrays, and TOPs render batches through natural language commands.",
    reusability: "Engineered entirely with modular Python (hou API) scripts that integrate directly into Truescape's existing network file shares and studio environment without proprietary dependencies.",
    highlights: [
      "Natural language prompts → Automated LOPs stage construction",
      "Asynchronous TOPs scheduler dispatch (Dirty & Cook)",
      "Structured JSON telemetry catching exceptions instantaneously",
    ],
    codeSnippet: `# ==============================================================================
# Truescape 3DGS Pipeline Controller - MCP Houdini Service Automation
# Author: Kangsik (Kang) Ko | Senior VFX Supervisor & Production Lead Candidate
# Co-Engineered with Google Antigravity & AI Agentic Coding
# ==============================================================================
import hou
import os
import json

def setup_synthetic_3dgs_rig(asset_usd_path: str, dome_cam_count: int = 50, dome_radius: float = 25.0) -> dict:
    """
    Headless automation routine triggered via Antigravity MCP CLI.
    Builds Solaris LOPs stage, imports infrastructure USD, and generates camera dome.
    """
    stage_lop = hou.node("/stage").createNode("stage", "truescape_3dgs_synth_rig")
    
    # 1. USD Asset Reference
    sublayer = stage_lop.createNode("sublayer", "import_client_usd")
    sublayer.parm("filepath1").set(asset_usd_path)
    
    # 2. Procedural Camera Dome Rig (50 Cameras Orbit)
    cam_array_lop = stage_lop.createNode("cameradome", "dome_50_cams")
    cam_array_lop.setInput(0, sublayer)
    cam_array_lop.parm("num_cams").set(dome_cam_count)
    cam_array_lop.parm("radius").set(dome_radius)
    cam_array_lop.parm("target_pos").set((0, 1.5, 0)) # Metric datum reference
    
    # 3. TOPs Render Task Graph Dispatch
    topnet = hou.node("/tasks").createNode("topnet", "dispatch_3dgs_gen")
    render_task = topnet.createNode("ropfetch", "batch_karma_xpu")
    render_task.parm("roppath").set("/stage/karma_xpu_render")
    
    # Cook TOPs Work Items Asynchronously
    topnet.parm("dirtyandcook").pressButton()
    
    return {
        "status": "SUCCESS",
        "stage": stage_lop.path(),
        "cameras_configured": dome_cam_count,
        "batch_job_id": str(topnet.sessionId())
    }
`,
  },
};

export const ABOUT_PROFILE = {
  badge: "CANDIDATE & ROLE ALIGNMENT",
  title: "Production Lead Candidate: Kangsik (Kang) Ko",
  name: "Kangsik (Kang) Ko",
  role: "Senior 3D / VFX Production Lead",
  location: "Christchurch, New Zealand",
  workStatus: "Permanent Resident Visa Holder · Immediate Office Start",
  leadSubtitle: "Bringing 16+ years of 3D visual leadership, 5 years of university CG lecturing, and hands-on OpenUSD/3DGS capability to lead Truescape's Christchurch production delivery.",
  pillars: [
    {
      title: "Production Scheduling & Delivery",
      tag: "Stand-ups & Scoping",
      desc: "Leading daily stand-ups, allocating tasks, managing competing project priorities, and tracking progress against estimates and budgets.",
    },
    {
      title: "Defensible QA Governance",
      tag: "Council Accuracy",
      desc: "Upholding survey-grade spatial precision, visual consistency, and methodical QA documentation required for infrastructure consents.",
    },
    {
      title: "Artist Mentorship & Studio Culture",
      tag: "5 Yrs CG Lecturer",
      desc: "Drawing on 5 years of university lecturing to mentor 3D artists, identify skill gaps, provide constructive feedback, and foster team growth.",
    },
    {
      title: "Hands-On Agility & Pragmatic Tech",
      tag: "Player-Coach",
      desc: "Assisting directly in Houdini/3D during delivery crunches, while introducing pragmatic 3DGS & USD workflows that speed up turnaround.",
    },
  ],
};

export const TECHNICAL_SPECS = {
  badge: "TECHNICAL SPECIFICATION & ENGINEERING WHITEPAPER",
  title: "Truescape Next-Gen Spatial Pipeline: Technical Architecture Specification",
  version: "v2.248 (Production Ready)",
  lastUpdated: "September 2026",
  author: "Kangsik (Kang) Ko · Senior VFX Supervisor & Candidate for Production Lead",
  lead: "Exhaustive technical documentation of procedural algorithms, node graph architectures, compression mechanics, and legal defensibility protocols for Truescape's infrastructure delivery.",
  sections: [
    {
      id: "capture-standards",
      number: "01",
      shortTitle: "Reality Capture Standards",
      title: "Photogrammetry Ingestion & Reality Capture Standards",
      summary: "Protocols for ingesting survey drone sweeps and terrestrial LiDAR into calibrated photogrammetric solves.",
      details: [
        {
          label: "Camera Calibration & Sensor Models",
          text: "Raw aerial drone sweeps are ingested using calibrated focal lengths, Brown-Conrady radial distortion models, and RTK GPS EXIF telemetry with centimeter-accuracy ground control points (GCPs).",
        },
        {
          label: "Tie-Point Densification & Outlier Rejection",
          text: "RealityScan photogrammetry extracts scale-invariant feature transforms (SIFT), solving spatial camera trajectories and producing initial sparse point clouds with mean reprojection errors under 0.65 pixels.",
        },
        {
          label: "Volumetric Splat Initialization",
          text: "Postshot initializes 3D Gaussians directly from dense tie points, optimizing covariance matrices, 3-degree spherical harmonics (SH), and opacity values over 30,000 convergence iterations.",
        },
      ],
    },
    {
      id: "houdini-hygiene",
      number: "02",
      shortTitle: "Houdini SOP Hygiene",
      title: "Houdini SOP Procedural Hygiene & Point Cloud Optimization",
      summary: "Node-level architecture for processing 100M+ point photogrammetry sweeps without viewport degradation.",
      details: [
        {
          label: "Memory & Data Streaming Architecture",
          text: "Utilizes custom File SOP loaders streaming binary little-endian PLYs directly into geometry RAM, mapping custom attributes (`f_dc_0`, `scale_0..2`, `rot_0..3`) directly into VEX float arrays.",
        },
        {
          label: "Spatial k-NN Density Filtering (VEX Algorithm)",
          text: "Executes `pcopen` / `pcfind` routines in an Attribute Wrangle to count neighboring points within a metric search radius (`radius = 0.35m`). Points with fewer than 4 neighbors are marked as airborne noise and culled via Blast SOP.",
        },
        {
          label: "Volume Bounding Box Cropping",
          text: "Procedural Box Clip volumes tightly constrain point evaluation to infrastructure right-of-ways, reducing memory footprints by 70–80% before exporting sanitized PLY datasets.",
        },
      ],
    },
    {
      id: "solaris-ml",
      number: "03",
      shortTitle: "CAD/BIM to Radiance",
      title: "Bridging Proposed Engineering Assets with Real-World Radiance",
      summary: "Automated Solaris/LOPs to 3DGS pipeline for rapid CAD/BIM synthetic ground truth generation and hybrid composite verification.",
      details: [
        {
          label: "Stage 1: Deterministic Perspective Sampling (Camera Rigging)",
          text: "Instead of relying on manual camera setups, we procedurally generate 360-degree hemispherical camera rigs around the target structure in Solaris. This guarantees uniform viewpoint density and zero perspective bias, providing the exact parallax necessary for high-fidelity spatial reconstruction.",
        },
        {
          label: "Stage 2: Automated Stage Synthesis via Karma XPU & PDG (Governance)",
          text: "Using Houdini PDG/TOPs, multi-camera EXR rendering and dataset packaging are fully offloaded to background batch execution. Strict USD stage hygiene—resolving texture typing and flattening layer breaks—ensures that complex infrastructure CAD assets translate into training-ready ground truth without production halts.",
        },
        {
          label: "Stage 3: Depth-Consistent Hybrid Simulation (The Core Deliverable)",
          text: "The trained synthetic splats are directly merged into the survey-captured real-world environment. Because both exist within a unified radiance field coordinate system, structural assets sit naturally behind foreground trees, interact with ambient lighting, and maintain sub-centimeter placement accuracy from any viewing angle.",
        },
      ],
    },
    {
      id: "sog-compression",
      number: "04",
      shortTitle: "SOG 3DGS Compression",
      title: "WebGL2 3DGS & SOG Compression Architecture",
      summary: "Serialization format compressing raw multi-gigabyte splats into lightweight, web-streamable WebP containers.",
      details: [
        {
          label: "16-Bit WebP Spatial Packing",
          text: "SOG format packs position coordinates (`means_l.webp`, `means_u.webp`) into dual 8-bit channels representing 16-bit normalized bounding box offsets, slating memory down by 82% compared to raw float PLY.",
        },
        {
          label: "Spherical Harmonics Codebook Quantization",
          text: "Color and view-dependent radiance are quantized using 256-entry codebooks, allowing full directional sheen and specular response with near-lossless visual fidelity.",
        },
        {
          label: "Client-Side PlayCanvas WebGL2 Streaming",
          text: "In-browser PlayCanvas engine streams chunked SOG octrees on demand, maintaining rock-solid 60 FPS performance across standard desktop and tablet devices without proprietary plugins.",
        },
      ],
    },
    {
      id: "mcp-automation",
      number: "05",
      shortTitle: "Pipeline & MCP Service",
      title: "Proprietary Pipeline Controller & Headless Antigravity MCP Service",
      summary: "Studio automation service allowing natural-language and Python RPC orchestration of SideFX Houdini.",
      details: [
        {
          label: "Desktop GUI Controller Architecture",
          text: "PySide6 / Python controller unifying FFmpeg batch extraction, RealityCapture CLI commands, Postshot training triggers, and Houdini SOP procedural hygiene handoffs.",
        },
        {
          label: "Model Context Protocol (MCP) Daemon",
          text: "Headless Python service exposing `hou` API routines to AI coding agents via standard JSON-RPC over stdin/stdout or WebSocket pipes.",
        },
        {
          label: "TOPs Asynchronous Task Dispatch",
          text: "Procedurally generates Task Operator (TOPs) graphs to schedule multi-camera renders, training convergence checks, and SOG conversion asynchronously across studio compute.",
        },
      ],
    },
    {
      id: "legal-defensibility",
      number: "06",
      shortTitle: "Legal Defensibility & QA",
      title: "Council Consent Hearing Spatial Defensibility & Legal Certainty",
      summary: "Verification protocols ensuring visualizations withstand judicial scrutiny in Environment Court and council hearings.",
      details: [
        {
          label: "1:1 Metric Scale Lock & Datum Anchoring",
          text: "All 3DGS models are scale-locked to New Zealand Transverse Mercator (NZTM2000) coordinates and verified against physical survey monuments with sub-centimeter tolerances.",
        },
        {
          label: "Elimination of Single-Angle Matchmove Disputes",
          text: "Opposing counsel and technical witnesses can navigate any perspective in real time, eliminating allegations of deceptive camera positioning or selective focal length manipulation.",
        },
        {
          label: "Audit Trail & Deterministic Reproducibility",
          text: "Procedural Houdini node graphs maintain an immutable parameter history from raw drone sweep to final delivery, ensuring complete legal reproducibility.",
        },
      ],
    },
    {
      id: "comparative-matrix",
      number: "07",
      shortTitle: "Comparative Matrix (3DGS)",
      title: "Workflow Comparative Matrix: Legacy Video Matchmove vs. 3DGS",
      summary: "Side-by-side production benchmarks comparing traditional locked-angle video simulation against interactive spatial radiance field delivery.",
      details: [
        {
          label: "Spatial Exploration & Sightlines",
          text: "Legacy: Restricted to pre-baked camera paths with hidden blind spots. Truescape 3DGS: Full 6-DoF real-time navigation across any corridor, viewpoint, or elevation in-browser.",
        },
        {
          label: "Camera Tracking & Matchmoving Overhead",
          text: "Legacy: Days lost per sequence micro-solving 3D camera tracks and lens distortion grids. Truescape 3DGS: Zero matchmoving required; volumetric captures directly align to survey GIS/LiDAR coordinates.",
        },
        {
          label: "Artist & TD Focus",
          text: "Legacy: Disproportionate hours consumed by plate cleanup, track stabilization, and matte painting. Truescape 3DGS: 100% of production energy dedicated to asset quality, photorealism, and engineering accuracy.",
        },
        {
          label: "Revision Turnaround & Agility",
          text: "Legacy: Angle change requests require re-filming or complete 3D scene re-renders via offline render farms. Truescape 3DGS: Instant camera repositioning during live hearings with zero re-rendering turnaround delay.",
        },
      ],
    },
  ],
};
