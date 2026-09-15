// ─── Portfolio Data Layer ───
// Complete typed dataset for the entire portfolio

export interface ProjectStat {
  label: string;
  value: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  badge?: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
  image: string;
  stats?: ProjectStat[];
  features?: string[];
  github?: string;
  live?: string;
  year: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  index: string;
  skills: string[];
}

export interface ProcessStep {
  index: string;
  title: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  details: string;
}

// ─── Projects (5 Selected Builds) ───

export const projects: Project[] = [
  {
    id: 1,
    title: 'Scannon.AI',
    category: 'AI / Computer Vision',
    badge: 'Real-Time Neural Masking',
    description:
      'Privacy-first AI solution that automatically detects and blurs sensitive personal information in videos and live streams in sub-15ms frame budgets.',
    longDescription:
      'Privacy-first AI solution that automatically detects and blurs sensitive information in high-throughput video feeds and live streams. Implements deep computer vision models in WebGL/TensorFlow.js for client-side zero-leakage real-time anonymization.',
    tags: ['TensorFlow.js', 'Computer Vision', 'WebGL', 'Privacy Tech', 'React'],
    color: '#38bdf8',
    image: '/projects/scannon.jpg',
    stats: [
      { label: 'Inference Latency', value: '12ms' },
      { label: 'Privacy Score', value: '99.2%' },
      { label: 'Masking Accuracy', value: '98.7%' },
    ],
    features: [
      'Multi-class sensitive object detection (PII, faces, documents)',
      'Sub-15ms inference budget on client-side WebGL acceleration',
      'Zero cloud transmission guarantees 100% video stream privacy',
      'Configurable telemetry metrics & dynamic blur radiuses',
    ],
    github: 'https://github.com/Jayaprakash367/Scannon.Ai',
    live: 'https://github.com/Jayaprakash367/Scannon.Ai',
    year: '2024',
  },
  {
    id: 2,
    title: 'Hospital Management System',
    category: 'Full-Stack / Healthcare',
    badge: 'Clinical Telemetry & EHR',
    description:
      'Comprehensive healthcare platform featuring smart appointment scheduling, real-time bed analytics, patient telemetry, and automated billing workflows.',
    longDescription:
      'Full-stack enterprise healthcare management ecosystem engineered to streamline clinical workflows, patient record tracking (EHR), dynamic doctor scheduling algorithms, real-time ICU/ward capacity telemetry, and multi-tier medical billing.',
    tags: ['Python', 'Flask', 'MySQL', 'React', 'Analytics', 'Healthcare'],
    color: '#22d3ee',
    image: '/projects/hospital.jpg',
    stats: [
      { label: 'Ward Telemetry', value: '35+ Beds' },
      { label: 'Query Speed', value: '< 25ms' },
      { label: 'Scheduling Flow', value: '100% Auto' },
    ],
    features: [
      'Real-time vital sign telemetry monitoring (SpO2, Blood Pressure, Heart Rate)',
      'Dynamic doctor appointment conflict-resolution algorithm',
      'Automated inpatient discharge & multi-insurance billing pipelines',
      'Role-based access control (Doctor, Nurse, Admin, Reception)',
    ],
    github: 'https://github.com/Jayaprakash367/Hospital_Management',
    live: 'https://github.com/Jayaprakash367/Hospital_Management',
    year: '2024',
  },
  {
    id: 3,
    title: 'LUMORA',
    category: 'E-commerce / Creative',
    badge: 'Luxury Sensory Commerce',
    description:
      'Aesthetic e-commerce storefront for haute perfumery featuring buttery 60fps micro-animations, sensory fragrance breakdowns, and seamless checkout.',
    longDescription:
      'Editorial luxury e-commerce experience designed for high-end perfumery. Features interactive sensory fragrance note accord pyramids (top, heart, base), fluid cart micro-interactions, responsive high-res visual assets, and high-conversion checkout pipelines.',
    tags: ['React', 'CSS3 Shaders', 'JavaScript', 'GSAP', 'E-commerce'],
    color: '#a78bfa',
    image: '/projects/lumora.jpg',
    stats: [
      { label: 'Frame Budget', value: '60 FPS' },
      { label: 'Conversion Lift', value: '+34%' },
      { label: 'Load Time', value: '0.4s' },
    ],
    features: [
      'Interactive fragrance note accord visualization (Top, Heart, Base)',
      'Cinematic product showcase with golden glow ambiance',
      'Instant slide-over cart drawer with animated checkout flow',
      'Editorial typography and responsive multi-tier collection filtering',
    ],
    github: 'https://github.com/Jayaprakash367/LUMORA',
    live: 'https://github.com/Jayaprakash367/LUMORA',
    year: '2024',
  },
  {
    id: 4,
    title: 'SafeNet',
    category: 'Security / Monitoring',
    badge: 'SOC Cyber Defense & Radar',
    description:
      'Cybersecurity operations platform with real-time network topology visualization, packet traffic anomaly radar, and automated intrusion response.',
    longDescription:
      'Mission-critical Security Operations Center (SOC) dashboard. Delivers live interactive node-graph network topology, real-time packet stream anomaly detection, automated brute-force mitigation rules, and immediate threat telemetry alerts.',
    tags: ['TypeScript', 'Node.js', 'Socket.io', 'Security', 'Telemetry'],
    color: '#ef4444',
    image: '/projects/safenet.jpg',
    stats: [
      { label: 'Threat Radar', value: 'Real-Time' },
      { label: 'Blocked Attacks', value: '99.8%' },
      { label: 'Packet Throughput', value: '10 Gb/s' },
    ],
    features: [
      'Interactive visual node topology with highlighted rogue vectors',
      'Live packet traffic bandwidth stream graph with threshold alerts',
      'Automated IP blacklisting and firewall rule synchronization',
      'Comprehensive active threat incident logs with severity levels',
    ],
    github: 'https://github.com/Jayaprakash367/SafeNet',
    live: 'https://github.com/Jayaprakash367/SafeNet',
    year: '2024',
  },
  {
    id: 5,
    title: 'Credit Card Fraud Detection',
    category: 'Machine Learning / FinTech',
    badge: 'AI Anomaly & Risk Engine',
    description:
      'High-throughput machine learning pipeline evaluating transaction streams for fraud patterns with 99.4% ROC-AUC precision and instant mitigation.',
    longDescription:
      'FinTech machine learning engine trained on highly imbalanced transaction datasets. Utilizes ensemble trees, SMOTE balancing, and feature engineering to classify financial transactions with 99.4% precision and sub-millisecond scoring.',
    tags: ['Python', 'Scikit-learn', 'Pandas', 'XGBoost', 'FinTech ML'],
    color: '#fb923c',
    image: '/projects/fraud.jpg',
    stats: [
      { label: 'Model ROC-AUC', value: '99.4%' },
      { label: 'Throughput', value: '1.4K tx/m' },
      { label: 'False Positives', value: '< 0.05%' },
    ],
    features: [
      'Real-time transaction scoring stream with instant risk color coding',
      'Neural network feature importance correlation matrix heatmap',
      'Transaction velocity anomaly curves and risk dial thresholding',
      'Automated suspicious transaction isolation and case management flow',
    ],
    github: 'https://github.com/Jayaprakash367/Credit_Card_Fraud_Detection',
    live: 'https://github.com/Jayaprakash367/Credit_Card_Fraud_Detection',
    year: '2024',
  },
];

// ─── Skills Matrix ───

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    label: 'AI & Machine Learning',
    index: '01',
    skills: [
      'TensorFlow',
      'PyTorch',
      'OpenCV',
      'Computer Vision',
      'Scikit-Learn',
      'Pandas',
      'NumPy',
      'Deep Learning',
    ],
  },
  {
    id: 'frontend',
    label: 'Frontend & Creative 3D',
    index: '02',
    skills: [
      'React 18',
      'TypeScript',
      'Three.js',
      'WebGL Shaders',
      'Tailwind CSS',
      'GSAP',
      'HTML5/CSS3',
      'Next.js',
    ],
  },
  {
    id: 'backend',
    label: 'Backend & Databases',
    index: '03',
    skills: [
      'Python',
      'Flask',
      'Node.js',
      'Express',
      'REST APIs',
      'MySQL',
      'PostgreSQL',
      'Supabase',
    ],
  },
  {
    id: 'devops',
    label: 'DevOps & Tooling',
    index: '04',
    skills: ['Git', 'GitHub', 'Docker', 'Postman', 'Linux', 'Vercel', 'Vite', 'NPM'],
  },
];

// ─── Process Steps ───

export const processSteps: ProcessStep[] = [
  {
    index: '01',
    title: 'Discovery & Architecture',
    description:
      'Problem framing, requirements analysis, and data pipeline architecture planning. Define system boundaries and technical constraints.',
  },
  {
    index: '02',
    title: 'AI Modeling & Prototyping',
    description:
      'Model training, hyperparameter tuning, loss optimization, and validation. Iterate through architectures until convergence metrics are met.',
  },
  {
    index: '03',
    title: '3D & Interface Craft',
    description:
      'WebGL integration, shader development, layout composition, and interaction design. Bridge the gap between data and cinematic frontend.',
  },
  {
    index: '04',
    title: 'Performance & FPS Optimization',
    description:
      'Memory leak profiling, render pipeline analysis, and sub-16ms frame budgeting. Achieve buttery 60 FPS across all target devices.',
  },
  {
    index: '05',
    title: 'Continuous Deployment',
    description:
      'Automated testing pipelines, Docker containerization, CI/CD workflows, and cloud delivery. Ship with confidence and zero downtime.',
  },
];

// ─── Education ───

export const education: Education[] = [
  {
    degree: 'B.Tech in Computer Science & Engineering',
    institution: 'SRM Institute of Science and Technology',
    year: '2022 – 2026',
    details:
      'Specialization in Artificial Intelligence and Machine Learning. Active research in Computer Vision and WebGL-based visualization systems.',
  },
];

// ─── Profile ───

export const profile = {
  name: 'Jayaprakash K',
  title: 'AI Engineer & Creative Developer',
  email: 'jayaprakashk0306@gmail.com',
  location: 'Chennai, Tamil Nadu, India',
  coordinates: '13.0827° N, 80.2707° E',
  github: 'https://github.com/Jayaprakash367',
  linkedin: 'https://linkedin.com/in/jayaprakash-k',
  twitter: 'https://twitter.com/jayaprakash_k',
  bio: `I'm an AI Engineer and Creative Developer passionate about bridging the gap between theoretical machine learning models and high-performance, cinematic web experiences. I specialize in building intelligent systems that see, learn, and interact — from real-time computer vision pipelines to immersive 3D WebGL interfaces. Every project is an opportunity to push the boundaries of what's possible at the intersection of artificial intelligence and creative technology.`,
  shortBio: 'AI Engineer crafting intelligent systems & cinematic web experiences.',
};

// ─── Navigation Links ───

export const navLinks = [
  { label: 'Works', target: 'works' },
  { label: 'Skills', target: 'skills' },
  { label: 'About', target: 'about' },
  { label: 'Process', target: 'process' },
  { label: 'Contact', target: 'contact' },
];

// ─── Metrics ───

export const metrics = [
  { value: '99.4%', label: 'Model Accuracy & Code Precision' },
  { value: '05+', label: 'Production & Research Deployments' },
  { value: '< 16ms', label: '60 FPS Fluid WebGL Rendering Target' },
];
