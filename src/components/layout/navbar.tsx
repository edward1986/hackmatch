import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MountainIcon, UserCircle2Icon } from 'lucide-react';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <MountainIcon className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold text-foreground">HackMatch</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/"
            className="text-foreground/70 transition-colors hover:text-foreground"
            prefetch={false}
          >
            Hackathons
          </Link>
          <Link
            href="/hackathons/create"
            className="text-foreground/70 transition-colors hover:text-foreground"
            prefetch={false}
          >
            Create Hackathon
          </Link>
        </nav>
        <div className="flex items-center gap-4">
           {/* Placeholder for user authentication - a real app would have login/logout logic here */}
          <Button variant="ghost" size="icon" aria-label="User Profile">
            <UserCircle2Icon className="h-6 w-6" />
          </Button>
          <Link href="/hackathons/create" className="md:hidden">
            <Button size="sm">Create</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
