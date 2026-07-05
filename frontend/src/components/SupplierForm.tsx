import { useState } from 'react';
import type { SupplierAnalyzeRequest } from '../types/supplier';

interface SupplierFormProps {
  onSubmit: (data: SupplierAnalyzeRequest) => void;
  isSubmitting: boolean;
}

const initialState: SupplierAnalyzeRequest = {
  companyName: '',
  deliveryPerformance: 50,
  financialStability: 50,
  qualityCompliance: 50,
  sustainabilityScore: 50,
  incidentCount: 0,
};

export function SupplierForm({ onSubmit, isSubmitting }: SupplierFormProps) {
  const [formData, setFormData] = useState<SupplierAnalyzeRequest>(initialState);

  const handleChange = (field: keyof SupplierAnalyzeRequest, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'companyName' ? value : Number(value),
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <label className="block text-sm font-medium text-slate-700">Firma Adı</label>
        <input
          type="text"
          required
          value={formData.companyName}
          onChange={(e) => handleChange('companyName', e.target.value)}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
          placeholder="Örn: Acme Tedarik A.Ş."
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <NumberField
          label="Teslimat Performansı (0-100)"
          value={formData.deliveryPerformance}
          onChange={(v) => handleChange('deliveryPerformance', v)}
        />
        <NumberField
          label="Finansal İstikrar (0-100)"
          value={formData.financialStability}
          onChange={(v) => handleChange('financialStability', v)}
        />
        <NumberField
          label="Kalite Uyumluluğu (0-100)"
          value={formData.qualityCompliance}
          onChange={(v) => handleChange('qualityCompliance', v)}
        />
        <NumberField
          label="Sürdürülebilirlik Skoru (0-100)"
          value={formData.sustainabilityScore}
          onChange={(v) => handleChange('sustainabilityScore', v)}
        />
        <NumberField
          label="Olay Sayısı"
          value={formData.incidentCount}
          onChange={(v) => handleChange('incidentCount', v)}
          min={0}
          max={undefined}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isSubmitting ? 'Analiz Ediliyor...' : 'Analizi Başlat'}
      </button>
    </form>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: string) => void;
  min?: number;
  max?: number;
}

function NumberField({ label, value, onChange, min = 0, max = 100 }: NumberFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-700">{label}</label>
      <input
        type="number"
        required
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-500 focus:outline-none"
      />
    </div>
  );
}
