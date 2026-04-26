from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime

class OrderItemBase(BaseModel):
    product_id: int
    quantity: int = Field(..., gt=0)
    product_name: str
    price_at_purchase: float = Field(..., gt=0)

class OrderItemCreate(OrderItemBase):
    pass

class OrderItemResponse(OrderItemBase):
    id: int
    order_id: int

    class Config:
        from_attributes = True

class OrderBase(BaseModel):
    customer_name: str = Field(..., min_length=1, max_length=100)
    email: str = Field(..., min_length=1)
    phone: Optional[str] = Field(None, max_length=20)
    delivery_address: str = Field(..., min_length=1)

class OrderCreate(OrderBase):
    items: List[OrderItemBase]

class OrderUpdate(BaseModel):
    status: str = Field(..., pattern="^(NEW|PAID|SHIPPED|CANCELLED)$")

class OrderResponse(OrderBase):
    id: int
    status: str
    total_amount: float
    created_at: datetime
    updated_at: Optional[datetime] = None
    items: List[OrderItemResponse] = []

    class Config:
        from_attributes = True
