from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from app.database import engine, get_db, Base
from app import crud, schemas
from app.auth import get_current_admin
from fastapi.middleware.cors import CORSMiddleware

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Product Service", description="Микросервис управления товарами")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/products", response_model=List[schemas.ProductResponse])
def list_products(
    page: int = Query(1, ge=1),
    limit: int = Query(20, ge=1, le=100),
    category: Optional[str] = None,
    db: Session = Depends(get_db)
):
    skip = (page - 1) * limit
    products = crud.get_products(db, skip=skip, limit=limit, category=category)
    return products

@app.get("/api/products/{product_id}", response_model=schemas.ProductResponse)
def get_product(product_id: int, db: Session = Depends(get_db)):
    product = crud.get_product(db, product_id)
    if not product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return product

@app.post("/api/products", response_model=schemas.ProductResponse)
def create_product(
    product: schemas.ProductCreate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    existing = crud.get_product_by_sku(db, product.sku)
    if existing:
        raise HTTPException(status_code=400, detail="Товар с таким артикулом уже существует")
    return crud.create_product(db, product)

@app.put("/api/products/{product_id}", response_model=schemas.ProductResponse)
def update_product(
    product_id: int,
    product: schemas.ProductUpdate,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    db_product = crud.update_product(db, product_id, product)
    if not db_product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return db_product

@app.delete("/api/products/{product_id}", response_model=schemas.ProductResponse)
def delete_product(
    product_id: int,
    db: Session = Depends(get_db),
    admin: dict = Depends(get_current_admin)
):
    db_product = crud.delete_product(db, product_id)
    if not db_product:
        raise HTTPException(status_code=404, detail="Товар не найден")
    return db_product
