import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  code: string;
  name: string;
  series: string;
  spec: string;
  unit: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  weight: number;
  category: 'slider' | 'rail';
}

let products: Product[] = [];
let nextId = 1;

@Injectable()
export class ProductsService {
  // Slider endpoints
  findSliders() {
    return products.filter(p => p.category === 'slider');
  }

  // Rail endpoints
  findRails() {
    return products.filter(p => p.category === 'rail');
  }

  findAll() {
    return products;
  }

  findOne(id: number) {
    return products.find(p => p.id === id);
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

  batchDelete(ids: number[]): number {
    let count = 0;
    ids.forEach(id => { if (this.delete(id)) count++; });
    return count;
  }

  batchImport(items: Omit<Product, 'id'>[]): Product[] {
    const created = items.map(item => this.create(item));
    return created;
  }

  exportAll() {
    return { sliders: this.findSliders(), rails: this.findRails() };
  }
}
