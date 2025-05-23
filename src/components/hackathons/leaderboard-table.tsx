import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { LeaderboardEntry } from '@/lib/types';
import { TrophyIcon, AwardIcon, StarIcon } from 'lucide-react';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  hackathonTitle: string;
}

const RankIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <TrophyIcon className="h-5 w-5 text-yellow-500" />;
  if (rank === 2) return <AwardIcon className="h-5 w-5 text-slate-400" />;
  if (rank === 3) return <StarIcon className="h-5 w-5 text-orange-400" />;
  return <span className="font-semibold">{rank}</span>;
};


export function LeaderboardTable({ entries, hackathonTitle }: LeaderboardTableProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Leaderboard</CardTitle>
          <CardDescription>For {hackathonTitle}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">The leaderboard is currently empty. Check back soon!</p>
        </CardContent>
      </Card>
    );
  }
  
  // Sort entries by rank if not already sorted
  const sortedEntries = [...entries].sort((a, b) => a.rank - b.rank);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><TrophyIcon className="h-6 w-6 text-primary" /> Leaderboard</CardTitle>
        <CardDescription>Current standings for {hackathonTitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px] text-center">Rank</TableHead>
              <TableHead>Team Name</TableHead>
              <TableHead className="text-right">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry) => (
              <TableRow key={entry.teamName} className={entry.rank <=3 ? "font-medium" : ""}>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    <RankIcon rank={entry.rank} />
                  </div>
                </TableCell>
                <TableCell>{entry.teamName}</TableCell>
                <TableCell className="text-right font-mono">{entry.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
           {entries.length > 0 && <TableCaption>Leaderboard updated in real-time.</TableCaption>}
        </Table>
      </CardContent>
    </Card>
  );
}
