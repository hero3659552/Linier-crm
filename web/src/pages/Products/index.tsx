import React, { useEffect, useState } from 'react';
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

const emptySlider = { code: '', name: '', series: 'SG', spec: '', unit: '个', costPrice: 0, sellPrice: 0, stock: 0, weight: 0, category: 'slider' as const };
const emptyRail = { code: '', name: '', series: 'SG', spec: '', unit: '米', costPrice: 0, sellPrice: 0, stock: 0, weight: 0, category: 'rail' as const };

const Products: React.FC = () => {
  const [tab, setTab] = useState<Tab>('slider');
  const [sliders, setSliders] = useState<Product[]>([]);
  const [rails, setRails] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [form, setForm] = useState<any>(emptySlider);
  const [selected, setSelected] = useState<number[]>([]);
  const [importText, setImportText] = useState('');

  const load = async () => {
    setSliders(await api.getSliders());
    setRails(await api.getRails());
  };
  useEffect(() => { load(); }, []);

  const currentList = tab === 'slider' ? sliders : rails;

  const openNew = () => {
    setEditId(null);
    setForm(tab === 'slider' ? { ...emptySlider } : { ...emptyRail });
    setShowForm(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({ ...p });
    setShowForm(true);
  };

  const save = async () => {
    if (editId) {
      await api.updateProduct(editId, form);
    } else {
      await api.createProduct(form);
    }
    setShowForm(false);
    load();
  };

  const del = async (id: number) => {
    if (!window.confirm('确认删除？')) return;
    await api.deleteProduct(id);
    load();
  };

  const batchDel = async () => {
    if (!selected.length || !window.confirm(`确认删除 ${selected.length} 个产品？`)) return;
    await api.batchDelete(selected);
    setSelected([]);
    load();
  };

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleExport = async () => {
    const data = await api.exportAll();
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linier-products-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async () => {
    try {
      const items = JSON.parse(importText);
      const arr = Array.isArray(items) ? items : items.sliders || items.rails || [];
      const result = await api.batchImport(arr);
      alert(`成功导入 ${result.imported} 个产品`);
      setImportText('');
      load();
    } catch (e: any) {
      alert('导入失败：' + e.message);
    }
  };

  const weightLabel = tab === 'slider' ? '滑块重量(kg)' : '导轨重量(kg)';

  // Fields for slider form
  const sliderFields = ['编码', '名称', '系列', '规格', '单位', '成本价', '售价', '库存', '滑块重量(kg)'];
  const railFields = ['编码', '名称', '系列', '规格', '单位', '成本价', '售价', '库存', '导轨重量(kg)'];

  return (
    <div style={{ padding: 24 }}>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, marginBottom: 16 }}>
        <div onClick={() => setTab('slider')} style={{
          padding: '10px 32px', cursor: 'pointer', fontSize: 15, fontWeight: tab === 'slider' ? 'bold' : 'normal',
          borderBottom: tab === 'slider' ? '2px solid #1890ff' : '2px solid transparent',
          color: tab === 'slider' ? '#1890ff' : '#666', transition: '0.2s'
        }}>🔵 滑块系列 <span style={{ fontSize: 12, color: '#999' }}>({sliders.length})</span></div>
        <div onClick={() => setTab('rail')} style={{
          padding: '10px 32px', cursor: 'pointer', fontSize: 15, fontWeight: tab === 'rail' ? 'bold' : 'normal',
          borderBottom: tab === 'rail' ? '2px solid #1890ff' : '2px solid transparent',
          color: tab === 'rail' ? '#1890ff' : '#666', transition: '0.2s'
        }}>🟢 导轨系列 <span style={{ fontSize: 12, color: '#999' }}>({rails.length})</span></div>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, alignItems: 'center', flexWrap: 'wrap' }}>
        <button onClick={openNew} style={btnPrimary}>+ 新增</button>
        {selected.length > 0 && <button onClick={batchDel} style={{ ...btnPrimary, background: '#ff4d4f' }}>🗑 删除({selected.length})</button>}
        <button onClick={handleExport} style={{ ...btnPrimary, background: '#52c41a' }}>📤 导出</button>
        <button onClick={() => setImportText(prompt('粘贴JSON数据：') || '')} style={{ ...btnPrimary, background: '#722ed1' }}>📥 导入</button>
        <span style={{ fontSize: 13, color: '#999' }}>共 {currentList.length} 项</span>
      </div>

      {/* Import paste area */}
      {importText && (
        <div style={{ background: '#fff', padding: 16, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <textarea rows={5} value={importText} onChange={e => setImportText(e.target.value)} style={{ width: '100%', border: '1px solid #d9d9d9', borderRadius: 4, padding: 8, fontFamily: 'monospace', fontSize: 12, boxSizing: 'border-box' }} />
          <div style={{ marginTop: 8 }}>
            <button onClick={handleImport} style={btnPrimary}>确认导入</button>
            <button onClick={() => setImportText('')} style={{ ...btnPrimary, background: '#999', marginLeft: 8 }}>取消</button>
          </div>
        </div>
      )}

      {/* Form */}
      {showForm && (
        <div style={{ background: '#fff', padding: 24, borderRadius: 8, marginBottom: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <Field label={tab === 'slider' ? sliderFields[0] : railFields[0]} value={form.code} onChange={v => setForm({...form, code: v})} />
            <Field label={tab === 'slider' ? sliderFields[1] : railFields[1]} value={form.name} onChange={v => setForm({...form, name: v})} />
            <select value={form.series} onChange={e => setForm({...form, series: e.target.value})} style={inputStyle}>
              <option>SG</option><option>SM</option><option>SR</option><option>SV</option>
            </select>
            <Field label={tab === 'slider' ? sliderFields[3] : railFields[3]} value={form.spec} onChange={v => setForm({...form, spec: v})} />
            <Field label={tab === 'slider' ? sliderFields[4] : railFields[4]} value={form.unit} onChange={v => setForm({...form, unit: v})} />
            <FieldNum label={tab === 'slider' ? sliderFields[5] : railFields[5]} value={form.costPrice} onChange={v => setForm({...form, costPrice: v})} />
            <FieldNum label={tab === 'slider' ? sliderFields[6] : railFields[6]} value={form.sellPrice} onChange={v => setForm({...form, sellPrice: v})} />
            <FieldNum label={tab === 'slider' ? sliderFields[7] : railFields[7]} value={form.stock} onChange={v => setForm({...form, stock: v})} />
            <FieldNum label={tab === 'slider' ? sliderFields[8] : railFields[8]} value={form.weight} onChange={v => setForm({...form, weight: v})} />
          </div>
          <div style={{ marginTop: 12 }}>
            <button onClick={save} style={{ ...btnPrimary, marginRight: 8 }}>{editId ? '更新' : '创建'}</button>
            <button onClick={() => setShowForm(false)} style={{ ...btnPrimary, background: '#999' }}>取消</button>
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
              <th style={th}>{weightLabel}</th>
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
                <td style={td}>¥{p.costPrice}</td>
                <td style={td}><b style={{ color: '#1890ff' }}>¥{p.sellPrice}</b></td>
                <td style={td}>{p.stock}</td>
                <td style={td}>{p.weight}</td>
                <td style={td}>
                  <button onClick={() => openEdit(p)} style={smallBtn}>编辑</button>
                  <button onClick={() => del(p.id)} style={{ ...smallBtn, background: '#ff4d4f', marginLeft: 4 }}>删</button>
                </td>
              </tr>
            ))}
            {currentList.length === 0 && (
              <tr><td colSpan={11} style={{ textAlign: 'center', padding: 40, color: '#999' }}>暂无数据，点击"+ 新增"添加</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Field = ({ label, value, onChange }: { label: string; value: any; onChange: (v: any) => void }) => (
  <div><label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>{label}</label>
    <input value={value} onChange={e => onChange(e.target.value)} style={inputStyle} /></div>
);
const FieldNum = ({ label, value, onChange }: { label: string; value: any; onChange: (v: any) => void }) => (
  <div><label style={{ fontSize: 12, color: '#666', display: 'block', marginBottom: 4 }}>{label}</label>
    <input type="number" value={value} onChange={e => onChange(parseFloat(e.target.value) || 0)} style={inputStyle} /></div>
);

const Tag = ({ children }: any) => (
  <span style={{ background: '#e6f7ff', padding: '2px 8px', borderRadius: 4, fontSize: 12 }}>{children}</span>
);
const btnPrimary: any = { padding: '8px 20px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 14, cursor: 'pointer' };
const smallBtn: any = { padding: '4px 12px', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 12, cursor: 'pointer' };
const inputStyle: any = { padding: '8px 12px', border: '1px solid #d9d9d9', borderRadius: 4, fontSize: 13, width: '100%', boxSizing: 'border-box' };
const th: any = { padding: '10px 12px', textAlign: 'left', fontSize: 13, borderBottom: '2px solid #e8e8e8' };
const td: any = { padding: '8px 12px', fontSize: 13 };

export default Products;
