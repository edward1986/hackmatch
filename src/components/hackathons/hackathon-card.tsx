import Image from 'next/image';
import Link from 'next/link';
import type { Hackathon } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CalendarDaysIcon, UsersIcon, TrophyIcon } from 'lucide-react';

interface HackathonCardProps {
  hackathon: Hackathon;
}

export function HackathonCard({ hackathon }: HackathonCardProps) {
  const formatDate = (date: Date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <Card className="flex h-full flex-col overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
      {hackathon.imageUrl && (
         <div className="relative h-48 w-full">
            <Image
              src={hackathon.imageUrl}
              alt={hackathon.title}
              layout="fill"
              objectFit="cover"
              data-ai-hint="hackathon event banner"
            />
         </div>
      )}
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold leading-tight tracking-tight md:text-2xl">{hackathon.title}</CardTitle>
          <Badge variant={hackathon.status === 'active' ? 'default' : hackathon.status === 'upcoming' ? 'secondary' : 'outline'} className="capitalize">
            {hackathon.status}
          </Badge>
        </div>
        <CardDescription className="mt-1 text-sm text-muted-foreground">
          Organized by: {hackathon.organizerName}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="mb-4 line-clamp-3 text-sm text-foreground/80">{hackathon.description}</p>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CalendarDaysIcon className="h-4 w-4" />
            <span>{formatDate(hackathon.startDate)} - {formatDate(hackathon.endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <TrophyIcon className="h-4 w-4" />
            <span>Prizes: {hackathon.prizes.substring(0,30)}{hackathon.prizes.length > 30 ? "..." : ""}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild className="w-full" variant="default">
          <Link href={`/hackathons/${hackathon.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
