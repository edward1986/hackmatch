import { TeamMatchmakingForm } from '@/components/teams/team-matchmaking-form';
import { mockHackathons } from '@/lib/mock-data'; // For hackathon description
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface TeamMatchmakingPageProps {
  params: { id: string };
}

// In a real app, fetch this data
async function getHackathonData(id: string): Promise<{ description: string; title: string } | null> {
  await new Promise(resolve => setTimeout(resolve, 100)); // Simulate network delay
  const hackathon = mockHackathons.find(h => h.id === id);
  return hackathon ? { description: hackathon.description, title: hackathon.title } : null;
}

export default async function MatchmakingPage({ params }: TeamMatchmakingPageProps) {
  const hackathonData = await getHackathonData(params.id);

  if (!hackathonData) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 text-center md:px-6">
        <div>
          <h1 className="text-3xl font-bold">Hackathon Not Found</h1>
          <p className="mt-2 text-muted-foreground">Cannot perform team matchmaking for a non-existent hackathon.</p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Hackathons</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
       <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Find Your Dream Team
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            For Hackathon: <span className="font-semibold text-primary">{hackathonData.title}</span>
          </p>
        </div>
      <TeamMatchmakingForm hackathonId={params.id} hackathonDescription={hackathonData.description} />
    </div>
  );
}
