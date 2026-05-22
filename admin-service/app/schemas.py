from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime

class AdminLogin(BaseModel):
    login: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str = "bearer"

class AdminResponse(BaseModel):
    id: int
    login: str
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class AdminCreate(BaseModel):
    login: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6, max_length=72)
    is_active: bool = True
