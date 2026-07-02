import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

const Products: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [series, setSeries] = useState<string[]>([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    api.getProducts().then(setProducts);
    api.getSeries().then(setSeries);
  }, []);

  const filtered = filter ? products.filter(p => p.series === filter) : products;

  return (
    <div style={{ padding: 24 }}>
      <h1>📦 产品管理</h1>
      <div style={{ marginBottom: 16 }}>
        <select onChange={e => setFilter(e.target.value)} value={filter} style={{ padding: '6px 12px', fontSize: 14 }}>
          <option value="">全部系列</option>
          {series.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ marginLeft: 16, color: '#999' }}>共 {filtered.length} 个产品</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff' }}>
        <thead>
          <tr style={{ background: '#f5f5f5', textAlign: 'left' }}>
            <th style={th}>编码</th>
            <th style={th}>名称</th>
            <th style={th}>系列</th>
            <th style={th}>规格</th>
            <th style={th}>单位</th>
            <th style={th}>成本价</th>
            <th style={th}>售价</th>
            <th style={th}>库存</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map(p => (
            <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={td}><b>{p.code}</b></td>
              <td style={td}>{p.name}</td>
              <td style={td}><Tag>{p.series}</Tag></td>
              <td style={td}>{p.spec}</td>
              <td style={td}>{p.unit}</td>
              <td style={td}>¥{p.costPrice}</td>
              <td style={td}><b style={{ color: '#1890ff' }}>¥{p.sellPrice}</b></td>
              <td style={{ ...td, color: p.stock <= p.minStock ? 'red' : 'inherit', fontWeight: p.stock <= p.minStock ? 'bold' : 'normal' }}>
                {p.stock} {p.stock <= p.minStock ? '⚠️' : ''}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Tag = ({ children }: any) => (
  <span style={{ background: '#e6f7ff', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>{children}</span>
);
const th: any = { padding: '12px 16px', borderBottom: '2px solid #e8e8e8', fontSize: 13 };
const td: any = { padding: '10px 16px', fontSize: 13 };

export default Products;
