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
  // Auth
  login: (username: string, password: string) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify({ username, password }) }),

  // Products
  getProducts: (params?: string) => request(`/products${params ? `?${params}` : ''}`),
  getProduct: (id: number) => request(`/products/${id}`),
  createProduct: (data: any) => request('/products', { method: 'POST', body: JSON.stringify(data) }),
  updateProduct: (id: number, data: any) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteProduct: (id: number) => request(`/products/${id}`, { method: 'DELETE' }),
  getLowStock: () => request('/products/low-stock'),
  getSeries: () => request('/products/series'),

  // Customers
  getCustomers: (params?: string) => request(`/customers${params ? `?${params}` : ''}`),
  getCustomer: (id: number) => request(`/customers/${id}`),
  createCustomer: (data: any) => request('/customers', { method: 'POST', body: JSON.stringify(data) }),
  updateCustomer: (id: number, data: any) => request(`/customers/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  deleteCustomer: (id: number) => request(`/customers/${id}`, { method: 'DELETE' }),

  // Orders
  getOrders: () => request('/orders'),
  getOrder: (id: number) => request(`/orders/${id}`),
  createOrder: (data: any) => request('/orders', { method: 'POST', body: JSON.stringify(data) }),
  updateOrderStatus: (id: number, status: string) => request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),

  // Reports
  getDashboard: () => request('/reports/dashboard'),
};
