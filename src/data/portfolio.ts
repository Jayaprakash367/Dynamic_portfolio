// ─── Portfolio Data Layer ───
// Complete typed dataset for the entire portfolio

export interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  color: string;
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

// ─── Projects ───

export const projects: Project[] = [
  {
    id: 1,
    title: 'Scannon.AI',
    category: 'AI / Computer Vision',
    description: 'Real-time privacy tech that auto-detects & blurs sensitive video credentials.',
    longDescription:
      'An advanced AI-powered privacy protection system that leverages TensorFlow.js and OpenCV to automatically identify and blur sensitive credentials, IDs, and personal information visible in real-time video streams. Built for enterprise-grade privacy compliance and GDPR adherence.',
    tags: ['TensorFlow.js', 'OpenCV', 'Privacy Tech', 'Real-time', 'Computer Vision'],
    color: '#38bdf8',
    github: 'https://github.com/Jayaprakash367',
    year: '2024',
  },
  {
    id: 2,
    title: 'Hospital Management System',
    category: 'Full-Stack / Healthcare',
    description: 'Healthcare appointment, patient records, and doctor analytics platform.',
    longDescription:
      'A comprehensive hospital management platform enabling appointment scheduling, patient record management, doctor analytics dashboards, and administrative controls. Built with a Python/Flask backend and MySQL database for HIPAA-aware data handling.',
    tags: ['Python', 'Flask', 'MySQL', 'Healthcare', 'Full-Stack'],
    color: '#22d3ee',
    github: 'https://github.com/Jayaprakash367',
    year: '2024',
  },
  {
    id: 3,
    title: 'LUMORA',
    category: 'E-commerce / Creative',
    description: 'Luxury perfume e-commerce experience with fluid interactions.',
    longDescription:
      'A premium luxury perfume e-commerce storefront featuring cinematic product showcases, fluid scroll interactions, and an immersive shopping experience. Crafted with semantic HTML5, advanced CSS3 animations, and vanilla JavaScript for maximum performance.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'E-commerce', 'UI/UX'],
    color: '#a78bfa',
    github: 'https://github.com/Jayaprakash367',
    live: 'https://jayaprakash367.github.io/LUMORA',
    year: '2024',
  },
  {
    id: 4,
    title: 'Plant Disease AI Detector',
    category: 'Deep Learning / AgriTech',
    description: 'Deep CNN for agricultural leaf disease classification.',
    longDescription:
      'A deep convolutional neural network pipeline leveraging PyTorch and ResNet architectures for accurate classification of plant leaf diseases from field photographs. Includes a FastAPI inference server for real-time agricultural diagnostics.',
    tags: ['PyTorch', 'ResNet', 'FastAPI', 'CNN', 'Agriculture'],
    color: '#4ade80',
    github: 'https://github.com/Jayaprakash367',
    year: '2024',
  },
  {
    id: 5,
    title: 'AI Virtual Mouse',
    category: 'Computer Vision / HCI',
    description: 'Real-time hands-free computer control using landmark detection.',
    longDescription:
      'A real-time computer vision application enabling hands-free mouse control through MediaPipe hand landmark detection and OpenCV processing. Supports click, drag, scroll gestures with sub-100ms latency for accessible computing.',
    tags: ['Python', 'MediaPipe', 'OpenCV', 'Gesture Recognition', 'HCI'],
    color: '#f472b6',
    github: 'https://github.com/Jayaprakash367',
    year: '2024',
  },
  {
    id: 6,
    title: 'Customer Churn Predictor',
    category: 'Machine Learning / Enterprise',
    description: 'Enterprise predictive ML pipeline with feature engineering dashboard.',
    longDescription:
      'An enterprise-grade machine learning pipeline for customer churn prediction featuring automated feature engineering, model comparison dashboards, and interactive Streamlit visualizations. Built with Scikit-Learn, Pandas, and production-ready model serving.',
    tags: ['Scikit-Learn', 'Pandas', 'Streamlit', 'ML Pipeline', 'Analytics'],
    color: '#fb923c',
    github: 'https://github.com/Jayaprakash367',
    year: '2024',
  },
  {
    id: 7,
    title: 'Algorithm Visualizer 3D',
    category: 'WebGL / Education',
    description: 'Interactive 3D graph theory and pathfinding visualizer.',
    longDescription:
      'An interactive 3D visualization tool for graph theory algorithms including Dijkstra\'s shortest path, A* search, BFS/DFS traversal, and minimum spanning trees. Powered by Three.js and WebGL shaders for immersive educational exploration.',
    tags: ['Three.js', 'WebGL', 'React', 'Graph Theory', 'Algorithms'],
    color: '#38bdf8',
    github: 'https://github.com/Jayaprakash367',
    year: '2024',
  },
  {
    id: 8,
    title: 'Cyber Sentinel',
    category: 'Cybersecurity / ML',
    description: 'Network traffic anomaly and intrusion detection monitor.',
    longDescription:
      'A cybersecurity monitoring system for network traffic anomaly detection and intrusion prevention. Combines Wireshark packet analysis with RandomForest classification models to identify malicious traffic patterns in real-time.',
    tags: ['Python', 'Wireshark API', 'RandomForest', 'Cybersecurity', 'IDS'],
    color: '#ef4444',
    github: 'https://github.com/Jayaprakash367',
    year: '2024',
  },
  {
    id: 9,
    title: 'Autonomous Drone Simulator',
    category: 'Simulation / 3D',
    description: 'Physics-based flight waypoint navigation simulator in the browser.',
    longDescription:
      'A browser-based autonomous drone flight simulator featuring realistic physics via Cannon.js, waypoint-based navigation algorithms, and 3D terrain rendering with Three.js. Supports custom mission planning and real-time telemetry dashboards.',
    tags: ['Three.js', 'Cannon.js', 'TypeScript', 'Physics', 'Simulation'],
    color: '#818cf8',
    github: 'https://github.com/Jayaprakash367',
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
  { value: '09+', label: 'Production & Research Deployments' },
  { value: '< 16ms', label: '60 FPS Fluid WebGL Rendering Target' },
];
