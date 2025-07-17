'use client';

import { useEffect } from 'react';
import { useFinanceStore } from '@/stores/finance-store';

export function useFinance(year: string, projPage = 1, repPage = 1) {
  const fetchSummary = useFinanceStore((s) => s.fetchSummary);
  const fetchYear = useFinanceStore((s) => s.fetchYear);
  const summary = useFinanceStore((s) => s.summary);
  const years = useFinanceStore((s) => s.years);
  const distribution = useFinanceStore((s) => s.distribution);
  const projects = useFinanceStore((s) => s.projects);
  const projectsPages = useFinanceStore((s) => s.projectsPages);
  const reports = useFinanceStore((s) => s.reports);
  const reportsPages = useFinanceStore((s) => s.reportsPages);
  const loading = useFinanceStore((s) => s.loading);

  useEffect(() => {
    if (!summary) {
      fetchSummary();
    }
  }, [summary, fetchSummary]);

  useEffect(() => {
    if (year) {
      fetchYear(year, projPage, repPage);
    }
  }, [year, projPage, repPage, fetchYear]);

  return {
    summary,
    years,
    distribution,
    projects,
    projectsPages,
    reports,
    reportsPages,
    loading,
  };
}
