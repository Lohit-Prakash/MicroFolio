import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

// ... (interface definitions remain the same)
export interface Project {
  id: string;
  title: string;
  period: string;
  institution: string;
  type: string;
  description: string;
  technologies: string[];
  status: string;
  images?: string[];
  pdfs?: string[];
  githubLink?: string;
  liveLink?: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements: string[];
  images?: string[];
  pdfs?: string[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  cgpa: string;
  location: string;
  specialization?: string;
  description?: string;
  achievements?: string[];
  relevantCourses?: string[];
  images?: string[];
  pdfs?: string[];
}

export interface PersonalInfo {
  name: string;
  subtitle: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  linkedin?: string;
  github?: string;
  youtube?: string;
  instagram?: string;
  twitter?: string;
  scholar?: string;
  resumeLink?: string;
  profileImage?: string;
}

export interface AboutSection {
  vision: string;
  educationDesc: string;
  innovation: string;
  researchAreas: string[];
  keySkills: string[];
}

interface PortfolioData {
  personalInfo: PersonalInfo;
  projects: Project[];
  experience: Experience[];
  education: Education[];
  aboutSection: AboutSection;
}

const mockData: PortfolioData = {
  personalInfo: {
    name: "Lohit Prakash",
    subtitle: "Aerospace & Electronics Engineer",
    description: "I am a passionate Aerospace Engineering student at IIT Madras, specializing in drone technology, control systems, and power electronics. I am driven by a desire to innovate and create cutting-edge solutions to complex challenges in the aerospace and electronics industries.",
    location: "Chennai, India",
    phone: "+91 1234567890",
    email: "lohit.prakash@example.com",
    linkedin: "https://www.linkedin.com/in/lohit-prakash/",
    github: "https://github.com/lohit-prakash",
    resumeLink: "/path/to/resume.pdf",
    profileImage: "/path/to/profile-image.jpg",
  },
  projects: [
    {
      id: "1",
      title: "Autonomous Drone Delivery System",
      period: "2023-Present",
      institution: "IIT Madras",
      type: "Research Project",
      description: "Developed an autonomous drone delivery system capable of navigating complex urban environments. The system uses a combination of GPS, computer vision, and machine learning to ensure safe and efficient delivery.",
      technologies: ["Python", "ROS", "OpenCV", "TensorFlow"],
      status: "In Progress",
    },
  ],
  experience: [
    {
      id: "1",
      title: "Aerospace Engineering Intern",
      company: "Indian Space Research Organisation (ISRO)",
      period: "Summer 2023",
      location: "Bangalore, India",
      description: "Worked on the design and analysis of a new satellite propulsion system. Gained hands-on experience with industry-standard software and testing procedures.",
      achievements: ["Contributed to the successful design of a new propulsion system.", "Presented my findings to a team of senior engineers."],
    },
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Technology in Aerospace Engineering",
      institution: "Indian Institute of Technology Madras",
      period: "2021-2025",
      cgpa: "8.5",
      location: "Chennai, India",
    },
  ],
  aboutSection: {
    vision: "To be at the forefront of aerospace innovation, developing sustainable and efficient solutions for the future of transportation and exploration.",
    educationDesc: "My education at IIT Madras has provided me with a strong foundation in aerospace engineering, with a focus on aerodynamics, propulsion, and control systems. I have also pursued my interests in electronics and computer science, which I believe are essential for the future of the aerospace industry.",
    innovation: "I am passionate about innovation and am constantly exploring new ideas and technologies. I believe that the best way to solve complex problems is to think outside the box and to challenge the status quo.",
    researchAreas: ["Drone Technology", "Control Systems", "Power Electronics", "Machine Learning"],
    keySkills: ["Python", "C++", "MATLAB", "Simulink", "CATIA", "ANSYS"],
  },
};


interface PortfolioContextType {
  data: PortfolioData;
  loading: boolean;
  updatePersonalInfo: (info: PersonalInfo) => Promise<void>;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  updateProjects: (projects: Project[]) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
  addExperience: (experience: Omit<Experience, 'id'>) => Promise<void>;
  updateExperience: (experience: Experience) => Promise<void>;
  removeExperience: (id: string) => Promise<void>;
  addEducation: (education: Omit<Education, 'id'>) => Promise<void>;
  updateEducation: (education: Education) => Promise<void>;
  removeEducation: (id: string) => Promise<void>;
  updateAboutSection: (about: AboutSection) => Promise<void>;
  seedDatabase: () => Promise<void>;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<PortfolioData>(mockData);
  const [loading, setLoading] = useState(true);
  // Always use 'default' so all users (admin and visitors) read/write the same Firestore document
  // This ensures changes made by admin are visible to everyone
  const userId = 'default';

  useEffect(() => {
    const docRef = doc(db, "portfolios", userId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        console.log("Data fetched from Firestore:", docSnap.data());
        setData(docSnap.data() as PortfolioData);
      } else {
        // If no data, seed the database with mock data
        setDoc(docRef, mockData);
        setData(mockData);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [userId]);

  const updateFirestore = async (updatedData: Partial<PortfolioData>) => {
    try {
      const docRef = doc(db, "portfolios", userId);
      // TEMP DEBUG LOG - remove after verification
      console.log("[DEBUG] updateFirestore called with:", JSON.parse(JSON.stringify(updatedData)));
      console.log("[DEBUG] Writing to doc:", docRef.path);
      // Use setDoc with merge: true to create document if it doesn't exist AND merge with existing data
      await setDoc(docRef, updatedData, { merge: true });
      console.log("Firestore update successful");
      // Don't update local state immediately - let onSnapshot handle it
      // This ensures we're always in sync with Firestore
    } catch (error) {
      console.error("Error updating Firestore:", error);
      throw error;
    }
  };

  const updatePersonalInfo = async (info: PersonalInfo) => {
    await updateFirestore({ personalInfo: info });
  };

  const addProject = async (project: Omit<Project, 'id'>) => {
    const newProject = { ...project, id: crypto.randomUUID() };
    const updatedProjects = [...data.projects, newProject];
    await updateFirestore({ projects: updatedProjects });
  };

  const updateProject = async (project: Project) => {
    try {
      // TEMP DEBUG LOG - remove after verification
      console.log('[DEBUG] updateProject called with project:', JSON.parse(JSON.stringify(project)));
      const updatedProjects = data.projects.map((p) => (p.id === project.id ? project : p));
      console.log('[DEBUG] updateProject will write projects array of length', updatedProjects.length);
      await updateFirestore({ projects: updatedProjects });
    } catch (error) {
      console.error('[DEBUG] updateProject error:', error);
      throw error;
    }
  };

  const updateProjects = async (projects: Project[]) => {
    await updateFirestore({ projects });
  };

  const removeProject = async (id: string) => {
    const updatedProjects = data.projects.filter((p) => p.id !== id);
    await updateFirestore({ projects: updatedProjects });
  };

  const addExperience = async (experience: Omit<Experience, 'id'>) => {
    const newExperience = { ...experience, id: crypto.randomUUID() };
    const updatedExperience = [...data.experience, newExperience];
    await updateFirestore({ experience: updatedExperience });
  };

  const updateExperience = async (experience: Experience) => {
    const updatedExperience = data.experience.map((e) => (e.id === experience.id ? experience : e));
    await updateFirestore({ experience: updatedExperience });
  };

  const removeExperience = async (id: string) => {
    const updatedExperience = data.experience.filter((e) => e.id !== id);
    await updateFirestore({ experience: updatedExperience });
  };

  const addEducation = async (education: Omit<Education, 'id'>) => {
    const newEducation = { ...education, id: crypto.randomUUID() };
    const updatedEducation = [...data.education, newEducation];
    await updateFirestore({ education: updatedEducation });
  };

  const updateEducation = async (education: Education) => {
    const updatedEducation = data.education.map((e) => (e.id === education.id ? education : e));
    await updateFirestore({ education: updatedEducation });
  };

  const removeEducation = async (id: string) => {
    const updatedEducation = data.education.filter((e) => e.id !== id);
    await updateFirestore({ education: updatedEducation });
  };

  const updateAboutSection = async (about: AboutSection) => {
    await updateFirestore({ aboutSection: about });
  };

  const seedDatabase = async () => {
    const docRef = doc(db, "portfolios", userId);
    await setDoc(docRef, mockData);
  };

  return (
    <PortfolioContext.Provider value={{
      data,
      loading,
      updatePersonalInfo,
      addProject,
      updateProject,
      updateProjects,
      removeProject,
      addExperience,
      updateExperience,
      removeExperience,
      addEducation,
      updateEducation,
      removeEducation,
      updateAboutSection,
      seedDatabase
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
