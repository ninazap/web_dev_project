from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import engine, get_db, Base
from app import crud, schemas
from app.auth import get_current_admin
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Order Service", description="Микросервис управления заказами")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/orders", response_model=schemas.OrderResponse)
def create_order(order: schemas.OrderCreate, db: Session = Depends(get_db)):
    if not order.items:
        raise HTTPException(status_code=400, detail="Заказ должен содержать хотя бы один товар")
    return crud.create_order(db, order)

@app.get("/api/orders/{order_id}", response_model=schemas.OrderResponse)
def get_order(order_id: int, db: Session = Depends(get_db)):
    order = crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    return order

@app.get("/api/orders", response_model=List[schemas.OrderResponse])
def list_orders(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    status: Optional[str] = None,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    skip = (page - 1) * limit
    return crud.get_orders(db, skip=skip, limit=limit, status=status)

@app.patch("/api/orders/{order_id}/status", response_model=schemas.OrderResponse)
def update_order_status(
    order_id: int,
    status_update: schemas.OrderUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    order = crud.get_order(db, order_id)
    if not order:
        raise HTTPException(status_code=404, detail="Заказ не найден")
    return crud.update_order_status(db, order_id, status_update.status)
