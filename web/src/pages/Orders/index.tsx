import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<any>({ customerId: '', items: [{ productId: '', quantity: 1 }], note: '' });

  useEffect(() => {
    api.getOrders().then(setOrders);
    api.getProducts().then(setProducts);
    api.getCustomers().then(setCustomers);
  }, []);

  const create = async () => {
    const items = form.items.map((i: any) => {
      const p = products.find((x: any) => x.id === +i.productId);
      return { productId: +i.productId, productCode: p?.code, productName: p?.name, quantity: +i.quantity, unitPrice: p?.sellPrice || 0, amount: (+i.quantity) * (p?.sellPrice || 0) };
    });
    await api.createOrder({ customerId: +form.customerId, items, note: form.note });
    setShowForm(false);
    setForm({ customerId: '', items: [{ productId: '', quantity: 1 }], note: '' });
    api.getOrders().then(setOrders);
  };

  const addItem = () => setForm({ ...form, items: [...form.items, { productId: '', quantity: 1 }] });

  const statusColor = (s: string) => {
    const map: any = { QUOTATION: '#faad14', CONFIRMED: '#1890ff', PRODUCING: '#722ed1', SHIPPED: '#52c41a', COMPLETED: '#999', CANCELLED: '#ff4d4f' };
    return map[s] || '#999';
  };
  const statusLabel: any = { QUOTATION: '报价', CONFIRMED: '已确认', PRODUCING: '生产中', SHIPPED: '已出货', COMPLETED: '已完成', CANCELLED: '已取消' };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>📋 订单管理</h1>
        <button onClick={() => setShowForm(true)} style={btnPrimary}>+ 新建订单</button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <select value={form.customerId} onChange={e => setForm({...form, customerId: e.target.value})} style={inputStyle}>
            <option value="">选择客户 *</option>
            {customers.map((c: any) => <option key={c.id} value={c.id}>{c.companyName}</option>)}
          </select>
          <div style={{ marginTop: 12 }}>
            <b>订单明细</b>
            {form.items.map((item: any, idx: number) => (
              <div key={idx} style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <select value={item.productId} onChange={e => {
                  const items = [...form.items]; items[idx].productId = e.target.value; setForm({...form, items});
                }} style={{ ...inputStyle, flex: 2 }}>
                  <option value="">选择产品</option>
                  {products.map((p: any) => <option key={p.id} value={p.id}>{p.code} - {p.name} (¥{p.sellPrice})</option>)}
                </select>
                <input type="number" min="1" value={item.quantity} onChange={e => {
                  const items = [...form.items]; items[idx].quantity = +e.target.value; setForm({...form, items});
                }} style={{ ...inputStyle, flex: 1, width: 80 }} />
                <span style={{ lineHeight: '36px', fontSize: 13, color: '#999' }}>个</span>
              </div>
            ))}
            <button onClick={addItem} style={{ marginTop: 8, ...btnPrimary, background: '#52c41a' }}>+ 添加行</button>
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={create} style={{ ...btnPrimary, marginRight: 8 }}>创建订单</button>
            <button onClick={() => setShowForm(false)} style={{ ...btnPrimary, background: '#999' }}>取消</button>
          </div>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#fafafa' }}>
            <th style={th}>订单号</th>
            <th style={th}>客户</th>
            <th style={th}>金额</th>
            <th style={th}>日期</th>
            <th style={th}>状态</th>
            <th style={th}>操作</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o: any) => (
            <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={td}><b>{o.orderNo}</b></td>
              <td style={td}>{customers.find((c: any) => c.id === o.customerId)?.companyName || '-'}</td>
              <td style={td}>¥{o.totalAmount?.toLocaleString()}</td>
              <td style={td}>{o.orderDate?.slice(0, 10)}</td>
              <td style={td}><span style={{ background: statusColor(o.status), color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>{statusLabel[o.status] || o.status}</span></td>
              <td style={td}>
                {o.status === 'QUOTATION' && <button onClick={async () => { await api.updateOrderStatus(o.id, 'CONFIRMED'); api.getOrders().then(setOrders); }} style={smallBtn}>确认</button>}
                {o.status === 'CONFIRMED' && <button onClick={async () => { await api.updateOrderStatus(o.id, 'SHIPPED'); api.getOrders().then(setOrders); }} style={smallBtn}>出货</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const btnPrimary: any = { padding: '8px 20px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer' };
const smallBtn: any = { padding: '4px 12px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer' };
const inputStyle: any = { padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 4, fontSize: 13, width: '100%', boxSizing: 'border-box' };
const th: any = { padding: '12px 16px', textAlign: 'left', fontSize: 13, borderBottom: '2px solid #e8e8e8' };
const td: any = { padding: '10px 16px', fontSize: 13 };

export default Orders;
