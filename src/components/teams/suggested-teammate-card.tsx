import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { AvailableTeammate } from '@/lib/types';
import { UserCircle2Icon, SparklesIcon, MessageSquareIcon } from 'lucide-react';

interface SuggestedTeammateCardProps {
  teammate: AvailableTeammate;
}

export function SuggestedTeammateCard({ teammate }: SuggestedTeammateCardProps) {
  return (
    <Card className="overflow-hidden shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        {teammate.avatarUrl ? (
          <Image
            src={teammate.avatarUrl}
            alt={teammate.name}
            width={64}
            height={64}
            className="rounded-full"
            data-ai-hint="person avatar"
          />
        ) : (
          <UserCircle2Icon className="h-16 w-16 rounded-full text-muted-foreground" />
        )}
        <div>
          <CardTitle className="text-lg font-semibold">{teammate.name}</CardTitle>
          <CardDescription className="text-xs text-muted-foreground">Potential Teammate</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="mb-3">
          <h4 className="mb-1 text-sm font-medium text-foreground">Skills:</h4>
          <div className="flex flex-wrap gap-1">
            {teammate.skills.slice(0, 5).map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">{skill}</Badge>
            ))}
            {teammate.skills.length > 5 && <Badge variant="secondary" className="text-xs">+{teammate.skills.length - 5} more</Badge>}
          </div>
        </div>
        <div>
          <h4 className="mb-1 text-sm font-medium text-foreground">Interests:</h4>
          <div className="flex flex-wrap gap-1">
            {teammate.interests.slice(0, 5).map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs">{interest}</Badge>
            ))}
             {teammate.interests.length > 5 && <Badge variant="outline" className="text-xs">+{teammate.interests.length - 5} more</Badge>}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4">
        {/* Placeholder for contact/invite action */}
        <Button className="w-full" size="sm">
          <MessageSquareIcon className="mr-2 h-4 w-4" /> Connect
        </Button>
      </CardFooter>
    </Card>
  );
}
