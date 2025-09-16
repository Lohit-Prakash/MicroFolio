import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Project {
  id: string;
  title: string;
  period: string;
  institution: string;
  type: string;
  description: string;
  technologies: string[];
  status: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  location: string;
  specialization?: string;
}

export interface PersonalInfo {
  name: string;
  subtitle: string;
  description: string;
  location: string;
  phone: string;
  email: string;
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  education: Education[];
}

interface PortfolioContextType {
  data: PortfolioData;
  updatePersonalInfo: (info: PersonalInfo) => void;
  updateProjects: (projects: Project[]) => void;
  updateExperience: (experience: Experience[]) => void;
  updateEducation: (education: Education[]) => void;
  addProject: (project: Omit<Project, 'id'>) => void;
  removeProject: (id: string) => void;
  addExperience: (experience: Omit<Experience, 'id'>) => void;
  removeExperience: (id: string) => void;
  addEducation: (education: Omit<Education, 'id'>) => void;
  removeEducation: (id: string) => void;
}

const defaultData: PortfolioData = {
  personalInfo: {
    name: "Lohit Prakash Sundararajan",
    subtitle: "Aerospace & Electronics Engineer",
    description: "Aerospace & Electronics Engineer passionate about drone technology, control systems, and pioneering solutions in space exploration",
    location: "Chennai, Tamil Nadu",
    phone: "+91 93455 20182",
    email: "sjlohitp@gmail.com"
  },
  projects: [
    {
      id: '1',
      title: "Soft-Landing of Rockets Using Sliding Mode Control Algorithm",
      period: "Aug 2024 - Present",
      institution: "IIT Madras, Chennai",
      type: "Major Project",
      description: "Developing advanced control algorithms using Sliding Mode Control to achieve precision soft-landing of rockets, addressing stability and accuracy challenges under dynamic flight conditions.",
      technologies: ["Control Theory", "MATLAB/Simulink", "Aerospace Dynamics", "Algorithm Development"],
      status: "Ongoing"
    },
    {
      id: '2',
      title: "Comprehensive Development & Implementation of Drone Swarming Algorithm",
      period: "May 2024 - July 2024",
      institution: "IIT Madras, Chennai",
      type: "Internship Project",
      description: "Designed and built autonomous drone systems with swarming capabilities, integrating Pixhawk for flight control, Raspberry Pi 4 for computational processing, and Mission Planner for mission coordination.",
      technologies: ["Raspberry Pi", "Pixhawk", "Mission Planner", "QGroundControl", "Autonomous Systems"],
      status: "Completed"
    }
  ],
  experience: [
    {
      id: '1',
      title: "Research Intern",
      company: "Indian Space Research Organisation (ISRO)",
      period: "Dec 2023 - Jan 2024",
      location: "Bangalore, India",
      description: "Developed specialized patch antenna for Indian space missions",
      achievements: ["Designed dual band patch antenna for Gaganyaan applications", "Worked on GPS and NavIC satellite communication frequencies"]
    }
  ],
  education: [
    {
      id: '1',
      degree: "B.Tech in Electronics and Communication Engineering",
      institution: "National Institute of Technology, Puducherry",
      period: "2021 - 2025",
      cgpa: "8.6",
      location: "Karaikal, India"
    },
    {
      id: '2',
      degree: "Exchange Student in Aerospace Engineering",
      institution: "Indian Institute of Technology, Madras",
      period: "2024 - Present",
      cgpa: "9.2",
      location: "Chennai, India",
      specialization: "Control Systems & Space Technology"
    }
  ]
};

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(() => {
    const saved = localStorage.getItem('portfolioData');
    return saved ? JSON.parse(saved) : defaultData;
  });

  useEffect(() => {
    localStorage.setItem('portfolioData', JSON.stringify(data));
  }, [data]);

  const updatePersonalInfo = (info: PersonalInfo) => {
    setData(prev => ({ ...prev, personalInfo: info }));
  };

  const updateProjects = (projects: Project[]) => {
    setData(prev => ({ ...prev, projects }));
  };

  const updateExperience = (experience: Experience[]) => {
    setData(prev => ({ ...prev, experience }));
  };

  const updateEducation = (education: Education[]) => {
    setData(prev => ({ ...prev, education }));
  };

  const addProject = (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: Date.now().toString() };
    setData(prev => ({ ...prev, projects: [...prev.projects, newProject] }));
  };

  const removeProject = (id: string) => {
    setData(prev => ({ ...prev, projects: prev.projects.filter(p => p.id !== id) }));
  };

  const addExperience = (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: Date.now().toString() };
    setData(prev => ({ ...prev, experience: [...prev.experience, newExperience] }));
  };

  const removeExperience = (id: string) => {
    setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  };

  const addEducation = (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: Date.now().toString() };
    setData(prev => ({ ...prev, education: [...prev.education, newEducation] }));
  };

  const removeEducation = (id: string) => {
    setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      updatePersonalInfo,
      updateProjects,
      updateExperience,
      updateEducation,
      addProject,
      removeProject,
      addExperience,
      removeExperience,
      addEducation,
      removeEducation
    }}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
}