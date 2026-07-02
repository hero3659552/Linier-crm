import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

const Customers: React.FC = () => {
  const [customers, setCustomers] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ companyName: '', contact: '', phone: '', region: '', level: '普通', status: '潜在' });

  useEffect(() => { api.getCustomers().then(setCustomers); }, []);

  const create = async () => {
    await api.createCustomer(form);
    setShowForm(false);
    setForm({ companyName: '', contact: '', phone: '', region: '', level: '普通', status: '潜在' });
    api.getCustomers().then(setCustomers);
  };

  const statusColor = (s: string) => {
    const map: any = { '已成交': '#52c41a', '跟进中': '#1890ff', '潜在': '#faad14', '流失': '#ff4d4f' };
    return map[s] || '#999';
  };

  return (
    <div style={{ padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h1 style={{ margin: 0 }}>👥 客户管理</h1>
        <button onClick={() => setShowForm(true)} style={btnPrimary}>+ 新增客户</button>
      </div>

      {showForm && (
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <input placeholder="公司名称 *" value={form.companyName} onChange={e => setForm({...form, companyName: e.target.value})} style={inputStyle} />
            <input placeholder="联系人" value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} style={inputStyle} />
            <input placeholder="电话" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} style={inputStyle} />
            <input placeholder="区域" value={form.region} onChange={e => setForm({...form, region: e.target.value})} style={inputStyle} />
            <select value={form.level} onChange={e => setForm({...form, level: e.target.value})} style={inputStyle}>
              <option>普通</option><option>银牌</option><option>金牌</option><option>钻石</option>
            </select>
            <select value={form.status} onChange={e => setForm({...form, status: e.target.value})} style={inputStyle}>
              <option>潜在</option><option>跟进中</option><option>已成交</option><option>流失</option>
            </select>
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={create} style={{ ...btnPrimary, marginRight: 8 }}>保存</button>
            <button onClick={() => setShowForm(false)} style={{ ...btnPrimary, background: '#999' }}>取消</button>
          </div>
        </div>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#fafafa' }}>
            <th style={th}>公司名称</th>
            <th style={th}>联系人</th>
            <th style={th}>电话</th>
            <th style={th}>区域</th>
            <th style={th}>级别</th>
            <th style={th}>状态</th>
          </tr>
        </thead>
        <tbody>
          {customers.map(c => (
            <tr key={c.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={td}><b>{c.companyName}</b></td>
              <td style={td}>{c.contact || '-'}</td>
              <td style={td}>{c.phone || '-'}</td>
              <td style={td}>{c.region || '-'}</td>
              <td style={td}>{c.level}</td>
              <td style={td}><span style={{ background: statusColor(c.status), color: '#fff', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>{c.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const btnPrimary: any = { padding: '8px 20px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer' };
const inputStyle: any = { padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 4, fontSize: 13, width: '100%', boxSizing: 'border-box' };
const th: any = { padding: '12px 16px', textAlign: 'left', fontSize: 13, borderBottom: '2px solid #e8e8e8' };
const td: any = { padding: '10px 16px', fontSize: 13 };

export default Customers;
