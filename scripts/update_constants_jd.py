constants_code = '''export const SITE_METADATA = {
  title: "Spatial Visualization & OpenUSD Pipeline | Truescape Production Lead Proposal",
  description: "A technical proposal and production leadership case study for Elliot Payne, Project Managers, and the Truescape Hiring Committee by Kangsik (Kang) Ko | Candidate for Production Lead, Christchurch, NZ.",
  author: "Kangsik (Kang) Ko",
  role: "Production Lead Candidate | Senior VFX Supervisor & Pipeline Lead",
  location: "Christchurch, New Zealand",
  email: "kangsik.ko@gmail.com",
  linkedin: "https://www.linkedin.com/in/kangsik-ko/",
};

export const HERO_CONTENT = {
  eyebrow: "R&D CASE STUDY // TRUESCAPE PRODUCTION LEAD PROPOSAL",
  targetBadge: "FOR ELLIOT PAYNE, PROJECT MANAGERS & HIRING COMMITTEE",
  headline: "Next-Gen Spatial Visualization: OpenUSD & 3D Gaussian Splatting Pipeline",
  subheadline: "Accelerating infrastructure feasibility and consent delivery by bridging survey-grade photorealism, procedural USD graphs, and frictionless real-time web review.",
  leadQuote: "Ready to drive Truescape's Christchurch production delivery across energy, resources, and infrastructure visualisations — combining 16+ years of visual effects supervision with automated OpenUSD graphs and emerging AI/3DGS workflows to keep projects on schedule, within budget, and defensibly accurate for regulatory approvals.",
};

export const TECH_VALUES = [
  {
    index: "01",
    tag: "FACT-BASED ACCURACY",
    title: "Sub-Centimeter Radiance Fields",
    lead: "Capturing what polygonal meshes lose for regulatory approvals.",
    desc: "Reconstructs fine environmental micro-structures — power transmission corridors, dense canopies, and complex terrain — into defensible, survey-accurate radiance fields ready for council consent hearings and legal scrutiny at 60 FPS.",
    metricValue: "60 FPS",
    metricLabel: "Real-Time In-Browser Review",
  },
  {
    index: "02",
    tag: "BUDGET & SCHEDULE CERTAINTY",
    title: "80% Faster Stakeholder Turnaround",
    lead: "Keeping complex infrastructure deliveries on track and within budget.",
    desc: "Traditional 2D photo simulations demand costly re-shoots whenever camera positions shift. Real-time 3D volumetric web packages empower project managers, clients, and consent panels to review proposals dynamically, drastically compressing review cycles.",
    metricValue: "-80%",
    metricLabel: "Stakeholder Feedback Latency",
  },
  {
    index: "03",
    tag: "AI & PIPELINE EFFICIENCIES",
    title: "Streamlined Studio Production",
    lead: "Answering Truescape's mandate for emerging tech and AI tools.",
    desc: "Replaces tedious manual LookDev and offline render queues with automated SideFX Houdini Solaris pipelines, Python hou automation, and natural language MCP tooling — freeing studio talent to focus on high-value creative and technical execution.",
    metricValue: "-70%",
    metricLabel: "Production Lead Time Overhead",
  },
];

export const CASE_STUDY_01 = {
  badge: "CASE STUDY 01",
  title: "Reality Capture to Clean Web Delivery",
  subtitle: "How procedural Houdini SOP hygiene transforms noisy drone sweeps into survey-accurate, lightweight client deliverables.",
  pipelineSteps: [
    { step: "01", label: "Reality Capture", sub: "Survey-grade drone & LiDAR data sweeps", icon: "Camera" },
    { step: "02", label: "Alignment & Solve", sub: "RealityScan / Postshot camera reconstruction", icon: "Cpu" },
    { step: "03", label: "Procedural Hygiene", sub: "Houdini k-NN outlier pruning & 1:1 scale lock", icon: "Layers" },
    { step: "04", label: "Chunked Compression", sub: "Optimized .sog / .spz octree serialization", icon: "FileCode" },
    { step: "05", label: "Web Delivery", sub: "Instant 60fps interactive client link", icon: "Globe" },
  ],
  houdiniCleanup: {
    title: "Houdini SOP Hygiene & Outlier Filtering",
    lead: "Raw drone radiance fields inevitably contain distant atmospheric haze, floating artifacts, and uncalibrated scales. In Houdini, we apply rigorous procedural pruning before packaging:",
    steps: [
      {
        num: "01",
        step: "01",
        title: "Gaussian Splat Ingestion",
        name: "Gaussian Splat Ingestion",
        desc: "Ingests raw point field (1.2M+ splats) into Houdini, binding color, opacity, and spherical harmonic attributes.",
      },
      {
        num: "02",
        step: "02",
        title: "Bounding Box Perimeter Crop",
        name: "Bounding Box Perimeter Crop",
        desc: "Procedurally isolates project bounds, cropping out unnecessary peripheral geography to conserve bandwidth.",
      },
      {
        num: "03",
        step: "03",
        title: "Statistical Outlier Removal (VEX)",
        name: "Statistical Outlier Removal (VEX)",
        desc: "Executes k-nearest neighbors (k-NN) spatial density checks to eliminate low-opacity airborne floaters.",
      },
      {
        num: "04",
        step: "04",
        title: "80% Payload Compression",
        name: "80% Payload Compression",
        desc: "Converts cleansed geometry into chunked LOD format (115MB down to 24MB) for instant mobile/desktop review.",
      },
    ],
    telemetry: {
      pointsBefore: "1.2M Splats",
      pointsAfter: "340K Splats",
      reduction: "1.2M → 340K (-72%)",
      fps: "60 FPS",
      size: "24MB",
    },
    vexCode: `// Statistical Outlier Removal (k-NN) & Opacity Filter
int n_handle = pcopen(0, "P", @P, chf("search_radius"), chi("max_neighbors"));
float avg_dist = 0.0;
int count = 0;

while (pcunshaded(n_handle)) {
    vector np;
    pcimport(n_handle, "P", np);
    avg_dist += distance(@P, np);
    count++;
}
avg_dist = count > 0 ? (avg_dist / count) : 999.0;

// Cull outliers exceeding distance threshold or near-zero opacity
if (avg_dist > chf("max_mean_dist") || @opacity < 0.05) {
    removepoint(0, @ptnum);
}`,
  },
};

export const CASE_STUDY_02 = {
  badge: "CASE STUDY 02",
  title: "Synthetic USD to 3DGS Hybrid Integration",
  subtitle: "Integrating client CAD/BIM infrastructure models into real-world drone scan environments with unified depth sorting and solar alignment.",
  caption: "Early-stage case study demonstrating seamless radiance integration between synthetic CAD assets and real-world drone scan environments.",
  solarisCard: {
    title: "Houdini Solaris / LOPs Automated Camera Rig",
    lead: "Civil infrastructure assets arrive as engineering CAD/BIM files. We bridge them into radiance primitives for artifact-free hybrid compositing:",
    nodeFlow: [
      { step: "01", node: "USD Ingest", role: "Loads client civil engineering stage", desc: "Loads client civil engineering stage" },
      { step: "02", node: "Camera Dome", role: "Distributes 50 cameras around asset bounding box", desc: "Distributes 50 cameras around asset bounding box" },
      { step: "03", node: "Karma XPU", role: "Executes batched multi-angle photorealistic renders", desc: "Executes batched multi-angle photorealistic renders" },
      { step: "04", node: "3DGS Train", role: "Generates deep-sorted radiance field asset", desc: "Generates deep-sorted radiance field asset" },
    ],
    troubleshooting: [
      {
        title: "USD PBR Texture Normalization",
        desc: "Converts varied client shaders into standardized UsdPreviewSurface and MaterialX pipelines to guarantee consistent color reproduction.",
      },
      {
        title: "Layer Break Bypass Optimization",
        desc: "Optimizes LOPs stage caching to prevent destructive scene graph re-evaluations during 50-camera batch rendering passes.",
      },
      {
        title: "Multi-Camera Rig Aggregation",
        desc: "Aggregates 50 camera transforms into a unified USD library, ensuring exact extrinsic/intrinsic synchronization for trainer ingestion.",
      },
    ],
  },
};

export const PIPELINE_TOOLING = {
  badge: "PIPELINE & AI INNOVATION",
  title: "Proprietary Pipeline Tooling: AI & MCP Orchestration",
  subtitle: "Answering Truescape's focus on emerging tech and AI tools — deploying natural language agent RPC and headless Python automation for studio network storage.",
  mcp: {
    title: "Houdini + Google Antigravity MCP Architecture",
    desc: "A custom Model Context Protocol (MCP) server that empowers production leads to dispatch complex Houdini setups, camera arrays, and TOPs render batches through natural language commands.",
    reusability: "Engineered entirely with modular Python (hou API) scripts that integrate directly into Truescape's existing network file shares and studio environment without proprietary dependencies.",
    highlights: [
      "Natural language prompts trigger automated LOPs stage creation and 50-camera dome generation.",
      "Asynchronous TOPs task scheduling maximizes compute efficiency across studio workstations.",
      "Structured JSON session logs deliver instant error diagnostics and job verification.",
    ],
    codeSnippet: `# ==============================================================================
# Truescape 3DGS Pipeline Controller - MCP Houdini Service Automation
# Author: Kangsik (Kang) Ko | Senior VFX Supervisor & Production Lead Candidate
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
  badge: "LEADERSHIP & PROFILE",
  title: "Candidate Profile & Production Alignment",
  name: "Kangsik (Kang) Ko",
  role: "Senior VFX Supervisor (16+ Yrs) · Candidate for Production Lead",
  location: "Christchurch, New Zealand",
  workStatus: "Full NZ Work Rights, Local Resident (No Visa Sponsorship Needed · Immediate Office Start)",
  experienceHighlights: [
    { number: "16+", unit: "Years", label: "3D & VFX Production Leadership" },
    { number: "320+", unit: "Projects", label: "Commercial Productions Delivered" },
    { number: "5", unit: "Years", label: "University CG Lecturer (Mentorship)" },
  ],
  careerSummary: [
    "16+ years leading complex 3D visualisation, digital animation, photorealistic compositing, and studio pipeline development.",
    "Senior Compositor on the multi-award-winning animation series 'Kiri and Lou' (Christchurch, NZ), collaborating under rigorous broadcast deadlines.",
    "Supervised post-production delivery on 320+ high-end commercial projects, maintaining strict adherence to scopes, hours, and budgets.",
    "5 years university lecturing in Advanced Computer Graphics, bringing proven capability to mentor artists and cultivate procedural curiosity.",
    "Christchurch local resident with full New Zealand work rights, available for immediate, on-site leadership at the Riccarton headquarters.",
  ],
  positioningStatement: "For over 30 years, Truescape has set the international benchmark in fact-based spatial storytelling for energy, resources, and infrastructure sectors. As Production Lead, I am dedicated to partnering closely with Elliot Payne and Project Managers — coordinating day-to-day priorities, upholding stringent technical and QA standards, mentoring the 3D team, and leveraging emerging AI/3DGS workflows to ensure every project is delivered on schedule, within budget, and to the highest standard of visual excellence.",
  
  // Dedicated Production Lead Competency Matrix directly matching Truescape's Job Posting
  productionLeadMatrix: [
    {
      title: "Day-to-Day Production Ownership",
      pillar: "Delivery & Priorities",
      desc: "Leading daily stand-ups, allocating tasks, managing competing priorities, and tracking progress against estimates and budgets in close alignment with the Production Manager and Project Managers.",
      skills: [
        "Daily Stand-ups & Task Scheduling",
        "Work Breakdown Structures (WBS)",
        "Hours, Estimates & Budget Tracking",
        "Proactive Risk & Bottleneck Mitigation",
      ],
    },
    {
      title: "Technical Accuracy & QA Governance",
      pillar: "Fact-Based Quality",
      desc: "Upholding high standards of technical accuracy, aesthetic consistency, and completed QA documentation required for energy and infrastructure regulatory approvals and council consent hearings.",
      skills: [
        "Defensible Spatial & Scale Accuracy",
        "QA Documentation & Peer Reviews",
        "PBR Material & Lighting Consistency",
        "Regulatory & Hearing Compliance",
      ],
    },
    {
      title: "Team Mentorship & Capability Building",
      pillar: "People & Culture",
      desc: "Leveraging 5 years of university CG lecturing experience to mentor production artists, identify training opportunities, and foster an open, curious environment without hierarchical friction.",
      skills: [
        "5 Yrs University CG Lecturing",
        "Skill Gap Identification & Upskilling",
        "Procedural Problem-Solving Coaching",
        "Motivating Teams Without Friction",
      ],
    },
    {
      title: "Emerging Tech & AI Tools Innovation",
      pillar: "R&D Workflows",
      desc: "Answering Truescape's specific call for emerging technologies and AI tools. Designing practical automation routines that improve workflows and deliver measurable value to clients.",
      skills: [
        "Antigravity MCP Agent AI Server",
        "3D Gaussian Splatting Ingestion",
        "Headless Python hou API Automation",
        "OpenUSD & Solaris Stage Rigs",
      ],
    },
    {
      title: "Hands-On 3D & Photoshop Agility",
      pillar: "Player-Coach Capability",
      desc: "16+ years of hands-on mastery across Houdini, Maya, Nuke, and Adobe Photoshop. Confidently jumping onto the box to assist with hands-on production when milestone deadlines require.",
      skills: [
        "SideFX Houdini (SOPs, LOPs, TOPs)",
        "Adobe Photoshop & Concept Mattes",
        "Photogrammetry & Drone Scan Solves",
        "Karma XPU & Real-Time WebGL",
      ],
    },
    {
      title: "Christchurch Local & Commercial Focus",
      pillar: "Immediate Studio Impact",
      desc: "Local Christchurch resident with full New Zealand work rights, ready to join the Riccarton production office immediately. Balancing creative ambition with commercial realities.",
      skills: [
        "Full NZ Work Rights (No Visa Delay)",
        "Riccarton Office Immediate Start",
        "320+ Delivered Commercial Projects",
        "Client Meeting Context & Alignment",
      ],
    },
  ],
};
'''

with open("src/lib/constants.ts", "w", encoding="utf-8") as f:
    f.write(constants_code.strip() + "\n")

print("src/lib/constants.ts successfully updated with job description alignment matrix")
