# 利尼尔CRM销售管理系统

福建利尼尔工业装备有限公司 — 直线导轨/线性模组销售管理平台

## 技术栈

- **前端**: React + Ant Design Pro + TypeScript
- **后端**: NestJS + Prisma + PostgreSQL
- **认证**: JWT
- **部署**: Docker + 阿里云

## 系统模块

- 基础档案（产品/原料/客户/供应商）
- 销售管理（商机/跟进/签到/报价）
- 订单管理（订单/出库/自动算料）
- 财务模块（费用报销）
- 数据洞察（经营看板/绩效分析）

## 开发

```bash
# 后端
cd server
npm install
npx prisma migrate dev
npm run start:dev

# 前端
cd web
npm install
npm run dev
```
