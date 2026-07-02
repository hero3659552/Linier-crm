import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import { api } from '../../services/api';

interface Product {
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

type Tab = 'slider' | 'rail';

const emptyProd = (cat: Tab) => ({
  code: '', name: '', series: 'SG', spec: '', unit: cat === 'slider' ? '个' : '米',
  costPrice: 0, sellPrice: 0, stock: 0, weight: 0, category: cat
});

const ALL_SERIES = ['SG', 'SM', 'SR', 'SV', '配件'];

const Products: React.FC = () => {
  const [tab, setTab] = useState<Tab>('slider');
  const [sliders, setSliders] = useState<Product[]>([]);
  const [rails, setRails] = useState<Product[]>([]);
  const [seriesFilter, setSeriesFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptyProd('slider'));
  const [selected, setSelected] = useState<number[]>([]);
  const [importMsg, setImportMsg] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    setSliders(await api.getSliders());
    setRails(await api.getRails());
  };
  useEffect(() => { load(); }, []);

  const currentList = (tab === 'slider' ? sliders : rails)
    .filter(p => !seriesFilter || p.series === seriesFilter);

  const openNew = () => {
    setEditId(null);
    setForm(emptyProd(tab));
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({ ...p });
    setShowForm(true);
  };

  const save = async () => {
    if (!form.code || !form.name) { alert('编码和名称为必填'); return; }
    try {
      if (editId) {
        await api.updateProduct(editId, form);
      } else {
        await api.createProduct({ ...form, category: tab });
      }
      setShowForm(false);
      load();
    } catch (e: any) {
      alert('保存失败: ' + (e.message || ''));
    }
  };

  const del = async (id: number) => {
    if (!window.confirm('确认删除？')) return;
    await api.deleteProduct(id);
    load();
  };

  const batchDel = async () => {
    if (!selected.length || !window.confirm(`确认删除 ${selected.length} 个？`)) return;
    await api.batchDelete(selected);
    setSelected([]);
    load();
  };

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // === XLSX Export ===
  const handleExport = () => {
    const data = tab === 'slider' ? sliders : rails;
    if (!data.length) { alert('没有数据可导出'); return; }
    const rows = data.map(p => ({
      '编码': p.code, '名称': p.name, '系列': p.series, '规格': p.spec,
      '单位': p.unit, '成本价': p.costPrice, '售价': p.sellPrice,
      '库存': p.stock, tab === 'slider' ? '滑块重量(kg)' : '导轨重量(kg)': p.weight
    }));
    const ws = XLSX.utils.json_to_sheet(rows);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, tab === 'slider' ? '滑块系列' : '导轨系列');
    XLSX.writeFile(wb, `利尼尔${tab === 'slider' ? '滑块' : '导轨'}-${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  // === XLSX Import ===
  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImportMsg('读取中...');
    try {
      const data = await file.arrayBuffer();
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(ws);

      const items = rows.map((r: any) => ({
        code: String(r['编码'] || ''), name: String(r['名称'] || ''),
        series: String(r['系列'] || 'SG'), spec: String(r['规格'] || ''),
        unit: String(r['单位'] || tab === 'slider' ? '个' : '米'),
        costPrice: parseFloat(r['成本价']) || 0, sellPrice: parseFloat(r['售价']) || 0,
        stock: parseInt(r['库存']) || 0, weight: parseFloat(r['滑块重量(kg)'] || r['导轨重量(kg)'] || '0') || 0,
        category: tab
      }));

      if (!items.length) { alert('未读取到有效数据'); return; }
      const result = await api.batchImport(items);
      setImportMsg(`成功导入 ${result.imported} 个产品`);
      load();
    } catch (err: any) {
      setImportMsg('导入失败: ' + (err.message || ''));
    }
    e.target.value = '';
  };

  const fields = tab === 'slider'
    ? ['编码', '名称', '系列', '规格', '单位', '成本价', '售价', '库存', '滑块重量(kg)']
    : ['编码', '名称', '系列', '规格', '单位', '成本价', '售价', '库存', '导轨重量(kg)'];

  return (
    <div style={{ padding: 24 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 16, borderBottom: '1px solid #e8e8e8' }}>
        {(['slider', 'rail'] as const).map(t => (
          <div key={t} onClick={() => { setTab(t); setSeriesFilter(''); setSelected([]); }}
            style={{
              padding: '10px 32px', cursor: 'pointer', fontSize: 15,
              fontWeight: tab === t ? 'bold' : 'normal',
              borderBottom: tab === t ? '2px solid #1890ff' : '2px solid transparent',
              color: tab === t ? '#1890ff' : '#666', transition: '0.2s'
            }}>
            {t === 'slider' ? '🔵 滑块系列' : '🟢 导轨系列'}
            <span style={{ fontSize: 12, color: '#999', marginLeft: 6 }}>
              ({(t === 'slider' ? sliders : rails).length})
            </span>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={openNew} style={btn('blue')}>+ 新增</button>
        {selected.length > 0 && (
          <button onClick={batchDel} style={btn('red')}>🗑 删除({selected.length})</button>
        )}
        <button onClick={handleExport} style={btn('green')}>📤 导出xlsx</button>
        <button onClick={() => fileRef.current?.click()} style={btn('purple')}>📥 导入xlsx</button>
        <input ref={fileRef} type="file" accept=".xlsx,.xls" onChange={handleImport} style={{ display: 'none' }} />
        {importMsg && <span style={{ fontSize: 12, color: '#1890ff' }}>{importMsg}</span>}
        {/* Series filter */}
        <select value={seriesFilter} onChange={e => setSeriesFilter(e.target.value)}
          style={{ marginLeft: 'auto', padding: '6px 12px', border: '1px solid #d9d9d9', borderRadius: 4, fontSize: 13 }}>
          <option value="">全部系列</option>
          {ALL_SERIES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <span style={{ fontSize: 13, color: '#999' }}>共 {currentList.length} 项</span>
      </div>

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            {fields.map((f, i) => {
              if (f === '系列') return (
                <div key={f}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>{f}</label>
                  <select value={form.series} onChange={e => setForm({...form, series: e.target.value})} style={inputStyle}>
                    {ALL_SERIES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              );
              const isNum = ['成本价', '售价', '库存', '滑块重量(kg)', '导轨重量(kg)'].includes(f);
              const key = f === '滑块重量(kg)' || f === '导轨重量(kg)' ? 'weight'
                : f === '编码' ? 'code' : f === '名称' ? 'name'
                : f === '规格' ? 'spec' : f === '单位' ? 'unit'
                : f === '成本价' ? 'costPrice' : f === '售价' ? 'sellPrice'
                : f === '库存' ? 'stock' : '';
              return (
                <div key={f}>
                  <label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>{f}</label>
                  <input
                    type={isNum ? 'number' : 'text'}
                    value={(form as any)[key] ?? ''}
                    onChange={e => setForm({...form, [key]: isNum ? (parseFloat(e.target.value) || 0) : e.target.value})}
                    style={inputStyle}
                  />
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
            <button onClick={save} style={{ ...btn('blue') }}>{editId ? '更新' : '创建'}</button>
            <button onClick={() => setShowForm(false)} style={btn('gray')}>取消</button>
          </div>
        </div>
      )}

      {/* Table */}
      <div style={{ background: '#fff', borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#fafafa' }}>
              <th style={th}><input type="checkbox" onChange={e => {
                if (e.target.checked) setSelected(currentList.map(p => p.id));
                else setSelected([]);
              }} checked={selected.length === currentList.length && currentList.length > 0} /></th>
              <th style={th}>编码</th>
              <th style={th}>名称</th>
              <th style={th}>系列</th>
              <th style={th}>规格</th>
              <th style={th}>单位</th>
              <th style={th}>成本价</th>
              <th style={th}>售价</th>
              <th style={th}>库存</th>
              <th style={th}>{tab === 'slider' ? '滑块重量(kg)' : '导轨重量(kg)'}</th>
              <th style={th}>操作</th>
            </tr>
          </thead>
          <tbody>
            {currentList.map(p => (
              <tr key={p.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
                <td style={td}><input type="checkbox" checked={selected.includes(p.id)} onChange={() => toggleSelect(p.id)} /></td>
                <td style={td}><b>{p.code}</b></td>
                <td style={td}>{p.name}</td>
                <td style={td}><Tag>{p.series}</Tag></td>
                <td style={td}>{p.spec}</td>
                <td style={td}>{p.unit}</td>
                <td style={td}>¥{p.costPrice.toLocaleString()}</td>
                <td style={td}><b style={{ color: '#1890ff' }}>¥{p.sellPrice.toLocaleString()}</b></td>
                <td style={td}>{p.stock}</td>
                <td style={td}>{p.weight} kg</td>
                <td style={td}>
                  <button onClick={() => openEdit(p)} style={btnSm('blue')}>编辑</button>
                  <button onClick={() => del(p.id)} style={{ ...btnSm('red'), marginLeft: 4 }}>删</button>
                </td>
              </tr>
            ))}
            {currentList.length === 0 && (
              <tr><td colSpan={11} style={{ textAlign: 'center', padding: 40, color: '#999' }}>暂无数据</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Helpers
const btn = (c: string) => ({
  padding: '8px 20px',
  background: { blue: '#1890ff', red: '#ff4d4f', green: '#52c41a', purple: '#722ed1', gray: '#999' }[c] || '#1890ff',
  color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer'
});
const btnSm = (c: string) => ({ ...btn(c), padding: '4px 12px', fontSize: 12 });
const Tag = ({ children }: any) => (
  <span style={{ background: '#e6f7ff', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>{children}</span>
);
const inputStyle: any = {
  padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 4, fontSize: 13, width: '100%', boxSizing: 'border-box'
};
const th: any = { padding: '10px 12px', textAlign: 'left', fontSize: 13, borderBottom: '2px solid #e8e8e8' };
const td: any = { padding: '8px 12px', fontSize: 13 };

export default Products;
