import { ProjectSubmissionForm } from '@/components/projects/project-submission-form';
import { mockHackathons } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ProjectSubmissionPageProps {
  params: { id: string };
}

async function getHackathonTitle(id: string): Promise<string | null> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate fetch
  const hackathon = mockHackathons.find(h => h.id === id);
  return hackathon ? hackathon.title : null;
}


export default async function SubmitProjectPage({ params }: ProjectSubmissionPageProps) {
  const hackathonTitle = await getHackathonTitle(params.id);

  if (!hackathonTitle) {
     return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 text-center md:px-6">
        <div>
          <h1 className="text-3xl font-bold">Hackathon Not Found</h1>
          <p className="mt-2 text-muted-foreground">Cannot submit project for a non-existent hackathon.</p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Hackathons</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-12 md:px-6">
      <div className="mb-6 text-center">
          <h2 className="text-2xl font-semibold">Submit Project for: {hackathonTitle}</h2>
      </div>
      <ProjectSubmissionForm hackathonId={params.id} />
    </div>
  );
}
