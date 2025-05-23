import { LeaderboardTable } from '@/components/hackathons/leaderboard-table';
import { mockLeaderboard, mockHackathons } from '@/lib/mock-data'; // Using mock data
import type { LeaderboardEntry } from '@/lib/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface LeaderboardPageProps {
  params: { id: string };
}

// In a real app, this would fetch data based on params.id
async function getLeaderboardData(hackathonId: string): Promise<{ entries: LeaderboardEntry[]; hackathonTitle: string | null }> {
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  const hackathon = mockHackathons.find(h => h.id === hackathonId);
  // For now, returning the global mockLeaderboard, filtered/specific data would be fetched in real app
  return { entries: mockLeaderboard, hackathonTitle: hackathon ? hackathon.title : "this hackathon" };
}

export default async function LeaderboardPage({ params }: LeaderboardPageProps) {
  const { entries, hackathonTitle } = await getLeaderboardData(params.id);

  if (!hackathonTitle) {
     return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 text-center md:px-6">
        <div>
          <h1 className="text-3xl font-bold">Hackathon Not Found</h1>
          <p className="mt-2 text-muted-foreground">Cannot display leaderboard for a non-existent hackathon.</p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Hackathons</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="mx-auto max-w-3xl">
        <LeaderboardTable entries={entries} hackathonTitle={hackathonTitle} />
      </div>
    </div>
  );
}
