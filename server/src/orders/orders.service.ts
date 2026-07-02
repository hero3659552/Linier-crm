import { Injectable } from '@nestjs/common';

export interface OrderItem { productId: number; productCode: string; productName: string; quantity: number; unitPrice: number; amount: number; }
export interface Order {
  id: number; orderNo: string; customerId: number; customerName?: string;
  orderDate: string; totalAmount: number; status: string; items: OrderItem[];
  salesId?: number; note?: string;
}

let orders: Order[] = [];
let nextId = 1;

@Injectable()
export class OrdersService {
  findAll() { return orders; }
  findOne(id: number) { return orders.find(o => o.id === id); }
  create(data: { customerId: number; items: OrderItem[]; salesId?: number; note?: string }) {
    const order: Order = {
      id: nextId++,
      orderNo: `DD-${new Date().toISOString().slice(2,10).replace(/-/g,'')}-${String(nextId).padStart(4,'0')}`,
      customerId: data.customerId,
      orderDate: new Date().toISOString(),
      totalAmount: data.items.reduce((s, i) => s + i.amount, 0),
      status: 'QUOTATION',
      items: data.items,
      salesId: data.salesId,
      note: data.note,
    };
    orders.push(order);
    return order;
  }
  updateStatus(id: number, status: string) {
    const o = orders.find(o => o.id === id);
    if (!o) return;
    o.status = status;
    return o;
  }
}
