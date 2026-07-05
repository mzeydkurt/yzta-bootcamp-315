"""
Placeholder AI explanation service.

This module generates rule-based Turkish explanations for Sprint 1.
The `generate_explanation` signature (structured supplier data + risk score in,
plain-text explanation out) is designed so a real LLM call can be dropped in
later without changing any caller of this service.
"""

from app.schemas.supplier import SupplierAnalyzeRequest
from app.utils.risk_level import get_risk_level


def generate_explanation(data: SupplierAnalyzeRequest, risk_score: float) -> str:
    risk_level = get_risk_level(risk_score)
    reasons: list[str] = []

    if data.delivery_performance < 50:
        reasons.append("teslimat performansı düşük")
    if data.financial_stability < 50:
        reasons.append("finansal istikrarı zayıf")
    if data.quality_compliance < 50:
        reasons.append("kalite uyumluluğu yetersiz")
    if data.sustainability_score < 50:
        reasons.append("sürdürülebilirlik skoru düşük")
    if data.incident_count > 5:
        reasons.append("geçmiş olay sayısı yüksek")

    if not reasons:
        return (
            f"{data.company_name} tedarikçisi genel olarak dengeli bir performans "
            f"sergilemektedir. Risk seviyesi '{risk_level}' olarak hesaplanmıştır."
        )

    reason_text = ", ".join(reasons)
    return (
        f"{data.company_name} tedarikçisinin {reason_text} nedeniyle risk seviyesi "
        f"'{risk_level}' olarak belirlenmiştir."
    )
