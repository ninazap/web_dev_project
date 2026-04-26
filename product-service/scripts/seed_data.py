import sys
import os
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine
from app.models import Product
from decimal import Decimal

products_data = [
    {"sku": "LED-E27-10W", "name": "LED лампа E27 10W", "description": "Энергосберегающая светодиодная лампа", "price": Decimal("250.00"), "stock": 150, "category": "LED"},
    {"sku": "LED-E27-15W", "name": "LED лампа E27 15W", "description": "Мощная светодиодная лампа", "price": Decimal("320.00"), "stock": 200, "category": "LED"},
    {"sku": "LED-E14-5W", "name": "LED лампа E14 5W", "description": "Компактная светодиодная лампа", "price": Decimal("180.00"), "stock": 300, "category": "LED"},
    {"sku": "LED-E14-8W", "name": "LED лампа E14 8W", "description": "Светодиодная лампа малой мощности", "price": Decimal("210.00"), "stock": 250, "category": "LED"},
    {"sku": "HAL-GU10-50W", "name": "Галогенная лампа GU10 50W", "description": "Галогенная лампа направленного света", "price": Decimal("150.00"), "stock": 100, "category": "Галоген"},
    {"sku": "HAL-GU10-35W", "name": "Галогенная лампа GU10 35W", "description": "Галогенная лампа эконом", "price": Decimal("120.00"), "stock": 120, "category": "Галоген"},
    {"sku": "FLU-T8-18W", "name": "Люминесцентная лампа T8 18W", "description": "Линейная люминесцентная лампа", "price": Decimal("95.00"), "stock": 180, "category": "Люминесцент"},
    {"sku": "FLU-T8-36W", "name": "Люминесцентная лампа T8 36W", "description": "Мощная линейная лампа", "price": Decimal("140.00"), "stock": 160, "category": "Люминесцент"},
    {"sku": "LED-MR16-5W", "name": "LED лампа MR16 5W", "description": "Лампа с отражателем", "price": Decimal("190.00"), "stock": 220, "category": "LED"},
    {"sku": "LED-MR16-7W", "name": "LED лампа MR16 7W", "description": "Яркая лампа MR16", "price": Decimal("230.00"), "stock": 190, "category": "LED"},
    {"sku": "LED-G4-3W", "name": "LED лампа G4 3W", "description": "Миниатюрная светодиодная лампа", "price": Decimal("160.00"), "stock": 280, "category": "LED"},
    {"sku": "LED-G9-5W", "name": "LED лампа G9 5W", "description": "Капсульная светодиодная лампа", "price": Decimal("175.00"), "stock": 240, "category": "LED"},
    {"sku": "HAL-R7S-100W", "name": "Галогенная лампа R7S 100W", "description": "Линейная галогенная лампа", "price": Decimal("180.00"), "stock": 90, "category": "Галоген"},
    {"sku": "HAL-R7S-150W", "name": "Галогенная лампа R7S 150W", "description": "Мощная линейная лампа", "price": Decimal("220.00"), "stock": 85, "category": "Галоген"},
    {"sku": "LED-A60-12W", "name": "LED лампа A60 12W", "description": "Классическая форма груши", "price": Decimal("280.00"), "stock": 210, "category": "LED"},
    {"sku": "LED-A60-9W", "name": "LED лампа A60 9W", "description": "Экономичная лампа A60", "price": Decimal("240.00"), "stock": 230, "category": "LED"},
    {"sku": "FLU-2U-11W", "name": "Люминесцентная лампа 2U 11W", "description": "Компактная люминесцентная лампа", "price": Decimal("110.00"), "stock": 140, "category": "Люминесцент"},
    {"sku": "FLU-2U-15W", "name": "Люминесцентная лампа 2U 15W", "description": "КЛЛ средней мощности", "price": Decimal("130.00"), "stock": 130, "category": "Люминесцент"},
    {"sku": "LED-PAR38-15W", "name": "LED лампа PAR38 15W", "description": "Прожекторная лампа", "price": Decimal("450.00"), "stock": 75, "category": "LED"},
    {"sku": "LED-PAR38-20W", "name": "LED лампа PAR38 20W", "description": "Мощная прожекторная лампа", "price": Decimal("520.00"), "stock": 65, "category": "LED"},
]

def seed_database():
    Product.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        for product_data in products_data:
            existing = db.query(Product).filter(Product.sku == product_data["sku"]).first()
            if not existing:
                product = Product(**product_data)
                db.add(product)
        db.commit()
        print("База данных заполнена 20 товарами")
    except Exception as e:
        db.rollback()
        print(f"Ошибка: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    seed_database()
