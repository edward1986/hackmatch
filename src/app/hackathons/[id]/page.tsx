import { mockHackathons, mockUserParticipant } from '@/lib/mock-data'; // Using mock data
import type { Hackathon } from '@/lib/types';
import { HackathonTimeline } from '@/components/hackathons/hackathon-timeline';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRightIcon, UsersIcon, TrophyIcon, CalendarDaysIcon, FileTextIcon, ListChecksIcon, LightbulbIcon } from 'lucide-react';

interface HackathonDetailPageProps {
  params: { id: string };
}

// In a real app, this would fetch data based on params.id
async function getHackathonDetails(id: string): Promise<Hackathon | undefined> {
  await new Promise(resolve => setTimeout(resolve, 200)); // Simulate network delay
  return mockHackathons.find(h => h.id === id);
}

export default async function HackathonDetailPage({ params }: HackathonDetailPageProps) {
  const hackathon = await getHackathonDetails(params.id);

  if (!hackathon) {
    return (
      <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 text-center md:px-6">
        <div>
          <h1 className="text-3xl font-bold">Hackathon Not Found</h1>
          <p className="mt-2 text-muted-foreground">The hackathon you are looking for does not exist or has been moved.</p>
          <Button asChild className="mt-6">
            <Link href="/">Back to Hackathons</Link>
          </Button>
        </div>
      </div>
    );
  }
  
  const isParticipant = true; // Assume user is a participant for now
  const hackathonActive = hackathon.status === 'active';

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:py-12">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <Card className="overflow-hidden">
            {hackathon.imageUrl && (
              <div className="relative h-64 w-full md:h-80 lg:h-96">
                <Image
                  src={hackathon.imageUrl}
                  alt={hackathon.title}
                  layout="fill"
                  objectFit="cover"
                  priority
                  data-ai-hint="hackathon detail banner"
                />
              </div>
            )}
            <CardHeader className="border-b">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <CardTitle className="text-3xl font-extrabold tracking-tight md:text-4xl">{hackathon.title}</CardTitle>
                <Badge variant={hackathon.status === 'active' ? 'default' : hackathon.status === 'upcoming' ? 'secondary' : 'outline'} className="capitalize text-sm px-3 py-1 mt-1 sm:mt-0 self-start">
                  {hackathon.status}
                </Badge>
              </div>
              <CardDescription className="mt-2 text-base text-muted-foreground">
                Organized by: {hackathon.organizerName}
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-foreground/80 leading-relaxed">{hackathon.description}</p>
              </div>
              <Separator />
              <div>
                <h2 className="text-xl font-semibold mb-2">Rules</h2>
                <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{hackathon.rules}</p>
              </div>
              <Separator />
              <div>
                <h2 className="text-xl font-semibold mb-2">Prizes</h2>
                <p className="text-foreground/80 whitespace-pre-line leading-relaxed">{hackathon.prizes}</p>
              </div>
            </CardContent>
          </Card>
          
          <HackathonTimeline hackathon={hackathon} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><CalendarDaysIcon className="h-5 w-5 text-primary" /> Key Dates</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><strong>Starts:</strong> {new Date(hackathon.startDate).toLocaleString()}</p>
              <p><strong>Ends:</strong> {new Date(hackathon.endDate).toLocaleString()}</p>
            </CardContent>
          </Card>

          {isParticipant && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><UsersIcon className="h-5 w-5 text-primary" /> Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full justify-start gap-2" variant="outline" disabled={!hackathonActive}>
                  <Link href={`/hackathons/${hackathon.id}/submit`}>
                    <FileTextIcon className="h-4 w-4" /> Submit Project
                  </Link>
                </Button>
                <Button asChild className="w-full justify-start gap-2" variant="outline" disabled={!hackathonActive}>
                  <Link href={`/hackathons/${hackathon.id}/matchmaking`}>
                    <LightbulbIcon className="h-4 w-4" /> Find Teammates
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
               <CardTitle className="flex items-center gap-2"><ListChecksIcon className="h-5 w-5 text-primary" /> Results</CardTitle>
            </CardHeader>
            <CardContent>
               <Button asChild className="w-full justify-start gap-2" variant="outline">
                  <Link href={`/hackathons/${hackathon.id}/leaderboard`}>
                    <TrophyIcon className="h-4 w-4" /> View Leaderboard
                  </Link>
                </Button>
            </CardContent>
          </Card>

          {!isParticipant && hackathon.status === 'upcoming' && (
             <Button size="lg" className="w-full">Register for Hackathon</Button>
          )}
        </div>
      </div>
    </div>
  );
}
