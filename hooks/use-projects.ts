'use client';

import { useProjectsStore } from '@/stores/projects-store';

export function useProjects() {
  const projects = useProjectsStore((state) => state.projects);
  return projects;
}
