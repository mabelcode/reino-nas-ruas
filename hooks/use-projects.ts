'use client';

import { useEffect } from 'react';
import { useProjectsStore, fallbackProjects } from '@/stores/projects-store';

export function useProjects() {
  const projects = useProjectsStore((state) => state.projects);
  const fetchProjects = useProjectsStore((state) => state.fetchProjects);

  useEffect(() => {
    if (!projects.length) {
      fetchProjects();
    }
  }, [projects.length, fetchProjects]);

  return projects.length ? projects : fallbackProjects;
}
