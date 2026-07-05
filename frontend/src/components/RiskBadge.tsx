interface RiskBadgeProps {
  riskLevel: string;
}

const riskLevelStyles: Record<string, string> = {
  Düşük: 'bg-green-100 text-green-700',
  Orta: 'bg-yellow-100 text-yellow-700',
  Yüksek: 'bg-red-100 text-red-700',
};

export function RiskBadge({ riskLevel }: RiskBadgeProps) {
  const style = riskLevelStyles[riskLevel] ?? 'bg-slate-100 text-slate-700';

  return (
    <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${style}`}>
      {riskLevel}
    </span>
  );
}
