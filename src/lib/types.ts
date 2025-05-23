
export type UserRole = 'participant' | 'organizer' | 'judge';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  skills?: string[];
  interests?: string[];
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  // In a real app, organizerId would be stored and organizer details fetched.
  organizerName: string; 
  rules: string;
  prizes: string;
  startDate: Date;
  endDate: Date;
  timelineEvents?: Array<{ date: Date; description: string; title: string }>;
  status: 'upcoming' | 'active' | 'past';
  imageUrl?: string; // Optional image for the hackathon card
}

export interface Team {
  id: string;
  name: string;
  members: Pick<UserProfile, 'id' | 'name'>[]; // Store only essential member info or IDs
  hackathonId: string;
  projectId?: string; 
}

export interface Project {
  id: string;
  title: string;
  description: string;
  teamId: string;
  hackathonId: string;
  repoUrl?: string;
  presentationUrl?: string;
  demoUrl?: string;
  // For client-side representation of files before upload.
  // On server, this would be an array of storage paths or URLs.
  files?: File[]; 
  submittedAt: Date;
}

export interface LeaderboardEntry {
  teamName: string;
  score: number;
  rank: number;
}

// For AI Teammate Suggestion
export interface AvailableTeammate {
  id: string;
  name: string; // Added for display purposes
  skills: string[];
  interests: string[];
  avatarUrl?: string; // Optional avatar
}
