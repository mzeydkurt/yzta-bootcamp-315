from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import dashboard, suppliers
from app.database.session import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Procurement Copilot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard.router)
app.include_router(suppliers.router)


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
