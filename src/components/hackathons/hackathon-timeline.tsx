import type { Hackathon } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2Icon, CalendarClockIcon } from 'lucide-react';

interface HackathonTimelineProps {
  hackathon: Pick<Hackathon, 'timelineEvents' | 'startDate' | 'endDate'>;
}

export function HackathonTimeline({ hackathon }: HackathonTimelineProps) {
  if (!hackathon.timelineEvents || hackathon.timelineEvents.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">No timeline events specified for this hackathon.</p>
          <p className="mt-2 text-sm">
            Starts: {new Date(hackathon.startDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
          </p>
          <p className="text-sm">
            Ends: {new Date(hackathon.endDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })}
          </p>
        </CardContent>
      </Card>
    );
  }

  const sortedEvents = [...hackathon.timelineEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const now = new Date();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hackathon Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative pl-6">
          {/* Vertical line */}
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border ml-[calc(0.5rem-1px)]" />

          {sortedEvents.map((event, index) => {
            const eventDate = new Date(event.date);
            const isPast = eventDate < now;
            return (
              <div key={index} className="relative mb-8 pl-4">
                {/* Dot on the line */}
                <div className={`absolute -left-[calc(1.125rem+1px)] top-1 flex h-5 w-5 items-center justify-center rounded-full ${isPast ? 'bg-primary' : 'bg-muted-foreground/50'}`}>
                  {isPast ? <CheckCircle2Icon className="h-3 w-3 text-primary-foreground" /> : <CalendarClockIcon className="h-3 w-3 text-background" />}
                </div>
                <p className={`font-semibold ${isPast ? 'text-primary' : 'text-foreground'}`}>{event.title}</p>
                <p className="text-xs text-muted-foreground">
                  {eventDate.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
                </p>
                <p className="mt-1 text-sm text-foreground/80">{event.description}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
