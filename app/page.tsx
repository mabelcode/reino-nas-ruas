import { HeroSection } from '@/components/home/HeroSection';
import { MissionSection } from '@/components/home/MissionSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { PartnersShowcase } from '@/components/home/PartnersShowcase';
import { EventsSection } from '@/components/home/EventsSection';
import { DonationCTA } from '@/components/home/DonationCTA';
import { WhatsAppButton } from '@/components/WhatsAppButton';

export default function Home() {

  return (
    <>
      <title>Reino nas Ruas</title>
      <div className="min-h-screen">
        <HeroSection />
        <MissionSection />
        <ProjectsSection />
        <StatsSection />
        <PartnersShowcase />
        <EventsSection />
        <DonationCTA />
        <WhatsAppButton fixed color="#25D366" />
      </div>
    </>
  );
}