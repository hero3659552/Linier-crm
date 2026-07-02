import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  code: string;
  name: string;
  series: string;
  modelType?: string;
  spec?: string;
  unit: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  status: string;
  description?: string;
}

// In-memory storage — will replace with Prisma after DB setup
let products: Product[] = [
  // SG Series
  { id: 1, code: 'SGH15CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '15', unit: '个', costPrice: 120, sellPrice: 220, stock: 200, minStock: 50, status: 'active', description: '非互换型' },
  { id: 2, code: 'SGH20CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '20', unit: '个', costPrice: 150, sellPrice: 280, stock: 180, minStock: 40, status: 'active' },
  { id: 3, code: 'SGH25CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '25', unit: '个', costPrice: 200, sellPrice: 360, stock: 150, minStock: 30, status: 'active' },
  { id: 4, code: 'SGH30CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '30', unit: '个', costPrice: 280, sellPrice: 480, stock: 120, minStock: 25, status: 'active' },
  { id: 5, code: 'SGH35CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '35', unit: '个', costPrice: 360, sellPrice: 620, stock: 100, minStock: 20, status: 'active' },
  { id: 6, code: 'SGH45CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '45', unit: '个', costPrice: 520, sellPrice: 880, stock: 80, minStock: 15, status: 'active' },
  // SM Series
  { id: 7, code: 'SMH20CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '20', unit: '个', costPrice: 180, sellPrice: 320, stock: 150, minStock: 30, status: 'active' },
  { id: 8, code: 'SMH25CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '25', unit: '个', costPrice: 240, sellPrice: 420, stock: 120, minStock: 25, status: 'active' },
  { id: 9, code: 'SMH30CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '30', unit: '个', costPrice: 330, sellPrice: 560, stock: 100, minStock: 20, status: 'active' },
  { id: 10, code: 'SMH35CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '35', unit: '个', costPrice: 420, sellPrice: 720, stock: 80, minStock: 15, status: 'active' },
  // Rails
  { id: 11, code: 'SGH15R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '15', unit: '米', costPrice: 80, sellPrice: 150, stock: 500, minStock: 100, status: 'active' },
  { id: 12, code: 'SGH25R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '25', unit: '米', costPrice: 150, sellPrice: 270, stock: 350, minStock: 80, status: 'active' },
  { id: 13, code: 'SGH35R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '35', unit: '米', costPrice: 300, sellPrice: 510, stock: 250, minStock: 50, status: 'active' },
  // SM Rails
  { id: 14, code: 'SMH25R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '25', unit: '米', costPrice: 180, sellPrice: 310, stock: 300, minStock: 60, status: 'active' },
  { id: 15, code: 'SMH35R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '35', unit: '米', costPrice: 350, sellPrice: 590, stock: 200, minStock: 40, status: 'active' },
  // SR Series
  { id: 16, code: 'SRH25CA', name: 'SR滚柱型法兰型滑块', series: 'SR', modelType: 'CA', spec: '25', unit: '个', costPrice: 380, sellPrice: 650, stock: 100, minStock: 20, status: 'active' },
  { id: 17, code: 'SRH35CA', name: 'SR滚柱型法兰型滑块', series: 'SR', modelType: 'CA', spec: '35', unit: '个', costPrice: 680, sellPrice: 1150, stock: 60, minStock: 15, status: 'active' },
  { id: 18, code: 'SRH25R', name: 'SR滚柱型导轨', series: 'SR', modelType: 'R', spec: '25', unit: '米', costPrice: 280, sellPrice: 480, stock: 150, minStock: 30, status: 'active' },
  // SV Series
  { id: 19, code: 'SV9CA', name: 'SV微型滑块', series: 'SV', modelType: 'CA', spec: '9', unit: '个', costPrice: 45, sellPrice: 85, stock: 300, minStock: 50, status: 'active' },
  { id: 20, code: 'SV12CA', name: 'SV微型滑块', series: 'SV', modelType: 'CA', spec: '12', unit: '个', costPrice: 60, sellPrice: 110, stock: 250, minStock: 40, status: 'active' },
  { id: 21, code: 'SV9R', name: 'SV微型导轨', series: 'SV', modelType: 'R', spec: '9', unit: '米', costPrice: 35, sellPrice: 65, stock: 400, minStock: 80, status: 'active' },
];

let nextId = 22;

@Injectable()
export class ProductsService {
  findAll(query?: { series?: string; status?: string; search?: string }): Product[] {
    let result = [...products];
    if (query?.series) result = result.filter(p => p.series === query.series);
    if (query?.status) result = result.filter(p => p.status === query.status);
    if (query?.search) {
      const s = query.search.toLowerCase();
      result = result.filter(p => 
        p.code.toLowerCase().includes(s) || 
        p.name.toLowerCase().includes(s)
      );
    }
    return result;
  }

  findOne(id: number): Product | undefined {
    return products.find(p => p.id === id);
  }

  findByCode(code: string): Product | undefined {
    return products.find(p => p.code === code);
  }

  create(data: Omit<Product, 'id'>): Product {
    const product = { id: nextId++, ...data };
    products.push(product);
    return product;
  }

  update(id: number, data: Partial<Product>): Product | undefined {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    products[idx] = { ...products[idx], ...data };
    return products[idx];
  }

  delete(id: number): boolean {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
  }

  getLowStock(): Product[] {
    return products.filter(p => p.stock <= p.minStock && p.status === 'active');
  }

  getSeries(): string[] {
    return [...new Set(products.map(p => p.series))];
  }
}
