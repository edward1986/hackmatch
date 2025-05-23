import type { Hackathon, UserProfile, Team, LeaderboardEntry, AvailableTeammate } from '@/lib/types';

export const mockUserOrganizer: UserProfile = {
  id: 'user-organizer-1',
  name: 'Alice Organizer',
  email: 'alice@example.com',
  role: 'organizer',
};

export const mockUserParticipant: UserProfile = {
  id: 'user-participant-1',
  name: 'Bob Participant',
  email: 'bob@example.com',
  role: 'participant',
  skills: ['React', 'Node.js'],
  interests: ['AI', 'Web Development'],
};

export const mockHackathons: Hackathon[] = [
  {
    id: 'hackathon-1',
    title: 'AI for Good Challenge',
    description: 'Join us to build innovative AI solutions for social impact. A 3-day virtual event focusing on leveraging artificial intelligence to solve real-world problems.',
    organizerName: mockUserOrganizer.name,
    rules: '1. Teams of 1-4. 2. All code must be new. 3. Submissions by Sunday 5 PM.',
    prizes: '1st: $1000, 2nd: $500, 3rd: $250',
    startDate: new Date('2024-08-15T09:00:00Z'),
    endDate: new Date('2024-08-17T17:00:00Z'),
    timelineEvents: [
      { title: 'Kick-off & Theme Announcement', date: new Date('2024-08-15T09:00:00Z'), description: 'Event starts, theme revealed.' },
      { title: 'Mentorship Session 1', date: new Date('2024-08-15T14:00:00Z'), description: 'Get help from mentors.' },
      { title: 'Workshop: Intro to GenAI', date: new Date('2024-08-16T10:00:00Z'), description: 'Learn about generative AI.' },
      { title: 'Submission Deadline', date: new Date('2024-08-17T17:00:00Z'), description: 'Final project submissions due.' },
      { title: 'Judging Period', date: new Date('2024-08-17T17:00:00Z'), description: 'Judges review projects.' },
      { title: 'Winners Announcement', date: new Date('2024-08-17T20:00:00Z'), description: 'Results and closing ceremony.' },
    ],
    status: 'upcoming',
    imageUrl: 'https://placehold.co/600x400.png',
  },
  {
    id: 'hackathon-2',
    title: 'Future of Web Hackathon',
    description: 'Explore the next generation of web technologies. Focus on decentralized apps, WebAssembly, and advanced frontend frameworks.',
    organizerName: 'Tech Events Inc.',
    rules: '1. Be innovative. 2. Open source preferred. 3. Have fun!',
    prizes: 'Swag, exposure, and glory!',
    startDate: new Date('2024-09-01T10:00:00Z'),
    endDate: new Date('2024-09-03T18:00:00Z'),
     timelineEvents: [
      { title: 'Opening Ceremony', date: new Date('2024-09-01T10:00:00Z'), description: 'Welcome and rules overview.' },
      { title: 'Team Formation Mixer', date: new Date('2024-09-01T11:00:00Z'), description: 'Find your teammates.' },
      { title: 'Project Hacking Begins', date: new Date('2024-09-01T12:00:00Z'), description: 'Start building!' },
      { title: 'Final Submissions', date: new Date('2024-09-03T18:00:00Z'), description: 'Submit your amazing projects.' },
    ],
    status: 'active',
    imageUrl: 'https://placehold.co/600x400.png',
  },
   {
    id: 'hackathon-3',
    title: 'Sustainable Tech Sprint',
    description: 'A 24-hour sprint to develop technology solutions for environmental sustainability. Focus on green tech, circular economy, and conservation.',
    organizerName: 'GreenTech Foundation',
    rules: '1. Solutions must address an environmental issue. 2. Max team size 3. All work must be completed within 24 hours.',
    prizes: 'Seed funding for top 3 projects, mentorship from industry experts.',
    startDate: new Date('2024-07-20T12:00:00Z'),
    endDate: new Date('2024-07-21T12:00:00Z'),
     timelineEvents: [
      { title: 'Hackathon Starts', date: new Date('2024-07-20T12:00:00Z'), description: 'The sprint begins!' },
      { title: 'Mid-Point Check-in', date: new Date('2024-07-21T00:00:00Z'), description: 'Progress update and quick feedback.' },
      { title: 'Submission Deadline & Demos', date: new Date('2024-07-21T12:00:00Z'), description: 'End of sprint, project demos.' },
    ],
    status: 'past',
    imageUrl: 'https://placehold.co/600x400.png',
  },
];

export const mockTeams: Team[] = [
  { id: 'team-1', name: 'AI Avengers', hackathonId: 'hackathon-1', members: [{id: 'user-1', name: 'Carol'}, {id: 'user-2', name: 'Dave'}] },
  { id: 'team-2', name: 'Code Wizards', hackathonId: 'hackathon-1', members: [{id: 'user-3', name: 'Eve'}] },
  { id: 'team-3', name: 'Pixel Pioneers', hackathonId: 'hackathon-2', members: [{id: 'user-4', name: 'Frank'}, {id: 'user-5', name: 'Grace'}] },
];

export const mockLeaderboard: LeaderboardEntry[] = [
  { teamName: 'AI Avengers', score: 95, rank: 1 },
  { teamName: 'Code Wizards', score: 92, rank: 2 },
  { teamName: 'Data Dynamos', score: 88, rank: 3 },
  { teamName: 'Bug Busters', score: 85, rank: 4 },
];

export const mockAvailableTeammates: AvailableTeammate[] = [
  { id: 'teammate-1', name: 'Charlie Coder', skills: ['Python', 'Machine Learning', 'Data Analysis'], interests: ['AI', 'Healthcare Tech'], avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'teammate-2', name: 'Diana Designer', skills: ['UI/UX Design', 'Figma', 'Frontend Dev'], interests: ['Web Design', 'Mobile Apps'], avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'teammate-3', name: 'Edward Engineer', skills: ['Java', 'Spring Boot', 'DevOps'], interests: ['Cloud Computing', 'Backend Systems'], avatarUrl: 'https://placehold.co/100x100.png' },
  { id: 'teammate-4', name: 'Fiona Fullstack', skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'], interests: ['EdTech', 'Social Platforms'], avatarUrl: 'https://placehold.co/100x100.png' },
];
