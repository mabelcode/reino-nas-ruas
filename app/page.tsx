'use client';

import { HeroSection } from '@/components/home/HeroSection';
import { MissionSection } from '@/components/home/MissionSection';
import { FeaturedActivitiesSection } from '@/components/home/FeaturedActivitiesSection';
import { ProjectsSection } from '@/components/home/ProjectsSection';
import { StatsSection } from '@/components/home/StatsSection';
import { EventsSection } from '@/components/home/EventsSection';
import { DonationCTA } from '@/components/home/DonationCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <MissionSection />
      <FeaturedActivitiesSection />
      <ProjectsSection />
      <StatsSection />
      <EventsSection />
      <DonationCTA />
    </div>
  );
}