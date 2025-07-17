import { create } from 'zustand';

interface SummaryItem {
  total_received: number;
  total_spent: number;
}

export interface ProjectTotals {
  id: number;
  title: string;
  received: number;
  spent: number;
}

export interface ReportItem {
  id: string;
  title: string;
  type: string;
  date: string;
  size: string;
  fileId: string;
  downloads?: number;
}

interface FinanceState {
  summary: Record<string, SummaryItem> | null;
  years: string[];
  distribution: Record<string, number>;
  projects: ProjectTotals[];
  projectsPages: number;
  reports: ReportItem[];
  reportsPages: number;
  loading: boolean;
  fetchSummary: () => Promise<void>;
  fetchYear: (year: string, projPage?: number, repPage?: number) => Promise<void>;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  summary: null,
  years: [],
  distribution: {},
  projects: [],
  projectsPages: 1,
  reports: [],
  reportsPages: 1,
  loading: false,
  async fetchSummary() {
    try {
      const res = await fetch('/api/finance/summary');
      if (!res.ok) throw new Error('Failed');
      const data = await res.json();
      const years = Object.keys(data.data || {}).sort((a, b) => Number(b) - Number(a));
      set({ summary: data.data, years: years.length ? years : [] });
    } catch {
      set({ summary: null, years: [] });
    }
  },
  async fetchYear(year, projPage = 1, repPage = 1) {
    set({ loading: true });
    try {
      const dist = await fetch(`/api/finance/distribution?year=${year}`);
      const proj = await fetch(`/api/finance/projects?year=${year}&page=${projPage}&limit=4`);
      const rep = await fetch(`/api/financial-reports?year=${year}&page=${repPage}&limit=4`);
      const distData = dist.ok ? (await dist.json()).data : {};
      const projData = proj.ok ? await proj.json() : { data: [], meta: { total_pages: 1 } };
      const repData = rep.ok ? await rep.json() : { data: [], meta: { total_pages: 1 } };
      const mappedReports = (repData.data || []).map((r: any) => ({
        id: r.id,
        title: r.title,
        type: r.type,
        date: r.date,
        size: r.file?.filesize ? `${(Number(r.file.filesize) / 1024).toFixed(0)} KB` : '',
        fileId: r.file?.id ?? '',
        downloads: r.downloads ?? 0,
      }));
      set({
        distribution: distData,
        projects: projData.data || [],
        projectsPages: projData.meta?.total_pages ?? 1,
        reports: mappedReports,
        reportsPages: repData.meta?.total_pages ?? 1,
      });
    } catch {
      set({ distribution: {}, projects: [], projectsPages: 1, reports: [], reportsPages: 1 });
    } finally {
      set({ loading: false });
    }
  },
}));
