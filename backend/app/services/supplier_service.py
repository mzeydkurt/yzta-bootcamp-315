from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.supplier import Supplier
from app.schemas.supplier import SupplierAnalyzeRequest
from app.services.ai_explanation import generate_explanation
from app.services.risk_calculator import calculate_risk_score
from app.utils.risk_level import get_risk_level


def analyze_supplier(db: Session, data: SupplierAnalyzeRequest) -> Supplier:
    risk_score = calculate_risk_score(data)
    risk_level = get_risk_level(risk_score)
    ai_explanation = generate_explanation(data, risk_score)

    supplier = Supplier(
        company_name=data.company_name,
        delivery_performance=data.delivery_performance,
        financial_stability=data.financial_stability,
        quality_compliance=data.quality_compliance,
        sustainability_score=data.sustainability_score,
        incident_count=data.incident_count,
        risk_score=risk_score,
        risk_level=risk_level,
        ai_explanation=ai_explanation,
    )

    db.add(supplier)
    db.commit()
    db.refresh(supplier)
    return supplier


def get_all_suppliers(db: Session) -> list[Supplier]:
    return db.query(Supplier).order_by(Supplier.analyzed_at.desc()).all()


def get_dashboard_stats(db: Session) -> dict:
    total_suppliers = db.query(func.count(Supplier.id)).scalar() or 0
    average_risk_score = db.query(func.avg(Supplier.risk_score)).scalar() or 0.0
    recent_analyses = (
        db.query(Supplier).order_by(Supplier.analyzed_at.desc()).limit(5).all()
    )

    return {
        "total_suppliers": total_suppliers,
        "recent_analyses": recent_analyses,
        "average_risk_score": round(average_risk_score, 2),
    }
