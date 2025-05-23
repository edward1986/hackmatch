'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { z } from 'zod';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SubmitProjectSchema, submitProjectAction, type SubmitProjectFormState } from '@/lib/actions';
import { Loader2, UploadCloudIcon, FileIcon, XIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProjectSubmissionFormProps {
  hackathonId: string;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full md:w-auto">
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
      Submit Project
    </Button>
  );
}

export function ProjectSubmissionForm({ hackathonId }: ProjectSubmissionFormProps) {
  const { toast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);

  const initialState: SubmitProjectFormState = { message: '', success: false };
  // Curry submitProjectAction with hackathonId
  const submitProjectActionWithId = submitProjectAction.bind(null, hackathonId);
  const [state, formAction] = useFormState(submitProjectActionWithId, initialState);

  const form = useForm<z.infer<typeof SubmitProjectSchema>>({
    resolver: zodResolver(SubmitProjectSchema),
    defaultValues: {
      title: '',
      description: '',
      repoUrl: '',
      presentationUrl: '',
      // file: undefined,
    },
  });

  useEffect(() => {
    if (state.success) {
      toast({
        title: "Success!",
        description: state.message,
      });
      form.reset();
      setFileName(null);
    } else if (state.message && state.errors) {
      toast({
        title: "Error",
        description: state.message || "Failed to submit project. Please check errors.",
        variant: "destructive",
      });
    }
  }, [state, form, toast]);
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // form.setValue('file', file); // If managing file with RHF state
    } else {
      setFileName(null);
      // form.setValue('file', undefined);
    }
  };

  const removeFile = () => {
    setFileName(null);
    // form.setValue('file', undefined);
    const fileInput = document.getElementById('file') as HTMLInputElement;
    if(fileInput) fileInput.value = '';
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Submit Your Project</CardTitle>
        <CardDescription>Provide details and files for your hackathon project.</CardDescription>
      </CardHeader>
      <form action={formAction} onSubmit={form.handleSubmit(() => formAction(new FormData(form.control._formValuesIncludingDisabled)))} encType="multipart/form-data">
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Project Title</Label>
            <Input id="title" {...form.register('title')} placeholder="e.g., Awesome AI App" />
            {form.formState.errors.title && <p className="text-sm text-destructive">{form.formState.errors.title.message}</p>}
            {state.errors?.title && <p className="text-sm text-destructive">{state.errors.title.join(', ')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Project Description</Label>
            <Textarea id="description" {...form.register('description')} placeholder="Detailed description of your project." className="min-h-[100px]" />
            {form.formState.errors.description && <p className="text-sm text-destructive">{form.formState.errors.description.message}</p>}
            {state.errors?.description && <p className="text-sm text-destructive">{state.errors.description.join(', ')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="repoUrl">Repository URL (GitHub, GitLab, etc.)</Label>
            <Input id="repoUrl" type="url" {...form.register('repoUrl')} placeholder="https://github.com/user/project" />
            {form.formState.errors.repoUrl && <p className="text-sm text-destructive">{form.formState.errors.repoUrl.message}</p>}
            {state.errors?.repoUrl && <p className="text-sm text-destructive">{state.errors.repoUrl.join(', ')}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="presentationUrl">Presentation URL (Google Slides, Canva, etc.)</Label>
            <Input id="presentationUrl" type="url" {...form.register('presentationUrl')} placeholder="https://docs.google.com/presentation/..." />
            {form.formState.errors.presentationUrl && <p className="text-sm text-destructive">{form.formState.errors.presentationUrl.message}</p>}
            {state.errors?.presentationUrl && <p className="text-sm text-destructive">{state.errors.presentationUrl.join(', ')}</p>}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="file">Upload Files (e.g., ZIP, PDF)</Label>
            <div className="flex items-center justify-center w-full">
                <label htmlFor="file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <UploadCloudIcon className="w-10 h-10 mb-3 text-muted-foreground" />
                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-muted-foreground">ZIP, PDF, PPTX (MAX. 10MB)</p>
                    </div>
                    <Input id="file" name="file" type="file" className="hidden" onChange={handleFileChange} />
                </label>
            </div>
             {fileName && (
              <div className="mt-2 flex items-center justify-between rounded-md border border-border bg-muted/50 p-2 text-sm">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-5 w-5 text-muted-foreground" />
                  <span className="text-foreground">{fileName}</span>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={removeFile} className="h-6 w-6">
                  <XIcon className="h-4 w-4" />
                </Button>
              </div>
            )}
            {/* {form.formState.errors.file && <p className="text-sm text-destructive">{form.formState.errors.file.message}</p>} */}
            {/* {state.errors?.file && <p className="text-sm text-destructive">{state.errors.file.join(', ')}</p>} */}
            <p className="text-xs text-muted-foreground pt-1">Note: File upload to Firebase Storage would be implemented in a real application.</p>
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
