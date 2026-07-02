import { Injectable } from '@nestjs/common';

export interface Customer {
  id: number;
  companyName: string;
  contact?: string;
  phone?: string;
  email?: string;
  address?: string;
  region?: string;
  level: string;
  source?: string;
  status: string;
  tags?: string;
  salesId?: number;
}

let customers: Customer[] = [
  { id: 1, companyName: '厦门泰顺行机械有限公司', contact: '陈经理', phone: '139xxxx', region: '福建', level: '金牌', status: '已成交' },
  { id: 2, companyName: '泉州中灿企业有限公司', contact: '林总', phone: '138xxxx', region: '福建', level: '金牌', status: '已成交' },
  { id: 3, companyName: '砂拉越顺发五金贸易', contact: '黄老板', phone: '012xxxx', region: '东马', level: '银牌', status: '跟进中' },
  { id: 4, companyName: '亚庇俊达建筑公司', contact: '张先生', phone: '016xxxx', region: '东马', level: '银牌', status: '已成交' },
  { id: 5, companyName: '诗巫星光物流有限公司', contact: '刘总', phone: '019xxxx', region: '东马', level: '普通', status: '跟进中' },
];
let nextCustomerId = 6;

@Injectable()
export class CustomersService {
  findAll(query?: { search?: string; region?: string; status?: string }) {
    let result = [...customers];
    if (query?.region) result = result.filter(c => c.region === query.region);
    if (query?.status) result = result.filter(c => c.status === query.status);
    if (query?.search) {
      const s = query.search.toLowerCase();
      result = result.filter(c => c.companyName.toLowerCase().includes(s) || (c.contact || '').toLowerCase().includes(s));
    }
    return result;
  }

  findOne(id: number) { return customers.find(c => c.id === id); }
  create(data: Omit<Customer, 'id'>) { const c = { id: nextCustomerId++, ...data }; customers.push(c); return c; }
  update(id: number, data: Partial<Customer>) { const idx = customers.findIndex(c => c.id === id); if (idx === -1) return; customers[idx] = { ...customers[idx], ...data }; return customers[idx]; }
  delete(id: number) { const idx = customers.findIndex(c => c.id === id); if (idx === -1) return false; customers.splice(idx, 1); return true; }
}
