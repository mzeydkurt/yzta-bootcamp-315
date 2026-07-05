def get_risk_level(risk_score: float) -> str:
    if risk_score >= 70:
        return "Yüksek"
    if risk_score >= 40:
        return "Orta"
    return "Düşük"
