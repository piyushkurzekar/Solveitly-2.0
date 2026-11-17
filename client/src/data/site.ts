export const site = {
  name: "Solveitly",
  tagline: "Learn. Solve. Grow.",
  organization: "MVAPS & Company",
  // TODO: replace placeholder contact details with real ones.
  contact: {
    email: "support@solveitly.com",
    phone: "+1 (234) 567-890",
    phoneHref: "tel:+1234567890",
    address: ["123 Learning St.", "Education City, ED 45678"],
  },
  social: {
    instagram: "https://www.instagram.com/solveitly",
    facebook: "https://www.facebook.com/solveitly",
    twitter: "https://twitter.com/solveitly",
  },
};

export const navLinks = [
  { label: "Home", to: "/" },
  { label: "Courses", to: "/courses" },
  { label: "About", to: "/#about" },
  { label: "Blog", to: "/#blog" },
  { label: "Contact", to: "#contact" },
] as const;

export const features = [
  {
    icon: "teacher",
    title: "Expert Instructors",
    text: "Learn from industry professionals and subject matter experts who bring real-world experience to every course.",
  },
  {
    icon: "clock",
    title: "Learn at Your Own Pace",
    text: "Flexible schedules and self-paced courses let you learn whenever and wherever it suits you best.",
  },
  {
    icon: "projects",
    title: "Hands-on Projects",
    text: "Practice with real projects that blend theory with practical application, so you can build as you learn.",
  },
  {
    icon: "certificate",
    title: "Certification",
    text: "Earn certificates to showcase your new skills and boost your resume or LinkedIn profile.",
  },
] as const;

export const steps = [
  {
    title: "Create your free account",
    text: "Sign up in under a minute and get your personal learning dashboard.",
  },
  {
    title: "Pick a course",
    text: "Choose from web development, programming, cloud, DevOps and database courses.",
  },
  {
    title: "Learn & get certified",
    text: "Study at your own pace, practice with projects and earn a certificate when you finish.",
  },
];

export const missionPoints = [
  "Innovative, accessible and personalized learning",
  "Expert-curated content with practical application",
  "A collaborative space that encourages curiosity",
  "Flexible learning built around your goals",
];

/** Technologies taught across the catalogue (shown in the hero strip). */
export const technologies = [
  "HTML5",
  "CSS",
  "JavaScript",
  "Node.js",
  "Python",
  "Java",
  "C",
  "C++",
  "SQL",
  "Docker",
  "Kubernetes",
  "Jenkins",
] as const;

/** Solveitly is the EdTech vertical of MVAPS & Company (content from the company website). */
export const parentCompany = {
  name: "MVAPS & Company",
  url: "https://mvaps-and-company.onrender.com",
  tagline: "Making Visions Achievable with Powerful Solutions",
  founded: "20 May 2024",
  location: "Nagpur, Maharashtra, India",
  description:
    "MVAPS & Company is the parent organisation uniting technology, digital products, educational initiatives and media platforms — guided by useful technology and responsible growth.",
  /** Products shown in the parent-company card (Solveitly is highlighted as the current site). */
  products: [
    {
      name: "SnapDocs AI",
      area: "AI document processing",
      description: "Photos to PDF, image conversion, OCR text extraction and PDF tools.",
      url: "https://snapdocsaio.onrender.com/",
    },
    {
      name: "Solveitly",
      area: "EdTech",
      description: "Self-paced courses in programming, web, cloud and DevOps.",
      current: true,
    },
    {
      name: "Project Nest AI",
      area: "Client project delivery",
      description: "AI, web, mobile and custom software builds for students, startups and enterprises.",
      url: "https://project-nest-ai.onrender.com/",
    },
  ] as { name: string; area: string; description: string; url?: string; current?: boolean }[],
};

export const blogPosts = [
  {
    title: "How to Start Coding: A Beginner's Guide",
    excerpt:
      "Discover the best programming languages to learn first and tips to stay motivated on your coding journey.",
    image: "/images/blog/start-coding.webp",
  },
  {
    title: "Top Data Science Trends to Watch",
    excerpt: "Stay ahead with the latest tools, techniques, and career opportunities in the data science field.",
    image: "/images/blog/data-science-trends.webp",
  },
  {
    title: "5 Digital Marketing Tips for Small Businesses",
    excerpt: "Learn effective strategies to boost your online presence and attract more customers.",
    image: "/images/blog/digital-marketing-tips.webp",
  },
];
