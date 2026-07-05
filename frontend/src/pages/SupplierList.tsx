import { useEffect, useState } from 'react';
import { fetchSuppliers } from '../services/api';
import type { Supplier } from '../types/supplier';
import { SupplierTable } from '../components/SupplierTable';

export function SupplierList() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchSuppliers()
      .then(setSuppliers)
      .catch(() => setError('Tedarikçi listesi yüklenemedi.'))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Tedarikçi Listesi</h2>
        <p className="text-sm text-slate-500">Daha önce analiz edilen tüm tedarikçiler</p>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
      {!isLoading && <SupplierTable suppliers={suppliers} />}
    </div>
  );
}
