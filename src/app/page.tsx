import { HackathonCard } from '@/components/hackathons/hackathon-card';
import { mockHackathons } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircleIcon } from 'lucide-react';

export default function DashboardPage() {
  const hackathons = mockHackathons; // In a real app, fetch this data

  return (
    <div className="container mx-auto px-4 py-8 md:px-6">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Discover Hackathons
        </h1>
        <Button asChild>
          <Link href="/hackathons/create">
            <PlusCircleIcon className="mr-2 h-5 w-5" />
            Create Hackathon
          </Link>
        </Button>
      </div>

      {hackathons.length === 0 ? (
        <div className="flex h-[50vh] flex-col items-center justify-center rounded-lg border border-dashed bg-card p-8 text-center">
          <h2 className="text-xl font-semibold text-card-foreground">No Hackathons Yet</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Be the first to create one or check back later!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {hackathons.map((hackathon) => (
            <HackathonCard key={hackathon.id} hackathon={hackathon} />
          ))}
        </div>
      )}
    </div>
  );
}
