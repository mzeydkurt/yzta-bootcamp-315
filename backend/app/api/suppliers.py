from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.supplier import SupplierAnalyzeRequest, SupplierResponse
from app.services.supplier_service import analyze_supplier, get_all_suppliers

router = APIRouter(prefix="/api/suppliers", tags=["suppliers"])


@router.post("/analyze", response_model=SupplierResponse)
def analyze(data: SupplierAnalyzeRequest, db: Session = Depends(get_db)):
    return analyze_supplier(db, data)


@router.get("", response_model=list[SupplierResponse])
def list_suppliers(db: Session = Depends(get_db)):
    return get_all_suppliers(db)
