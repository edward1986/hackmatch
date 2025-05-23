
'use client';

import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import type { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { findTeammatesAction } from '@/lib/actions';
import { TeamMatchmakingSchema, type TeamMatchmakingResult } from '@/lib/schemas';
import { mockAvailableTeammates, mockUserParticipant } from '@/lib/mock-data'; // For available teammates pool
import { SuggestedTeammateCard } from './suggested-teammate-card';
import { Loader2, LightbulbIcon, AlertTriangleIcon } from 'lucide-react';
import type { AvailableTeammate } from '@/lib/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface TeamMatchmakingFormProps {
  hackathonId: string;
  hackathonDescription: string;
}

export function TeamMatchmakingForm({ hackathonId, hackathonDescription }: TeamMatchmakingFormProps) {
  const [isPending, startTransition] = useTransition();
  const [suggestions, setSuggestions] = useState<TeamMatchmakingResult | null>(null);
  
  // This would typically come from user profile or be fetched
  const currentUserSkills = mockUserParticipant.skills?.join(', ') || '';
  const currentUserInterests = mockUserParticipant.interests?.join(', ') || '';

  const form = useForm<z.infer<typeof TeamMatchmakingSchema>>({
    resolver: zodResolver(TeamMatchmakingSchema),
    defaultValues: {
      skills: currentUserSkills,
      interests: currentUserInterests,
    },
  });

  const onSubmit = (values: z.infer<typeof TeamMatchmakingSchema>) => {
    setSuggestions(null); // Clear previous suggestions
    const formData = new FormData();
    formData.append('skills', values.skills.join(', ')); // RHF provides it as an array due to transform
    formData.append('interests', values.interests.join(', ')); // RHF provides it as an array due to transform

    startTransition(async () => {
      // Filter out current user from available teammates if they exist in the mock list
      const availableTeammatesForSuggestion = mockAvailableTeammates.filter(tm => tm.id !== mockUserParticipant.id);
      const result = await findTeammatesAction(hackathonId, hackathonDescription, availableTeammatesForSuggestion, formData);
      setSuggestions(result);
    });
  };

  return (
    <div className="w-full space-y-8">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><LightbulbIcon className="h-6 w-6 text-primary"/> AI Teammate Finder</CardTitle>
          <CardDescription>Enter your skills and interests to find potential teammates for this hackathon. The AI will suggest matches from available participants.</CardDescription>
        </CardHeader>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="skills">Your Skills (comma-separated)</Label>
              <Textarea 
                id="skills" 
                {...form.register('skills', { 
                  setValueAs: value => value.split(',').map((s:string) => s.trim()).filter((s:string) => s) 
                })} 
                defaultValue={currentUserSkills} // Use defaultValue for initial display of string
                placeholder="e.g., React, Python, UI Design" 
                className="min-h-[80px]" 
              />
              {form.formState.errors.skills && <p className="text-sm text-destructive">{form.formState.errors.skills.message}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="interests">Your Interests (comma-separated)</Label>
              <Textarea 
                id="interests" 
                {...form.register('interests', { 
                  setValueAs: value => value.split(',').map((s:string) => s.trim()).filter((s:string) => s) 
                })} 
                defaultValue={currentUserInterests} // Use defaultValue for initial display of string
                placeholder="e.g., AI, Healthcare, Gaming" 
                className="min-h-[80px]" 
              />
              {form.formState.errors.interests && <p className="text-sm text-destructive">{form.formState.errors.interests.message}</p>}
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" disabled={isPending} className="w-full md:w-auto">
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Find Teammates
            </Button>
          </CardFooter>
        </form>
      </Card>

      {isPending && (
        <div className="flex flex-col items-center justify-center space-y-2 rounded-lg border border-dashed p-8">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Searching for teammates...</p>
        </div>
      )}

      {suggestions && (
        <div>
          <h2 className="mb-6 text-2xl font-semibold">Suggested Teammates</h2>
          {!suggestions.success && suggestions.message && (
             <Alert variant="destructive" className="mb-4">
              <AlertTriangleIcon className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{suggestions.message}</AlertDescription>
            </Alert>
          )}

          {suggestions.suggestedTeammates.length > 0 ? (
            <>
              <p className="mb-4 text-sm text-muted-foreground">{suggestions.reasoning}</p>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {suggestions.suggestedTeammates.map(teammateId => {
                    const teammateDetail = mockAvailableTeammates.find(tm => tm.id === teammateId);
                    return teammateDetail ? <SuggestedTeammateCard key={teammateId} teammate={teammateDetail} /> : null;
                })}
              </div>
            </>
          ) : (
            suggestions.success && <p className="text-muted-foreground">No specific suggestions found based on your criteria, or the AI could not find a match. Try adjusting your skills/interests.</p>
          )}
        </div>
      )}
    </div>
  );
}
