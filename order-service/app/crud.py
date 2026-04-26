from sqlalchemy.orm import Session
from app.models import Order, OrderItem
from app.schemas import OrderCreate, OrderUpdate
from typing import List, Optional

def get_orders(db: Session, skip: int = 0, limit: int = 20, status: Optional[str] = None):
    query = db.query(Order)
    if status:
        query = query.filter(Order.status == status)
    return query.order_by(Order.created_at.desc()).offset(skip).limit(limit).all()

def get_order(db: Session, order_id: int):
    return db.query(Order).filter(Order.id == order_id).first()

def create_order(db: Session, order: OrderCreate):
    total = sum(item.quantity * item.price_at_purchase for item in order.items)
    
    db_order = Order(
        customer_name=order.customer_name,
        email=order.email,
        phone=order.phone,
        delivery_address=order.delivery_address,
        status="NEW",
        total_amount=total
    )
    db.add(db_order)
    db.flush()
    
    for item in order.items:
        db_item = OrderItem(
            order_id=db_order.id,
            product_id=item.product_id,
            product_name=item.product_name,
            quantity=item.quantity,
            price_at_purchase=item.price_at_purchase
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(db_order)
    return db_order

def update_order_status(db: Session, order_id: int, status: str):
    db_order = db.query(Order).filter(Order.id == order_id).first()
    if db_order:
        db_order.status = status
        db.commit()
        db.refresh(db_order)
    return db_order
