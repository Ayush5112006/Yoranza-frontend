// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'admin';
  avatar?: string;
}

// Student types
export interface Student {
  id: string;
  userId: string;
  name: string;
  email: string;
  branch: string;
  cgpa: number;
  skills: string[];
  resumeUrl?: string;
  certifications: string[];
  graduationYear: number;
  backlogs: number;
  github?: string;
  linkedin?: string;
  phone?: string;
  placementStatus: 'not-placed' | 'placed' | 'opted-out';
}

// Company types
export interface Company {
  id: string;
  name: string;
  website: string;
  hrContact: string;
  hrEmail: string;
  logo?: string;
  industry: string;
  location: string;
  description: string;
}

// Placement Drive types
export interface PlacementDrive {
  id: string;
  companyId: string;
  company?: Company;
  role: string;
  package: string;
  type: 'internship' | 'full-time';
  lastDate: string;
  interviewDate: string;
  eligibility: {
    minCgpa: number;
    branches: string[];
    maxBacklogs: number;
    graduationYear: number;
    skills?: string[];
  };
  description: string;
  status: 'active' | 'closed' | 'upcoming';
  applicantsCount?: number;
}

// Application types
export interface Application {
  id: string;
  studentId: string;
  student?: Student;
  driveId: string;
  drive?: PlacementDrive;
  status: 'applied' | 'shortlisted' | 'rejected' | 'interview-scheduled' | 'selected' | 'waitlisted';
  appliedAt: string;
}

// Interview types
export interface Interview {
  id: string;
  applicationId: string;
  application?: Application;
  round: 'aptitude' | 'technical' | 'hr' | 'group-discussion';
  roundNumber: number;
  date: string;
  time: string;
  link?: string;
  venue?: string;
  mode: 'online' | 'offline';
  duration: number; // in minutes
  instructions?: string;
  feedback?: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  result?: 'passed' | 'failed' | 'pending';
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'drive' | 'application' | 'interview' | 'result';
  read: boolean;
  createdAt: string;
}

// Analytics types
export interface PlacementAnalytics {
  totalStudents: number;
  registeredStudents: number;
  eligibleStudents: number;
  placedStudents: number;
  placementPercentage: number;
  highestPackage: string;
  averagePackage: string;
  companiesVisited: number;
  activeRecruiters: number;
  internshipCount: number;
  departmentWisePlacements: {
    department: string;
    placed: number;
    total: number;
  }[];
  monthlyPlacements: {
    month: string;
    placements: number;
  }[];
}
