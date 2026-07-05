from pydantic import BaseModel, ConfigDict, Field

from app.schemas.supplier import SupplierResponse


class DashboardResponse(BaseModel):
    total_suppliers: int = Field(..., alias="totalSuppliers")
    recent_analyses: list[SupplierResponse] = Field(..., alias="recentAnalyses")
    average_risk_score: float = Field(..., alias="averageRiskScore")

    model_config = ConfigDict(populate_by_name=True)
