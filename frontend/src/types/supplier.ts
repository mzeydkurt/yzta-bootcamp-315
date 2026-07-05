export interface Supplier {
  id: number;
  companyName: string;
  deliveryPerformance: number;
  financialStability: number;
  qualityCompliance: number;
  sustainabilityScore: number;
  incidentCount: number;
  riskScore: number;
  riskLevel: string;
  aiExplanation: string;
  analyzedAt: string;
}

export interface SupplierAnalyzeRequest {
  companyName: string;
  deliveryPerformance: number;
  financialStability: number;
  qualityCompliance: number;
  sustainabilityScore: number;
  incidentCount: number;
}

export interface DashboardStats {
  totalSuppliers: number;
  recentAnalyses: Supplier[];
  averageRiskScore: number;
}
