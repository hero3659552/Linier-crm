const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

async function request(path: string, options?: RequestInit) {
  const token = localStorage.getItem('token');
  const headers: any = { 'Content-Type': 'application/json', ...options?.headers };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

export const api = {
  login: (u: string, p: string) => request('/auth/login', { method: 'POST', body: JSON.stringify({ username: u, password: p }) }),

  getSliders: () => request('/products/sliders'),
  getRails: () => request('/products/rails'),
  createProduct: (data: any) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: number, data: any) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: number) => request(`/products/${id}`, { method: 'DELETE' }),
  batchDelete: (ids: number[]) => request('/products/batch-delete', { method: 'POST', body: JSON.stringify({ ids }) }),
  batchImport: (items: any[]) => request('/products/batch-import', { method: 'POST', body: JSON.stringify(items) }),
  exportAll: () => request('/products/export/all'),

  getCustomers: (params?: string) => request(`/customers${params ? `?${params}` : ''}`),
  createCustomer: (data: any) => request('/customers', { method: 'POST', body: JSON.stringify(data) }),
  getOrders: () => request('/orders'),
  createOrder: (data: any) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrderStatus: (id: number, s: string) => request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status: s }) }),
  getDashboard: () => request('/reports/dashboard'),
};

// Helper: get all products from both categories
export const getAllProducts = async () => {
  const [sliders, rails] = await Promise.all([api.getSliders(), api.getRails()]);
  return [...sliders, ...rails];
};
