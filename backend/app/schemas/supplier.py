from datetime import datetime

from pydantic import BaseModel, ConfigDict, Field


class SupplierAnalyzeRequest(BaseModel):
    company_name: str = Field(..., alias="companyName", min_length=1)
    delivery_performance: float = Field(..., alias="deliveryPerformance", ge=0, le=100)
    financial_stability: float = Field(..., alias="financialStability", ge=0, le=100)
    quality_compliance: float = Field(..., alias="qualityCompliance", ge=0, le=100)
    sustainability_score: float = Field(..., alias="sustainabilityScore", ge=0, le=100)
    incident_count: int = Field(..., alias="incidentCount", ge=0)

    model_config = ConfigDict(populate_by_name=True)


class SupplierResponse(BaseModel):
    id: int
    company_name: str = Field(..., alias="companyName")
    delivery_performance: float = Field(..., alias="deliveryPerformance")
    financial_stability: float = Field(..., alias="financialStability")
    quality_compliance: float = Field(..., alias="qualityCompliance")
    sustainability_score: float = Field(..., alias="sustainabilityScore")
    incident_count: int = Field(..., alias="incidentCount")
    risk_score: float = Field(..., alias="riskScore")
    risk_level: str = Field(..., alias="riskLevel")
    ai_explanation: str = Field(..., alias="aiExplanation")
    analyzed_at: datetime = Field(..., alias="analyzedAt")

    model_config = ConfigDict(populate_by_name=True, from_attributes=True)
