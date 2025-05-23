'use server';

/**
 * @fileOverview Implements the team matchmaking flow using AI to suggest potential teammates.
 *
 * - suggestTeammates - A function that suggests potential teammates based on skills and interests.
 * - SuggestTeammatesInput - The input type for the suggestTeammates function.
 * - SuggestTeammatesOutput - The return type for the suggestTeammates function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestTeammatesInputSchema = z.object({
  userSkills: z
    .array(z.string())
    .describe('A list of the user\'s skills.'),
  userInterests: z
    .array(z.string())
    .describe('A list of the user\'s interests.'),
  availableTeammates: z
    .array(z.object({
      id: z.string(),
      skills: z.array(z.string()),
      interests: z.array(z.string()),
    }))
    .describe('A list of available teammates with their skills and interests.'),
  hackathonDescription: z.string().describe('The description of the hackathon.'),
});
export type SuggestTeammatesInput = z.infer<typeof SuggestTeammatesInputSchema>;

const SuggestTeammatesOutputSchema = z.object({
  suggestedTeammates: z
    .array(z.string())
    .describe('A list of suggested teammate IDs.'),
  reasoning: z.string().describe('The AI reasoning behind the suggestions.'),
});
export type SuggestTeammatesOutput = z.infer<typeof SuggestTeammatesOutputSchema>;

export async function suggestTeammates(input: SuggestTeammatesInput): Promise<SuggestTeammatesOutput> {
  return suggestTeammatesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestTeammatesPrompt',
  input: {schema: SuggestTeammatesInputSchema},
  output: {schema: SuggestTeammatesOutputSchema},
  prompt: `You are an AI assistant helping a user find teammates for a hackathon.

The hackathon is described as follows: {{{hackathonDescription}}}

The user has the following skills: {{#if userSkills}}{{#each userSkills}}- {{{this}}}{{/each}}{{else}}None{{/if}}

The user has the following interests: {{#if userInterests}}{{#each userInterests}}- {{{this}}}{{/each}}{{else}}None{{/if}}

Given the following list of available teammates, suggest up to 3 teammates that would be a good fit for the user.

Available Teammates:
{{#each availableTeammates}}
- ID: {{{this.id}}}, Skills: {{#if this.skills}}{{#each this.skills}}- {{{this}}}{{/each}}{{else}}None{{/if}}, Interests: {{#if this.interests}}{{#each this.interests}}- {{{this}}}{{/each}}{{else}}None{{/if}}
{{/each}}

Return a JSON object with a \"suggestedTeammates\" field containing a list of teammate IDs and a \"reasoning\" field explaining why you suggested these teammates.`,
});

const suggestTeammatesFlow = ai.defineFlow(
  {
    name: 'suggestTeammatesFlow',
    inputSchema: SuggestTeammatesInputSchema,
    outputSchema: SuggestTeammatesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
