import type { DashboardStats, Supplier, SupplierAnalyzeRequest } from '../types/supplier';

const API_BASE_URL = 'http://localhost:8000/api';

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API isteği başarısız oldu: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchDashboardStats(): Promise<DashboardStats> {
  return request<DashboardStats>('/dashboard');
}

export function fetchSuppliers(): Promise<Supplier[]> {
  return request<Supplier[]>('/suppliers');
}

export function analyzeSupplier(data: SupplierAnalyzeRequest): Promise<Supplier> {
  return request<Supplier>('/suppliers/analyze', {
    method: 'POST',
    body: JSON.stringify(data),
  });
}
