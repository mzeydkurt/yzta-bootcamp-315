import { useEffect, useState } from 'react';
import { fetchDashboardStats } from '../services/api';
import type { DashboardStats } from '../types/supplier';
import { StatCard } from '../components/StatCard';
import { SupplierTable } from '../components/SupplierTable';

export function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardStats()
      .then(setStats)
      .catch(() => setError('Gösterge paneli verileri yüklenemedi.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Gösterge Paneli</h2>
        <p className="text-sm text-slate-500">Tedarikçi analizlerinize genel bakış</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      {!isLoading && stats && (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <StatCard label="Toplam Tedarikçi" value={stats.totalSuppliers} />
            <StatCard label="Son Analizler" value={stats.recentAnalyses.length} />
            <StatCard label="Ortalama Risk Skoru" value={stats.averageRiskScore.toFixed(2)} />
          </div>

          <div>
            <h3 className="mb-3 text-sm font-medium text-slate-700">Son Analizler</h3>
            <SupplierTable suppliers={stats.recentAnalyses} />
          </div>
        </>
      )}
    </div>
  );
}
