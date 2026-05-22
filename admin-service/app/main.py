from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from app.database import engine, get_db, Base, SessionLocal
from app.models import Admin
from app.schemas import AdminCreate, AdminResponse, Token, AdminLogin
from app.security import get_password_hash
from app import models, schemas, security
from datetime import timedelta

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Admin Service", description="Микросервис аутентификации админов")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
security_scheme = HTTPBearer()

#@app.on_event("startup")
#def init_admin():
#    db = SessionLocal()
#    if not db.query(Admin).first():
#        db.add(Admin(login="admin", password_hash=get_password_hash("admin")))
#        db.commit()
#    db.close()

@app.post("/auth/login", response_model=schemas.Token)
async def login(credentials: schemas.AdminLogin, db: Session = Depends(get_db)):
    admin = db.query(models.Admin).filter(models.Admin.login == credentials.login).first()
    if not admin or not admin.is_active or not security.verify_password(credentials.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Неверный логин или пароль",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = security.create_access_token(
        data={"sub": admin.login, "id": admin.id},
        expires_delta=timedelta(minutes=60)
    )
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/auth/me", response_model=schemas.AdminResponse)
async def get_current_admin(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    db: Session = Depends(get_db)
):
    payload = security.decode_access_token(credentials.credentials)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    admin = db.query(models.Admin).filter(models.Admin.id == payload.get("id")).first()
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    return admin

@app.post("/admins", response_model=schemas.AdminResponse)
async def create_admin(admin: AdminCreate, db: Session = Depends(get_db)):
    existing = db.query(models.Admin).filter(models.Admin.login == admin.login).first()
    if existing:
        raise HTTPException(status_code=400, detail="Админ с таким логином уже существует")

    hashed_password = security.get_password_hash(admin.password)
    db_admin = models.Admin(login=admin.login, password_hash=hashed_password, is_active=admin.is_active)
    db.add(db_admin)
    db.commit()
    db.refresh(db_admin)
    return db_admin

@app.get("/admins", response_model=list[schemas.AdminResponse])
async def list_admins(db: Session = Depends(get_db)):
    return db.query(models.Admin).all()

