import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Gösterge Paneli' },
  { to: '/analiz', label: 'Tedarikçi Analizi' },
  { to: '/tedarikciler', label: 'Tedarikçi Listesi' },
];

export function Sidebar() {
  return (
    <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
      <div className="px-6 py-5">
        <h1 className="text-lg font-semibold text-slate-900">AI Procurement Copilot</h1>
        <p className="text-xs text-slate-500">Tedarikçi Karar Destek Sistemi</p>
      </div>
      <nav className="flex flex-col gap-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
