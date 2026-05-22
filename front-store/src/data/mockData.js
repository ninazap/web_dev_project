// Генерация SVG заглушек вместо внешних картинок
const getPlaceholderSvg = (text) => {
  const encodedText = encodeURIComponent(text);
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Crect fill='%233498db' width='400' height='400'/%3E%3Ctext fill='white' font-size='24' x='50%25' y='50%25' text-anchor='middle' dy='.3em'%3E${encodedText}%3C/text%3E%3C/svg%3E`;
};

export const products = [
  { id: 1, sku: "LED-E27-10W", name: "LED лампа E27 10W", description: "Энергосберегающая светодиодная лампа", price: 250, stock: 150, category: "LED", imageUrl: getPlaceholderSvg("LED E27 10W") },
  { id: 2, sku: "LED-E27-15W", name: "LED лампа E27 15W", description: "Мощная светодиодная лампа", price: 320, stock: 200, category: "LED", imageUrl: getPlaceholderSvg("LED E27 15W") },
  { id: 3, sku: "LED-E14-5W", name: "LED лампа E14 5W", description: "Компактная светодиодная лампа", price: 180, stock: 300, category: "LED", imageUrl: getPlaceholderSvg("LED E14 5W") },
  { id: 4, sku: "LED-E14-8W", name: "LED лампа E14 8W", description: "Светодиодная лампа малой мощности", price: 210, stock: 250, category: "LED", imageUrl: getPlaceholderSvg("LED E14 8W") },
  { id: 5, sku: "HAL-GU10-50W", name: "Галогенная лампа GU10 50W", description: "Галогенная лампа направленного света", price: 150, stock: 100, category: "Галоген", imageUrl: getPlaceholderSvg("HAL GU10 50W") },
  { id: 6, sku: "HAL-GU10-35W", name: "Галогенная лампа GU10 35W", description: "Галогенная лампа эконом", price: 120, stock: 120, category: "Галоген", imageUrl: getPlaceholderSvg("HAL GU10 35W") },
  { id: 7, sku: "FLU-T8-18W", name: "Люминесцентная лампа T8 18W", description: "Линейная люминесцентная лампа", price: 95, stock: 180, category: "Люминесцент", imageUrl: getPlaceholderSvg("FLU T8 18W") },
  { id: 8, sku: "FLU-T8-36W", name: "Люминесцентная лампа T8 36W", description: "Мощная линейная лампа", price: 140, stock: 160, category: "Люминесцент", imageUrl: getPlaceholderSvg("FLU T8 36W") },
  { id: 9, sku: "LED-MR16-5W", name: "LED лампа MR16 5W", description: "Лампа с отражателем", price: 190, stock: 220, category: "LED", imageUrl: getPlaceholderSvg("LED MR16 5W") },
  { id: 10, sku: "LED-MR16-7W", name: "LED лампа MR16 7W", description: "Яркая лампа MR16", price: 230, stock: 190, category: "LED", imageUrl: getPlaceholderSvg("LED MR16 7W") },
  { id: 11, sku: "LED-G4-3W", name: "LED лампа G4 3W", description: "Миниатюрная светодиодная лампа", price: 160, stock: 280, category: "LED", imageUrl: getPlaceholderSvg("LED G4 3W") },
  { id: 12, sku: "LED-G9-5W", name: "LED лампа G9 5W", description: "Капсульная светодиодная лампа", price: 175, stock: 240, category: "LED", imageUrl: getPlaceholderSvg("LED G9 5W") },
  { id: 13, sku: "HAL-R7S-100W", name: "Галогенная лампа R7S 100W", description: "Линейная галогенная лампа", price: 180, stock: 90, category: "Галоген", imageUrl: getPlaceholderSvg("HAL R7S 100W") },
  { id: 14, sku: "HAL-R7S-150W", name: "Галогенная лампа R7S 150W", description: "Мощная линейная лампа", price: 220, stock: 85, category: "Галоген", imageUrl: getPlaceholderSvg("HAL R7S 150W") },
  { id: 15, sku: "LED-A60-12W", name: "LED лампа A60 12W", description: "Классическая форма груши", price: 280, stock: 210, category: "LED", imageUrl: getPlaceholderSvg("LED A60 12W") },
  { id: 16, sku: "LED-A60-9W", name: "LED лампа A60 9W", description: "Экономичная лампа A60", price: 240, stock: 230, category: "LED", imageUrl: getPlaceholderSvg("LED A60 9W") },
  { id: 17, sku: "FLU-2U-11W", name: "Люминесцентная лампа 2U 11W", description: "Компактная люминесцентная лампа", price: 110, stock: 140, category: "Люминесцент", imageUrl: getPlaceholderSvg("FLU 2U 11W") },
  { id: 18, sku: "FLU-2U-15W", name: "Люминесцентная лампа 2U 15W", description: "КЛЛ средней мощности", price: 130, stock: 130, category: "Люминесцент", imageUrl: getPlaceholderSvg("FLU 2U 15W") },
  { id: 19, sku: "LED-PAR38-15W", name: "LED лампа PAR38 15W", description: "Прожекторная лампа", price: 450, stock: 75, category: "LED", imageUrl: getPlaceholderSvg("LED PAR38 15W") },
  { id: 20, sku: "LED-PAR38-20W", name: "LED лампа PAR38 20W", description: "Мощная прожекторная лампа", price: 520, stock: 65, category: "LED", imageUrl: getPlaceholderSvg("LED PAR38 20W") }
];
