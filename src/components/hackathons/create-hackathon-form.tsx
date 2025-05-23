
'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { createHackathonAction } from '@/lib/actions';
import { CreateHackathonSchema, type CreateHackathonFormState } from '@/lib/schemas';
import { cn } from '@/lib/utils';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';


function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Create Hackathon
    </Button>
  );
}

export function CreateHackathonForm() {
  const router = useRouter();
  const { toast } = useToast();

  const initialState: CreateHackathonFormState = { message: '', success: false };
  const [state, formAction] = useFormState(createHackathonAction, initialState);

  const form = useForm<z.infer<typeof CreateHackathonSchema>>({
    resolver: zodResolver(CreateHackathonSchema),
    defaultValues: {
      title: '',
      description: '',
      rules: '',
      prizes: '',
      startDate: undefined,
      endDate: undefined,
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
      // In a real app, we'd redirect to the newly created hackathon page:
      // e.g. router.push(`/hackathons/${newHackathonId}`);
      // For now, we'll just clear the form or redirect to home after a delay.
      form.reset();
      setTimeout(() => router.push('/'), 1500);

    } else if (state.message && state.errors) {
       toast({
        title: "Error",
        description: state.message || "Failed to create hackathon. Please check errors.",
        variant: "destructive",
      });
    }
  }, [state, router, form, toast]);


  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Create New Hackathon</CardTitle>
        <CardDescription>Fill in the details for your hackathon event.</CardDescription>
      </CardHeader>
      <form action={formAction} onSubmit={form.handleSubmit(() => formAction(new FormData(form.control._formValuesIncludingDisabled)))}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" {...form.register('title')} placeholder="e.g., AI Innovation Challenge" />
            {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title.join(', ')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" {...form.register('description')} placeholder="Describe your hackathon, its goals, and theme." className="min-h-[100px]" />
            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
            {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description.join(', ')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="rules">Rules</Label>
            <Textarea id="rules" {...form.register('rules')} placeholder="Outline the rules and guidelines for participants." className="min-h-[100px]" />
            {form.formState.errors.rules && <p className="text-sm text-destructive">{form.formState.errors.rules.message}</p>}
            {state.errors?.rules && <p className="text-sm text-destructive">{state.errors.rules.join(', ')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="prizes">Prizes</Label>
            <Input id="prizes" {...form.register('prizes')} placeholder="e.g., $1000 cash, Swag, Cloud Credits" />
            {form.formState.errors.prizes && <p className="text-sm text-destructive">{form.formState.errors.prizes.message}</p>}
            {state.errors?.prizes && <p className="text-sm text-destructive">{state.errors.prizes.join(', ')}</p>}
          </div>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="startDate">Start Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch('startDate') && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch('startDate') ? format(form.watch('startDate')!, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch('startDate')}
                    onSelect={(date) => form.setValue('startDate', date as Date, { shouldValidate: true })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              {/* Hidden input for react-hook-form and server action */}
              <input type="hidden" {...form.register('startDate')} value={form.watch('startDate')?.toISOString() || ''} />
              {form.formState.errors.startDate && <p className="text-sm text-destructive">{form.formState.errors.startDate.message}</p>}
              {state.errors?.startDate && <p className="text-sm text-destructive">{state.errors.startDate.join(', ')}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="endDate">End Date</Label>
               <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !form.watch('endDate') && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {form.watch('endDate') ? format(form.watch('endDate')!, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={form.watch('endDate')}
                    onSelect={(date) => form.setValue('endDate', date as Date, { shouldValidate: true })}
                    disabled={(date) =>
                      date < (form.watch('startDate') || new Date(0)) 
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <input type="hidden" {...form.register('endDate')} value={form.watch('endDate')?.toISOString() || ''} />
              {form.formState.errors.endDate && <p className="text-sm text-destructive">{form.formState.errors.endDate.message}</p>}
              {state.errors?.endDate && <p className="text-sm text-destructive">{state.errors.endDate.join(', ')}</p>}
            </div>
          </div>
           {state.errors?._form && <p className="text-sm font-medium text-destructive">{state.errors._form.join(', ')}</p>}
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
