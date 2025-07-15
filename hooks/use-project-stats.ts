'use client';

import { useProjects } from './use-projects';

export function useProjectStats() {
  const projects = useProjects();
  const totalKids = projects.reduce((sum, project) => sum + (project.kids ?? 0), 0);
  const activeProjects = projects.filter(p => (p.status ?? '').toLowerCase() === 'em andamento').length;
  return { totalKids, activeProjects };
}
