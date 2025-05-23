import { CreateHackathonForm } from '@/components/hackathons/create-hackathon-form';

export default function CreateHackathonPage() {
  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] flex-col items-center justify-center px-4 py-12 md:px-6">
      <CreateHackathonForm />
    </div>
  );
}
