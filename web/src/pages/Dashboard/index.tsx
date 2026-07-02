import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';

const Dashboard: React.FC = () => {
  const [data, setData] = useState<any>(null);
  useEffect(() => { api.getDashboard().then(setData).catch(console.error); }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>📊 经营数据看板</h1>
      {data ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 24 }}>
          <Card title="月度销售额" value={`¥${data.monthlySales?.toLocaleString()}`} />
          <Card title="本月订单" value={data.monthlyOrders} />
          <Card title="客户总数" value={data.totalCustomers} />
          <Card title="库存预警" value={data.lowStockItems} color="red" />
          <Card title="销售增长" value={data.salesGrowth} />
          <Card title="目标达成" value={data.targetAchievement} />
        </div>
      ) : <p>加载中...</p>}
    </div>
  );
};

const Card = ({ title, value, color }: { title: string; value: any; color?: string }) => (
  <div style={{
    background: '#fff', borderRadius: 8, padding: '20px 24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)', borderTop: `4px solid ${color || '#1890ff'}`
  }}>
    <div style={{ fontSize: 14, color: '#666', marginBottom: 8 }}>{title}</div>
    <div style={{ fontSize: 28, fontWeight: 'bold', color: color || '#333' }}>{value}</div>
  </div>
);

export default Dashboard;
