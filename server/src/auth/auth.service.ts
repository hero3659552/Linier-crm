import { Injectable } from '@nestjs/common';

interface User { id: number; username: string; password: string; name: string; role: string; }
const users: User[] = [
  { id: 1, username: 'admin', password: 'admin123', name: '系统管理员', role: 'ADMIN' },
  { id: 2, username: 'sales1', password: 'sales123', name: '张三', role: 'SALES' },
];

@Injectable()
export class AuthService {
  login(username: string, password: string) {
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) return null;
    const { password: _, ...safe } = user;
    return { token: 'linier-jwt-' + Buffer.from(JSON.stringify(safe)).toString('base64'), user: safe };
  }
}
