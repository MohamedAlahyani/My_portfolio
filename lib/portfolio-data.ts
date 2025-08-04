// Centralized data source for the portfolio
export interface AboutMeData {
  id: string
  name: string
  email: string
  location: string
  availability: string
  content: string
  image?:string
}

export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  image_url: string | null
  demo_url: string
  repo_url: string
}

export interface Skill {
  id: string
  name: string
  level: number
}

export interface Experience {
  id: string
  title: string
  company: string
  period: string
  description: string
  start_date: string | null
  end_date: string | null
}

export interface ContactInfo {
  id: string
  email: string
  linkedin_url: string
  github_url: string
  instagram_url: string
  availability_status: string
}

export interface HeroSection {
  id: string
  headline: string
  description: string
  profile_picture_url: string
}

// Helper to generate UUIDs for new entries
function generateUUID(): string {
  return crypto.randomUUID()
}

// Portfolio data (mutable for in-memory operations)
export const portfolioData = {
  aboutMe: {
    id: "1",
    name: "Mohamed Alahyani",
    email: "mohamedalahiyani@gmail.com",
    location: "Ifrane",
    availability: "Open to opportunities",
    content:
      "I'm a passionate software engineer with experience building web applications and digital products. I specialize in frontend development with React and Next.js, but I'm also comfortable working with backend technologies. My journey in tech started with a strong foundation in software development. I've worked with various companies to create intuitive, performant, and accessible digital experiences. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, and staying up-to-date with the latest industry trends.",
  } as AboutMeData,

  projects: [
    {
      id: "1",
      title: "E-commerce Platform",
      description: "A full-stack e-commerce platform built with Next.js, Stripe, and Prisma.",
      tags: ["Next.js", "TypeScript", "Prisma", "Stripe"],
      image_url: "/placeholder.svg?height=400&width=600",
      demo_url: "https://example.com",
      repo_url: "https://github.com",
    },
    {
      id: "2",
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates.",
      tags: ["React", "Firebase", "Tailwind CSS", "Redux"],
      image_url: "/placeholder.svg?height=400&width=600",
      demo_url: "https://example.com",
      repo_url: "https://github.com",
    },
    {
      id: "3",
      title: "AI Content Generator",
      description: "An AI-powered content generation tool using OpenAI's GPT models.",
      tags: ["Next.js", "OpenAI API", "Node.js", "MongoDB"],
      image_url: "/placeholder.svg?height=400&width=600",
      demo_url: "https://example.com",
      repo_url: "https://github.com",
    },
    {
      id: "4",
      title: "Fitness Tracker",
      description: "A mobile-first fitness tracking application with data visualization.",
      tags: ["React Native", "TypeScript", "D3.js", "Firebase"],
      image_url: "/placeholder.svg?height=400&width=600",
      demo_url: "https://example.com",
      repo_url: "https://github.com",
    },
    {
      id: "5",
      title: "Weather Dashboard",
      description: "A beautiful weather dashboard with forecasts and historical data.",
      tags: ["React", "Weather API", "Chart.js", "Styled Components"],
      image_url: "/placeholder.svg?height=400&width=600",
      demo_url: "https://example.com",
      repo_url: "https://github.com",
    },
    {
      id: "6",
      title: "Portfolio Website",
      description: "This portfolio website built with Next.js and Tailwind CSS.",
      tags: ["Next.js", "Tailwind CSS", "Framer Motion", "TypeScript"],
      image_url: "/placeholder.svg?height=400&width=600",
      demo_url: "https://example.com",
      repo_url: "https://github.com",
    },
  ] as Project[],

  skills: [
    { id: "1", name: "JavaScript", level: 90 },
    { id: "2", name: "TypeScript", level: 85 },
    { id: "3", name: "React", level: 95 },
    { id: "4", name: "Next.js", level: 90 },
    { id: "5", name: "Node.js", level: 80 },
    { id: "6", name: "HTML/CSS", level: 95 },
    { id: "7", name: "Tailwind CSS", level: 90 },
    { id: "8", name: "GraphQL", level: 75 },
    { id: "9", name: "PostgreSQL", level: 70 },
    { id: "10", name: "AWS", level: 65 },
    { id: "11", name: "Docker", level: 60 },
    { id: "12", name: "Git", level: 85 },
  ] as Skill[],

  experience: [
    {
      id: "1",
      title: "Senior Frontend Engineer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description:
        "Lead the frontend development team in building a SaaS platform. Implemented new features, improved performance, and mentored junior developers.",
      start_date: "2021-01-01",
      end_date: null,
    },
    {
      id: "2",
      title: "Frontend Developer",
      company: "Digital Solutions Co.",
      period: "2019 - 2021",
      description:
        "Developed responsive web applications using React and TypeScript. Collaborated with designers and backend engineers to deliver high-quality products.",
      start_date: "2019-06-01",
      end_date: "2021-12-31",
    },
    {
      id: "3",
      title: "Web Developer",
      company: "Creative Agency",
      period: "2017 - 2019",
      description:
        "Built websites and web applications for various clients. Worked with HTML, CSS, JavaScript, and WordPress.",
      start_date: "2017-03-01",
      end_date: "2019-05-31",
    },
    {
      id: "4",
      title: "Intern",
      company: "Startup Hub",
      period: "2016 - 2017",
      description: "Assisted in developing web applications and learned modern web development practices.",
      start_date: "2016-09-01",
      end_date: "2017-02-28",
    },
  ] as Experience[],

  contactInfo: {
    id: "1",
    email: "hello@example.com",
    linkedin_url: "https://www.linkedin.com/in/shinekyawkyawaung/",
    github_url: "https://github.com/shinekyawkyawaung",
    instagram_url: "https://twitter.com",
    availability_status: "Available for freelance work and full-time opportunities",
  } as ContactInfo,

  heroSection: {
    id: "1",
    headline: "Hi, I'm Shine Kyaw Kyaw Aung",
    description: "I craft exceptional digital experiences with code, creativity, and a passion for innovation.",
    profile_picture_url:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/my-avatar-0zxAXW7IyHYZM4TamVo5GKNxtEqBwj.png",
  } as HeroSection,
}

export { generateUUID }
