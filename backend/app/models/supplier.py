from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.sql import func

from app.database.session import Base


class Supplier(Base):
    __tablename__ = "suppliers"

    id = Column(Integer, primary_key=True, index=True)
    company_name = Column(String, nullable=False)

    delivery_performance = Column(Float, nullable=False)
    financial_stability = Column(Float, nullable=False)
    quality_compliance = Column(Float, nullable=False)
    sustainability_score = Column(Float, nullable=False)
    incident_count = Column(Integer, nullable=False)

    risk_score = Column(Float, nullable=False)
    risk_level = Column(String, nullable=False)
    ai_explanation = Column(String, nullable=False)

    analyzed_at = Column(DateTime(timezone=True), server_default=func.now())
