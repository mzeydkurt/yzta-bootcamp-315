from app.schemas.supplier import SupplierAnalyzeRequest


def calculate_risk_score(data: SupplierAnalyzeRequest) -> float:
    average_performance = (
        data.delivery_performance
        + data.financial_stability
        + data.quality_compliance
        + data.sustainability_score
    ) / 4

    risk_score = (100 - average_performance) + (data.incident_count * 2)

    return round(max(0.0, min(100.0, risk_score)), 2)
