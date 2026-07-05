import { useState } from 'react';
import { SupplierForm } from '../components/SupplierForm';
import { RiskBadge } from '../components/RiskBadge';
import { analyzeSupplier } from '../services/api';
import type { Supplier, SupplierAnalyzeRequest } from '../types/supplier';

export function SupplierAnalysis() {
  const [result, setResult] = useState<Supplier | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (data: SupplierAnalyzeRequest) => {
    setIsSubmitting(true);
    setError(null);
    try {
      const supplier = await analyzeSupplier(data);
      setResult(supplier);
    } catch {
      setError('Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold text-slate-900">Tedarikçi Analizi</h2>
        <p className="text-sm text-slate-500">
          Tedarikçi bilgilerini girerek risk skorunu ve AI yorumunu görüntüleyin
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SupplierForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-sm font-medium text-slate-700">Analiz Sonucu</h3>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

          {!result && !error && (
            <p className="mt-3 text-sm text-slate-400">
              Sonuçları görmek için formu doldurup "Analizi Başlat" butonuna tıklayın.
            </p>
          )}

          {result && (
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold text-slate-900">{result.companyName}</span>
                <RiskBadge riskLevel={result.riskLevel} />
              </div>
              <div>
                <p className="text-sm text-slate-500">Risk Skoru</p>
                <p className="text-3xl font-semibold text-slate-900">{result.riskScore.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-500">AI Yorumu</p>
                <p className="mt-1 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                  {result.aiExplanation}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
