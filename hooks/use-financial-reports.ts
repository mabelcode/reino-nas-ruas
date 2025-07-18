import { useState, useEffect } from 'react';

interface FinancialReport {
  id: string;
  title: string;
  type: string;
  date: string;
  notes: string;
  file: {
    id: string;
    filesize: string;
  };
}

export function useFinancialReports() {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/financial-reports');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar relatórios');
        }

        const data = await response.json();
        setReports(data.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  return { reports, loading, error };
} 