import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { SupplierAnalysis } from './pages/SupplierAnalysis';
import { SupplierList } from './pages/SupplierList';

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />
        <main className="flex-1 p-8">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/analiz" element={<SupplierAnalysis />} />
            <Route path="/tedarikciler" element={<SupplierList />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
