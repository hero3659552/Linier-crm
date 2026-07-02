# 利尼尔CRM销售管理系统

福建利尼尔工业装备有限公司 — 直线导轨/线性模组销售管理平台

## 技术栈

- **前端**: React + TypeScript
- **后端**: NestJS + Prisma + PostgreSQL
- **认证**: JWT
- **部署**: Docker + 阿里云

## 快速启动

### 方式一：Docker（推荐）

```bash
docker-compose up -d
# 访问 http://localhost
```

### 方式二：本地开发

```bash
# 1. 启动数据库（需要本地安装PostgreSQL）
createdb linier_crm

# 2. 启动后端
cd server
cp .env.example .env    # 修改数据库连接信息
npm install
npx prisma migrate dev  # 创建数据库表
npm run start:dev       # API: http://localhost:3000/api

# 3. 启动前端（新终端）
cd web
npm install
npm start               # 页面: http://localhost:3000
```

### 默认登录

```
用户名: admin
密码:   admin123
```

## 系统模块

| 模块 | 状态 | 说明 |
|:----|:---:|------|
| 数据看板 | ✅ | 销售额/订单数/客户数/库存预警 |
| 产品管理 | ✅ | 四大系列(SG/SM/SR/SV) CRUD + 低库存预警 |
| 客户管理 | ✅ | 客户档案 + 新建+筛选 |
| 订单管理 | ✅ | 新建订单 + 多行明细 + 状态流转(报价→确认→出货) |
| 库存检查 | 🚧 | API已建，页面待完善 |
| 费用报销 | 🚧 | Schema已建 |
| 数据报表 | 🚧 | 详细报表页面待开发 |

## 产品数据（模拟）

系统内置了 **21个SKU** 覆盖四大系列：
- **SG** — 高扭矩型滚珠线性滑轨 (SGH15~45)
- **SM** — 高静音重负荷型 (SMH20~45)
- **SR** — 滚柱型直线导轨 (SRH25~45)
- **SV** — 微型滑轨 (7~15mm)

价格均为模拟数据，上线后可在系统中修改。

## 项目结构

```
linier-crm/
├── server/                  # NestJS 后端
│   ├── prisma/              # 数据库Schema
│   └── src/
│       ├── auth/            # 认证模块
│       ├── products/        # 产品模块
│       ├── customers/       # 客户模块
│       ├── orders/          # 订单模块
│       ├── inventory/       # 库存模块
│       ├── reports/         # 报表模块
│       └── common/          # 公共工具
├── web/                     # React 前端
│   └── src/
│       ├── pages/           # 页面组件
│       ├── services/        # API服务
│       └── components/      # 公共组件
├── 项目文档*.md             # 设计方案
└── docker-compose.yml       # Docker部署
```

## 数据库表（12张）

User / Product / ProductBom / Customer / Contact / Supplier /
Order / OrderItem / Shipment / ShipmentItem / Activity / PriceListItem / Expense
