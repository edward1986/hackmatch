
import { z } from 'zod';
import type { SuggestTeammatesOutput } from '@/ai/flows/team-matchmaking';

// Helper function for transforming comma-separated strings to array
export function processStringToArray(val: string): string[] {
  // Zod's z.string().min(1) should ensure `val` is a non-empty string here.
  return val.split(',').map(s => s.trim()).filter(s => s);
}

// Helper function for refine
export function isEndDateAfterStartDate(data: { startDate: Date, endDate: Date }): boolean {
  return data.endDate > data.startDate;
}

// Schema for Create Hackathon Form
export const CreateHackathonSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(20, 'Description must be at least 20 characters'),
  rules: z.string().min(10, 'Rules must be at least 10 characters'),
  prizes: z.string().min(5, 'Prizes description must be at least 5 characters'),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
}).refine(isEndDateAfterStartDate, {
  message: "End date must be after start date",
  path: ["endDate"],
});
export type CreateHackathonFormState = {
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    rules?: string[];
    prizes?: string[];
    startDate?: string[];
    endDate?: string[];
    _form?: string[];
  };
  success: boolean;
};


// Schema for Project Submission Form
export const SubmitProjectSchema = z.object({
  title: z.string().min(3, 'Project title must be at least 3 characters'),
  description: z.string().min(10, 'Project description must be at least 10 characters'),
  repoUrl: z.string().url('Please enter a valid repository URL').optional().or(z.literal('')),
  presentationUrl: z.string().url('Please enter a valid presentation URL').optional().or(z.literal('')),
  // file: typeof window === 'undefined' ? z.any() : z.instanceof(File).optional(), // File handling is complex with server actions
});
export type SubmitProjectFormState = {
  message: string;
  errors?: {
    title?: string[];
    description?: string[];
    repoUrl?: string[];
    presentationUrl?: string[];
    // file?: string[];
    _form?: string[];
  };
  success: boolean;
};

// Schema for Team Matchmaking Form
export const TeamMatchmakingSchema = z.object({
  skills: z.string().min(1, "Please enter at least one skill").transform(processStringToArray),
  interests: z.string().min(1, "Please enter at least one interest").transform(processStringToArray),
});

export type TeamMatchmakingResult = SuggestTeammatesOutput & { success: boolean; message?: string; errors?: any };
