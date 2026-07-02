import React, { useState } from 'react';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Customers from './pages/Customers';
import Orders from './pages/Orders';

type Page = 'dashboard' | 'products' | 'customers' | 'orders';

function App() {
  const [page, setPage] = useState<Page>('dashboard');
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));

  const navItems: { key: Page; label: string; icon: string }[] = [
    { key: 'dashboard', label: '数据看板', icon: '📊' },
    { key: 'products', label: '产品管理', icon: '📦' },
    { key: 'customers', label: '客户管理', icon: '👥' },
    { key: 'orders', label: '订单管理', icon: '📋' },
  ];

  if (!loggedIn) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f0f2f5' }}>
        <div style={{ background: '#fff', padding: 40, borderRadius: 8, boxShadow: '0 2px 12px rgba(0,0,0,0.1)', width: 360 }}>
          <h2 style={{ textAlign: 'center', marginBottom: 8 }}>利尼尔CRM</h2>
          <p style={{ textAlign: 'center', color: '#999', marginBottom: 24, fontSize: 13 }}>福建利尼尔工业装备有限公司</p>
          <input placeholder="用户名" id="username" defaultValue="admin" style={inputStyle} />
          <input placeholder="密码" type="password" id="password" defaultValue="admin123" style={inputStyle} onKeyDown={e => e.key === 'Enter' && setLoggedIn(true)} />
          <button onClick={() => setLoggedIn(true)} style={{ width: '100%', padding: '10px 0', background: '#1890ff', color: '#fff', border: 'none', borderRadius: 4, fontSize: 16, cursor: 'pointer' }}>
            登录
          </button>
          <p style={{ textAlign: 'center', color: '#ccc', marginTop: 16, fontSize: 12 }}>demo: admin / admin123</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: 220, background: '#001529', color: '#fff', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: 18, fontWeight: 'bold' }}>利尼尔CRM</div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>销售管理系统 v1.0</div>
        </div>
        {navItems.map(item => (
          <div key={item.key}
            onClick={() => setPage(item.key)}
            style={{
              padding: '14px 24px', cursor: 'pointer', transition: 'all 0.2s', fontSize: 14,
              background: page === item.key ? '#1890ff' : 'transparent',
              borderLeft: page === item.key ? '3px solid #fff' : '3px solid transparent'
            }}
          >
            {item.icon} {item.label}
          </div>
        ))}
        <div style={{ flex: 1 }} />
        <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.1)', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => { localStorage.removeItem('token'); setLoggedIn(false); }}>退出登录</span>
        </div>
      </div>
      <div style={{ flex: 1, background: '#f0f2f5', overflow: 'auto' }}>
        {page === 'dashboard' && <Dashboard />}
        {page === 'products' && <Products />}
        {page === 'customers' && <Customers />}
        {page === 'orders' && <Orders />}
      </div>
    </div>
  );
}

const inputStyle: any = {
  width: '100%', padding: '10px 12px', marginBottom: 16, border: '1px solid #d9d9d9',
  borderRadius: 4, fontSize: 14, boxSizing: 'border-box'
};

export default App;
