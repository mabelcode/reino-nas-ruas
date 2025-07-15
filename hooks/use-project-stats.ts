'use client';

import { useProjects } from './use-projects';

export function useProjectStats() {
  const projects = useProjects();
  const totals = projects.reduce(
    (acc, project) => {
      acc.kids += project.kids ?? 0;
      acc.young += project.young ?? 0;
      acc.adult += project.adult ?? 0;
      acc.elderly += project.elderly ?? 0;
      if ((project.status ?? '').toLowerCase() === 'em andamento') acc.active += 1;
      return acc;
    },
    { kids: 0, young: 0, adult: 0, elderly: 0, active: 0 }
  );

  const totalPeople = totals.kids + totals.young + totals.adult + totals.elderly;

  return {
    totalKids: totals.kids,
    totalYoung: totals.young,
    totalAdult: totals.adult,
    totalElderly: totals.elderly,
    totalPeople,
    activeProjects: totals.active
  };
}
