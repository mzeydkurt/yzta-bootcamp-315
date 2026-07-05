import type { Supplier } from '../types/supplier';
import { RiskBadge } from './RiskBadge';

interface SupplierTableProps {
  suppliers: Supplier[];
}

export function SupplierTable({ suppliers }: SupplierTableProps) {
  if (suppliers.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 shadow-sm">
        Henüz analiz edilmiş bir tedarikçi bulunmuyor.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Firma</th>
            <th className="px-4 py-3 font-medium">Risk Skoru</th>
            <th className="px-4 py-3 font-medium">Risk Seviyesi</th>
            <th className="px-4 py-3 font-medium">Analiz Tarihi</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier) => (
            <tr key={supplier.id} className="border-b border-slate-100 last:border-0">
              <td className="px-4 py-3 font-medium text-slate-900">{supplier.companyName}</td>
              <td className="px-4 py-3 text-slate-700">{supplier.riskScore.toFixed(2)}</td>
              <td className="px-4 py-3">
                <RiskBadge riskLevel={supplier.riskLevel} />
              </td>
              <td className="px-4 py-3 text-slate-500">
                {new Date(supplier.analyzedAt).toLocaleString('tr-TR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
