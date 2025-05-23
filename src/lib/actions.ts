
'use server';

import { z } from 'zod';
import { suggestTeammates, type SuggestTeammatesInput, type SuggestTeammatesOutput } from '@/ai/flows/team-matchmaking';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

// Helper function for transforming comma-separated strings to array
function processStringToArray(val: string): string[] {
  // Zod's z.string().min(1) should ensure `val` is a non-empty string here.
  return val.split(',').map(s => s.trim()).filter(s => s);
}

// Helper function for refine
function isEndDateAfterStartDate(data: { startDate: Date, endDate: Date }): boolean {
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

export async function createHackathonAction(
  prevState: CreateHackathonFormState,
  formData: FormData
): Promise<CreateHackathonFormState> {
  const validatedFields = CreateHackathonSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    rules: formData.get('rules'),
    prizes: formData.get('prizes'),
    startDate: formData.get('startDate'),
    endDate: formData.get('endDate'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed. Please check your input.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const data = validatedFields.data;
  console.log('Creating hackathon:', data);
  // In a real app, save to Firestore here
  // const hackathonId = await saveHackathonToFirestore(data); 

  // For now, simulate success
  // Simulate some delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  revalidatePath('/'); // Revalidate dashboard to show new hackathon
  // redirect(`/hackathons/${hackathonId}`); // Redirect to the new hackathon's page
  // For mock, redirect to home
  return { message: 'Hackathon created successfully! Redirecting...', success: true };
}


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
export async function submitProjectAction(
  hackathonId: string,
  prevState: SubmitProjectFormState,
  formData: FormData
): Promise<SubmitProjectFormState> {
  const validatedFields = SubmitProjectSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    repoUrl: formData.get('repoUrl'),
    presentationUrl: formData.get('presentationUrl'),
    // file: formData.get('file'), // formData.get('file') will be a File object on client, but needs careful handling
  });

  if (!validatedFields.success) {
    return {
      message: 'Validation failed.',
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }
  
  const data = validatedFields.data;
  console.log(`Submitting project for hackathon ${hackathonId}:`, data);
  // In a real app:
  // 1. Upload file to Firebase Storage if present
  // 2. Save project details to Firestore
  
  await new Promise(resolve => setTimeout(resolve, 1000));

  // revalidatePath(`/hackathons/${hackathonId}`);
  return { message: 'Project submitted successfully!', success: true };
}

// Schema for Team Matchmaking Form
export const TeamMatchmakingSchema = z.object({
  skills: z.string().min(1, "Please enter at least one skill").transform(processStringToArray),
  interests: z.string().min(1, "Please enter at least one interest").transform(processStringToArray),
});

export type TeamMatchmakingResult = SuggestTeammatesOutput & { success: boolean; message?: string; errors?: any };

export async function findTeammatesAction(
  hackathonId: string,
  hackathonDescription: string,
  availableTeammates: SuggestTeammatesInput['availableTeammates'],
  formData: FormData
): Promise<TeamMatchmakingResult> {
  try {
    const validatedFields = TeamMatchmakingSchema.safeParse({
      skills: formData.get('skills'),
      interests: formData.get('interests'),
    });

    if (!validatedFields.success) {
      return {
        success: false,
        message: 'Validation failed. Please check your input.',
        errors: validatedFields.error.flatten().fieldErrors,
        suggestedTeammates: [],
        reasoning: '',
      };
    }

    const { skills: userSkills, interests: userInterests } = validatedFields.data;

    const input: SuggestTeammatesInput = {
      userSkills,
      userInterests,
      availableTeammates,
      hackathonDescription,
    };

    console.log('Calling AI for teammate suggestions with input:', input);
    const result = await suggestTeammates(input);
    console.log('AI suggestion result:', result);
    
    return { ...result, success: true };

  } catch (error) {
    console.error('Error in findTeammatesAction:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred.';
    return {
      suggestedTeammates: [],
      reasoning: `Error: ${errorMessage}`,
      success: false,
      message: `Failed to get suggestions: ${errorMessage}`,
    };
  }
}
