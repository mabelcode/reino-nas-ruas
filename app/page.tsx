import { HeroSection } from '@/components/home/HeroSection';
import { MissionSection } from '@/components/home/MissionSection';
import { FeaturedActivitiesSection } from '@/components/home/FeaturedActivitiesSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { PartnersShowcase } from '@/components/home/PartnersShowcase';
import { EventsSection } from '@/components/home/EventsSection';
import { DonationCTA } from '@/components/home/DonationCTA';

export default async function Home() {

  return (
    <div className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <FeaturedActivitiesSection />
      <ProjectsSection />
      <StatsSection />
      <PartnersShowcase />
      <EventsSection />
      <DonationCTA />
    </div>
  );
}