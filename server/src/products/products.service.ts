import { Injectable } from '@nestjs/common';

export interface Product {
  id: number;
  code: string;
  name: string;
  series: string;
  modelType?: string;
  spec?: string;
  unit: string;
  costPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  status: string;
  description?: string;
}

// In-memory storage — will replace with Prisma after DB setup
let products: Product[] = [
  // ==================== SG Series - 高扭矩型滚珠线性滑轨 ====================
  // SGH-A 法兰型滑块 (标准型)
  { id: 1, code: 'SGH15CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '15', unit: '个', costPrice: 120, sellPrice: 220, stock: 200, minStock: 50, status: 'active' },
  { id: 2, code: 'SGH20CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '20', unit: '个', costPrice: 150, sellPrice: 280, stock: 180, minStock: 40, status: 'active' },
  { id: 3, code: 'SGH25CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '25', unit: '个', costPrice: 200, sellPrice: 360, stock: 150, minStock: 30, status: 'active' },
  { id: 4, code: 'SGH30CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '30', unit: '个', costPrice: 280, sellPrice: 480, stock: 120, minStock: 25, status: 'active' },
  { id: 5, code: 'SGH35CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '35', unit: '个', costPrice: 360, sellPrice: 620, stock: 100, minStock: 20, status: 'active' },
  { id: 6, code: 'SGH45CA', name: 'SG高扭矩法兰型滑块', series: 'SG', modelType: 'CA', spec: '45', unit: '个', costPrice: 520, sellPrice: 880, stock: 80, minStock: 15, status: 'active' },
  // SGH-AL 法兰型加长滑块
  { id: 7, code: 'SGH20CAL', name: 'SG法兰型加长滑块', series: 'SG', modelType: 'CAL', spec: '20', unit: '个', costPrice: 190, sellPrice: 340, stock: 100, minStock: 25, status: 'active' },
  { id: 8, code: 'SGH25CAL', name: 'SG法兰型加长滑块', series: 'SG', modelType: 'CAL', spec: '25', unit: '个', costPrice: 260, sellPrice: 460, stock: 80, minStock: 20, status: 'active' },
  { id: 9, code: 'SGH30CAL', name: 'SG法兰型加长滑块', series: 'SG', modelType: 'CAL', spec: '30', unit: '个', costPrice: 360, sellPrice: 620, stock: 60, minStock: 15, status: 'active' },
  { id: 10, code: 'SGH35CAL', name: 'SG法兰型加长滑块', series: 'SG', modelType: 'CAL', spec: '35', unit: '个', costPrice: 460, sellPrice: 780, stock: 50, minStock: 10, status: 'active' },
  { id: 11, code: 'SGH45CAL', name: 'SG法兰型加长滑块', series: 'SG', modelType: 'CAL', spec: '45', unit: '个', costPrice: 680, sellPrice: 1150, stock: 40, minStock: 10, status: 'active' },
  // SGS-CA 滑块型
  { id: 12, code: 'SGS15CA', name: 'SG滑块型', series: 'SG', modelType: 'CA', spec: '15', unit: '个', costPrice: 100, sellPrice: 190, stock: 200, minStock: 50, status: 'active' },
  { id: 13, code: 'SGS20CA', name: 'SG滑块型', series: 'SG', modelType: 'CA', spec: '20', unit: '个', costPrice: 130, sellPrice: 240, stock: 160, minStock: 40, status: 'active' },
  { id: 14, code: 'SGS25CA', name: 'SG滑块型', series: 'SG', modelType: 'CA', spec: '25', unit: '个', costPrice: 170, sellPrice: 310, stock: 130, minStock: 30, status: 'active' },
  { id: 15, code: 'SGS30CA', name: 'SG滑块型', series: 'SG', modelType: 'CA', spec: '30', unit: '个', costPrice: 240, sellPrice: 420, stock: 100, minStock: 20, status: 'active' },
  { id: 16, code: 'SGS35CA', name: 'SG滑块型', series: 'SG', modelType: 'CA', spec: '35', unit: '个', costPrice: 310, sellPrice: 530, stock: 80, minStock: 15, status: 'active' },
  { id: 17, code: 'SGS45CA', name: 'SG滑块型', series: 'SG', modelType: 'CA', spec: '45', unit: '个', costPrice: 450, sellPrice: 760, stock: 60, minStock: 10, status: 'active' },
  // SG导轨 (R)
  { id: 18, code: 'SGH15R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '15', unit: '米', costPrice: 80, sellPrice: 150, stock: 500, minStock: 100, status: 'active' },
  { id: 19, code: 'SGH20R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '20', unit: '米', costPrice: 110, sellPrice: 200, stock: 400, minStock: 80, status: 'active' },
  { id: 20, code: 'SGH25R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '25', unit: '米', costPrice: 150, sellPrice: 270, stock: 350, minStock: 80, status: 'active' },
  { id: 21, code: 'SGH30R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '30', unit: '米', costPrice: 220, sellPrice: 380, stock: 300, minStock: 60, status: 'active' },
  { id: 22, code: 'SGH35R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '35', unit: '米', costPrice: 300, sellPrice: 510, stock: 250, minStock: 50, status: 'active' },
  { id: 23, code: 'SGH45R', name: 'SG高扭矩导轨', series: 'SG', modelType: 'R', spec: '45', unit: '米', costPrice: 450, sellPrice: 750, stock: 200, minStock: 40, status: 'active' },

    // SGH-B 下锁法兰型滑块 (标准)
  { id: 46, code: 'SGH15B', name: 'SG下锁法兰型滑块', series: 'SG', modelType: 'B', spec: '15', unit: '个', costPrice: 130, sellPrice: 230, stock: 180, minStock: 40, status: 'active' },
  { id: 47, code: 'SGH20B', name: 'SG下锁法兰型滑块', series: 'SG', modelType: 'B', spec: '20', unit: '个', costPrice: 160, sellPrice: 290, stock: 160, minStock: 35, status: 'active' },
  { id: 48, code: 'SGH25B', name: 'SG下锁法兰型滑块', series: 'SG', modelType: 'B', spec: '25', unit: '个', costPrice: 210, sellPrice: 380, stock: 130, minStock: 25, status: 'active' },
  { id: 49, code: 'SGH30B', name: 'SG下锁法兰型滑块', series: 'SG', modelType: 'B', spec: '30', unit: '个', costPrice: 290, sellPrice: 500, stock: 100, minStock: 20, status: 'active' },
  { id: 50, code: 'SGH35B', name: 'SG下锁法兰型滑块', series: 'SG', modelType: 'B', spec: '35', unit: '个', costPrice: 380, sellPrice: 650, stock: 80, minStock: 15, status: 'active' },
  { id: 51, code: 'SGH45B', name: 'SG下锁法兰型滑块', series: 'SG', modelType: 'B', spec: '45', unit: '个', costPrice: 550, sellPrice: 920, stock: 60, minStock: 10, status: 'active' },
  // SGH-BL 下锁法兰型滑块 (加长)
  { id: 52, code: 'SGH20BL', name: 'SG下锁法兰加长滑块', series: 'SG', modelType: 'BL', spec: '20', unit: '个', costPrice: 200, sellPrice: 360, stock: 80, minStock: 20, status: 'active' },
  { id: 53, code: 'SGH25BL', name: 'SG下锁法兰加长滑块', series: 'SG', modelType: 'BL', spec: '25', unit: '个', costPrice: 270, sellPrice: 480, stock: 70, minStock: 15, status: 'active' },
  { id: 54, code: 'SGH30BL', name: 'SG下锁法兰加长滑块', series: 'SG', modelType: 'BL', spec: '30', unit: '个', costPrice: 370, sellPrice: 640, stock: 50, minStock: 12, status: 'active' },
  { id: 55, code: 'SGH35BL', name: 'SG下锁法兰加长滑块', series: 'SG', modelType: 'BL', spec: '35', unit: '个', costPrice: 490, sellPrice: 820, stock: 40, minStock: 10, status: 'active' },
  { id: 56, code: 'SGH45BL', name: 'SG下锁法兰加长滑块', series: 'SG', modelType: 'BL', spec: '45', unit: '个', costPrice: 700, sellPrice: 1180, stock: 30, minStock: 8, status: 'active' },
  // SGS-B 下锁滑块型 (标准)
  { id: 58, code: 'SGS15B', name: 'SG下锁滑块型', series: 'SG', modelType: 'B', spec: '15', unit: '个', costPrice: 110, sellPrice: 200, stock: 180, minStock: 40, status: 'active' },
  { id: 59, code: 'SGS20B', name: 'SG下锁滑块型', series: 'SG', modelType: 'B', spec: '20', unit: '个', costPrice: 140, sellPrice: 250, stock: 150, minStock: 35, status: 'active' },
  { id: 60, code: 'SGS25B', name: 'SG下锁滑块型', series: 'SG', modelType: 'B', spec: '25', unit: '个', costPrice: 180, sellPrice: 320, stock: 120, minStock: 25, status: 'active' },
  { id: 61, code: 'SGS30B', name: 'SG下锁滑块型', series: 'SG', modelType: 'B', spec: '30', unit: '个', costPrice: 250, sellPrice: 440, stock: 90, minStock: 20, status: 'active' },
  { id: 62, code: 'SGS35B', name: 'SG下锁滑块型', series: 'SG', modelType: 'B', spec: '35', unit: '个', costPrice: 330, sellPrice: 560, stock: 70, minStock: 15, status: 'active' },
  // SGS-BS 下锁短型滑块
  { id: 63, code: 'SGS15BS', name: 'SG下锁短型滑块', series: 'SG', modelType: 'BS', spec: '15', unit: '个', costPrice: 95, sellPrice: 175, stock: 160, minStock: 35, status: 'active' },
  { id: 64, code: 'SGS20BS', name: 'SG下锁短型滑块', series: 'SG', modelType: 'BS', spec: '20', unit: '个', costPrice: 120, sellPrice: 220, stock: 130, minStock: 30, status: 'active' },
  { id: 65, code: 'SGS25BS', name: 'SG下锁短型滑块', series: 'SG', modelType: 'BS', spec: '25', unit: '个', costPrice: 155, sellPrice: 280, stock: 100, minStock: 20, status: 'active' },
  // SGS-BL 下锁长型滑块
  { id: 66, code: 'SGS25BL', name: 'SG下锁长型滑块', series: 'SG', modelType: 'BL', spec: '25', unit: '个', costPrice: 230, sellPrice: 410, stock: 60, minStock: 12, status: 'active' },
  { id: 67, code: 'SGS30BL', name: 'SG下锁长型滑块', series: 'SG', modelType: 'BL', spec: '30', unit: '个', costPrice: 320, sellPrice: 550, stock: 45, minStock: 10, status: 'active' },
  { id: 68, code: 'SGS35BL', name: 'SG下锁长型滑块', series: 'SG', modelType: 'BL', spec: '35', unit: '个', costPrice: 430, sellPrice: 730, stock: 35, minStock: 8, status: 'active' },

    // SGS-AS 短型滑块
  { id: 57, code: 'SGS20AS', name: 'SG短型滑块', series: 'SG', modelType: 'AS', spec: '20', unit: '个', costPrice: 120, sellPrice: 220, stock: 140, minStock: 30, status: 'active' },

  // ==================== SM Series - 高静音重负荷型 ====================
  { id: 24, code: 'SMH20CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '20', unit: '个', costPrice: 180, sellPrice: 320, stock: 150, minStock: 30, status: 'active' },
  { id: 25, code: 'SMH25CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '25', unit: '个', costPrice: 240, sellPrice: 420, stock: 120, minStock: 25, status: 'active' },
  { id: 26, code: 'SMH30CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '30', unit: '个', costPrice: 330, sellPrice: 560, stock: 100, minStock: 20, status: 'active' },
  { id: 27, code: 'SMH35CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '35', unit: '个', costPrice: 420, sellPrice: 720, stock: 80, minStock: 15, status: 'active' },
  { id: 28, code: 'SMH45CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '45', unit: '个', costPrice: 600, sellPrice: 1020, stock: 60, minStock: 10, status: 'active' },
  { id: 29, code: 'SMH25R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '25', unit: '米', costPrice: 180, sellPrice: 310, stock: 300, minStock: 60, status: 'active' },
  { id: 30, code: 'SMH35R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '35', unit: '米', costPrice: 350, sellPrice: 590, stock: 200, minStock: 40, status: 'active' },
  { id: 31, code: 'SMH45R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '45', unit: '米', costPrice: 510, sellPrice: 860, stock: 150, minStock: 30, status: 'active' },

  // SMH-AL 法兰型加长滑块
  { id: 69, code: 'SMH20CAL', name: 'SM高静音法兰加长滑块', series: 'SM', modelType: 'CAL', spec: '20', unit: '个', costPrice: 230, sellPrice: 400, stock: 80, minStock: 15, status: 'active' },
  { id: 70, code: 'SMH25CAL', name: 'SM高静音法兰加长滑块', series: 'SM', modelType: 'CAL', spec: '25', unit: '个', costPrice: 310, sellPrice: 540, stock: 60, minStock: 12, status: 'active' },
  { id: 71, code: 'SMH30CAL', name: 'SM高静音法兰加长滑块', series: 'SM', modelType: 'CAL', spec: '30', unit: '个', costPrice: 430, sellPrice: 720, stock: 50, minStock: 10, status: 'active' },
  { id: 72, code: 'SMH35CAL', name: 'SM高静音法兰加长滑块', series: 'SM', modelType: 'CAL', spec: '35', unit: '个', costPrice: 550, sellPrice: 920, stock: 40, minStock: 10, status: 'active' },
  { id: 73, code: 'SMH45CAL', name: 'SM高静音法兰加长滑块', series: 'SM', modelType: 'CAL', spec: '45', unit: '个', costPrice: 780, sellPrice: 1300, stock: 30, minStock: 8, status: 'active' },
  // SMH - 大规格
  { id: 74, code: 'SMH55CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '55', unit: '个', costPrice: 1200, sellPrice: 2000, stock: 20, minStock: 5, status: 'active' },
  { id: 75, code: 'SMH65CA', name: 'SM高静音法兰型滑块', series: 'SM', modelType: 'CA', spec: '65', unit: '个', costPrice: 1800, sellPrice: 3000, stock: 15, minStock: 3, status: 'active' },
  { id: 76, code: 'SMH55CAL', name: 'SM高静音法兰加长滑块', series: 'SM', modelType: 'CAL', spec: '55', unit: '个', costPrice: 1600, sellPrice: 2600, stock: 12, minStock: 3, status: 'active' },
  { id: 77, code: 'SMH65CAL', name: 'SM高静音法兰加长滑块', series: 'SM', modelType: 'CAL', spec: '65', unit: '个', costPrice: 2400, sellPrice: 3900, stock: 10, minStock: 2, status: 'active' },
  // SM 导轨
  { id: 78, code: 'SMH20R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '20', unit: '米', costPrice: 130, sellPrice: 230, stock: 350, minStock: 70, status: 'active' },
  { id: 79, code: 'SMH30R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '30', unit: '米', costPrice: 260, sellPrice: 440, stock: 250, minStock: 50, status: 'active' },
  { id: 80, code: 'SMH55R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '55', unit: '米', costPrice: 800, sellPrice: 1350, stock: 100, minStock: 20, status: 'active' },
  { id: 81, code: 'SMH65R', name: 'SM高静音导轨', series: 'SM', modelType: 'R', spec: '65', unit: '米', costPrice: 1100, sellPrice: 1850, stock: 80, minStock: 15, status: 'active' },

  // ==================== SMS Series - 高静音滑块型 ====================
  // SMS-A 滑块型 (标准)
  { id: 82, code: 'SMS15A', name: 'SM高静音滑块型', series: 'SM', modelType: 'A', spec: '15', unit: '个', costPrice: 120, sellPrice: 220, stock: 150, minStock: 30, status: 'active' },
  { id: 83, code: 'SMS20A', name: 'SM高静音滑块型', series: 'SM', modelType: 'A', spec: '20', unit: '个', costPrice: 155, sellPrice: 280, stock: 130, minStock: 30, status: 'active' },
  { id: 84, code: 'SMS25A', name: 'SM高静音滑块型', series: 'SM', modelType: 'A', spec: '25', unit: '个', costPrice: 210, sellPrice: 380, stock: 100, minStock: 20, status: 'active' },
  { id: 85, code: 'SMS30A', name: 'SM高静音滑块型', series: 'SM', modelType: 'A', spec: '30', unit: '个', costPrice: 285, sellPrice: 490, stock: 80, minStock: 20, status: 'active' },
  { id: 86, code: 'SMS35A', name: 'SM高静音滑块型', series: 'SM', modelType: 'A', spec: '35', unit: '个', costPrice: 380, sellPrice: 650, stock: 60, minStock: 15, status: 'active' },
  { id: 87, code: 'SMS45A', name: 'SM高静音滑块型', series: 'SM', modelType: 'A', spec: '45', unit: '个', costPrice: 550, sellPrice: 920, stock: 40, minStock: 10, status: 'active' },
  // SMS-AS 短型滑块
  { id: 88, code: 'SMS15AS', name: 'SM高静音短型滑块', series: 'SM', modelType: 'AS', spec: '15', unit: '个', costPrice: 100, sellPrice: 180, stock: 130, minStock: 25, status: 'active' },
  { id: 89, code: 'SMS20AS', name: 'SM高静音短型滑块', series: 'SM', modelType: 'AS', spec: '20', unit: '个', costPrice: 130, sellPrice: 240, stock: 120, minStock: 25, status: 'active' },
  { id: 90, code: 'SMS25AS', name: 'SM高静音短型滑块', series: 'SM', modelType: 'AS', spec: '25', unit: '个', costPrice: 175, sellPrice: 320, stock: 90, minStock: 18, status: 'active' },
  { id: 91, code: 'SMS30AS', name: 'SM高静音短型滑块', series: 'SM', modelType: 'AS', spec: '30', unit: '个', costPrice: 240, sellPrice: 420, stock: 70, minStock: 15, status: 'active' },
  { id: 92, code: 'SMS35AS', name: 'SM高静音短型滑块', series: 'SM', modelType: 'AS', spec: '35', unit: '个', costPrice: 320, sellPrice: 550, stock: 50, minStock: 10, status: 'active' },

    // SMH-B 下锁法兰型 (标准)
  { id: 93, code: 'SMH15B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '15', unit: '个', costPrice: 140, sellPrice: 250, stock: 120, minStock: 25, status: 'active' },
  { id: 94, code: 'SMH20B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '20', unit: '个', costPrice: 190, sellPrice: 340, stock: 100, minStock: 20, status: 'active' },
  { id: 95, code: 'SMH25B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '25', unit: '个', costPrice: 250, sellPrice: 440, stock: 80, minStock: 15, status: 'active' },
  { id: 96, code: 'SMH30B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '30', unit: '个', costPrice: 350, sellPrice: 600, stock: 60, minStock: 12, status: 'active' },
  { id: 97, code: 'SMH35B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '35', unit: '个', costPrice: 440, sellPrice: 750, stock: 50, minStock: 10, status: 'active' },
  { id: 98, code: 'SMH45B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '45', unit: '个', costPrice: 630, sellPrice: 1050, stock: 35, minStock: 8, status: 'active' },
  { id: 99, code: 'SMH55B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '55', unit: '个', costPrice: 1250, sellPrice: 2100, stock: 20, minStock: 5, status: 'active' },
  { id: 100, code: 'SMH65B', name: 'SM下锁法兰型滑块', series: 'SM', modelType: 'B', spec: '65', unit: '个', costPrice: 1900, sellPrice: 3200, stock: 12, minStock: 3, status: 'active' },
  // SMH-BL 下锁法兰型 (加长)
  { id: 101, code: 'SMH20BL', name: 'SM下锁法兰加长滑块', series: 'SM', modelType: 'BL', spec: '20', unit: '个', costPrice: 240, sellPrice: 420, stock: 60, minStock: 12, status: 'active' },
  { id: 102, code: 'SMH25BL', name: 'SM下锁法兰加长滑块', series: 'SM', modelType: 'BL', spec: '25', unit: '个', costPrice: 320, sellPrice: 560, stock: 50, minStock: 10, status: 'active' },
  { id: 103, code: 'SMH30BL', name: 'SM下锁法兰加长滑块', series: 'SM', modelType: 'BL', spec: '30', unit: '个', costPrice: 450, sellPrice: 760, stock: 40, minStock: 8, status: 'active' },
  { id: 104, code: 'SMH35BL', name: 'SM下锁法兰加长滑块', series: 'SM', modelType: 'BL', spec: '35', unit: '个', costPrice: 580, sellPrice: 960, stock: 30, minStock: 6, status: 'active' },
  { id: 105, code: 'SMH45BL', name: 'SM下锁法兰加长滑块', series: 'SM', modelType: 'BL', spec: '45', unit: '个', costPrice: 820, sellPrice: 1360, stock: 20, minStock: 5, status: 'active' },
  { id: 106, code: 'SMH55BL', name: 'SM下锁法兰加长滑块', series: 'SM', modelType: 'BL', spec: '55', unit: '个', costPrice: 1650, sellPrice: 2750, stock: 12, minStock: 3, status: 'active' },
  { id: 107, code: 'SMH65BL', name: 'SM下锁法兰加长滑块', series: 'SM', modelType: 'BL', spec: '65', unit: '个', costPrice: 2500, sellPrice: 4100, stock: 8, minStock: 2, status: 'active' },

    // SMS-B 下锁滑块型 (标准)
  { id: 108, code: 'SMS15B', name: 'SM下锁滑块型', series: 'SM', modelType: 'B', spec: '15', unit: '个', costPrice: 130, sellPrice: 240, stock: 120, minStock: 25, status: 'active' },
  { id: 109, code: 'SMS20B', name: 'SM下锁滑块型', series: 'SM', modelType: 'B', spec: '20', unit: '个', costPrice: 165, sellPrice: 300, stock: 100, minStock: 20, status: 'active' },
  { id: 110, code: 'SMS25B', name: 'SM下锁滑块型', series: 'SM', modelType: 'B', spec: '25', unit: '个', costPrice: 220, sellPrice: 400, stock: 80, minStock: 15, status: 'active' },
  { id: 111, code: 'SMS30B', name: 'SM下锁滑块型', series: 'SM', modelType: 'B', spec: '30', unit: '个', costPrice: 300, sellPrice: 520, stock: 60, minStock: 12, status: 'active' },
  { id: 112, code: 'SMS35B', name: 'SM下锁滑块型', series: 'SM', modelType: 'B', spec: '35', unit: '个', costPrice: 400, sellPrice: 680, stock: 45, minStock: 10, status: 'active' },
  { id: 113, code: 'SMS45B', name: 'SM下锁滑块型', series: 'SM', modelType: 'B', spec: '45', unit: '个', costPrice: 580, sellPrice: 980, stock: 30, minStock: 8, status: 'active' },
  // SMS-BS 下锁短型滑块
  { id: 114, code: 'SMS15BS', name: 'SM下锁短型滑块', series: 'SM', modelType: 'BS', spec: '15', unit: '个', costPrice: 105, sellPrice: 195, stock: 110, minStock: 20, status: 'active' },
  { id: 115, code: 'SMS20BS', name: 'SM下锁短型滑块', series: 'SM', modelType: 'BS', spec: '20', unit: '个', costPrice: 135, sellPrice: 250, stock: 90, minStock: 18, status: 'active' },
  { id: 116, code: 'SMS25BS', name: 'SM下锁短型滑块', series: 'SM', modelType: 'BS', spec: '25', unit: '个', costPrice: 185, sellPrice: 340, stock: 70, minStock: 15, status: 'active' },
  { id: 117, code: 'SMS30BS', name: 'SM下锁短型滑块', series: 'SM', modelType: 'BS', spec: '30', unit: '个', costPrice: 255, sellPrice: 440, stock: 55, minStock: 10, status: 'active' },
  { id: 118, code: 'SMS35BS', name: 'SM下锁短型滑块', series: 'SM', modelType: 'BS', spec: '35', unit: '个', costPrice: 340, sellPrice: 580, stock: 40, minStock: 8, status: 'active' },

    // ==================== SR Series - 滚柱型直线导轨 ====================
  { id: 32, code: 'SRH25CA', name: 'SR滚柱型法兰滑块', series: 'SR', modelType: 'CA', spec: '25', unit: '个', costPrice: 380, sellPrice: 650, stock: 100, minStock: 20, status: 'active' },
  { id: 33, code: 'SRH30CA', name: 'SR滚柱型法兰滑块', series: 'SR', modelType: 'CA', spec: '30', unit: '个', costPrice: 520, sellPrice: 880, stock: 80, minStock: 15, status: 'active' },
  { id: 34, code: 'SRH35CA', name: 'SR滚柱型法兰滑块', series: 'SR', modelType: 'CA', spec: '35', unit: '个', costPrice: 680, sellPrice: 1150, stock: 60, minStock: 15, status: 'active' },
  { id: 35, code: 'SRH45CA', name: 'SR滚柱型法兰滑块', series: 'SR', modelType: 'CA', spec: '45', unit: '个', costPrice: 920, sellPrice: 1550, stock: 40, minStock: 10, status: 'active' },
  { id: 36, code: 'SRH25R', name: 'SR滚柱型导轨', series: 'SR', modelType: 'R', spec: '25', unit: '米', costPrice: 280, sellPrice: 480, stock: 150, minStock: 30, status: 'active' },
  { id: 37, code: 'SRH35R', name: 'SR滚柱型导轨', series: 'SR', modelType: 'R', spec: '35', unit: '米', costPrice: 520, sellPrice: 880, stock: 100, minStock: 20, status: 'active' },

  // ==================== SV Series - 微型滑轨 ====================
  { id: 38, code: 'SV7CA', name: 'SV微型滑块', series: 'SV', modelType: 'CA', spec: '7', unit: '个', costPrice: 35, sellPrice: 65, stock: 300, minStock: 50, status: 'active' },
  { id: 39, code: 'SV9CA', name: 'SV微型滑块', series: 'SV', modelType: 'CA', spec: '9', unit: '个', costPrice: 45, sellPrice: 85, stock: 300, minStock: 50, status: 'active' },
  { id: 40, code: 'SV12CA', name: 'SV微型滑块', series: 'SV', modelType: 'CA', spec: '12', unit: '个', costPrice: 60, sellPrice: 110, stock: 250, minStock: 40, status: 'active' },
  { id: 41, code: 'SV15CA', name: 'SV微型滑块', series: 'SV', modelType: 'CA', spec: '15', unit: '个', costPrice: 80, sellPrice: 145, stock: 200, minStock: 30, status: 'active' },
  { id: 42, code: 'SV7R', name: 'SV微型导轨', series: 'SV', modelType: 'R', spec: '7', unit: '米', costPrice: 25, sellPrice: 50, stock: 400, minStock: 80, status: 'active' },
  { id: 43, code: 'SV9R', name: 'SV微型导轨', series: 'SV', modelType: 'R', spec: '9', unit: '米', costPrice: 35, sellPrice: 65, stock: 400, minStock: 80, status: 'active' },
  { id: 44, code: 'SV12R', name: 'SV微型导轨', series: 'SV', modelType: 'R', spec: '12', unit: '米', costPrice: 45, sellPrice: 85, stock: 300, minStock: 60, status: 'active' },
  { id: 45, code: 'SV15R', name: 'SV微型导轨', series: 'SV', modelType: 'R', spec: '15', unit: '米', costPrice: 60, sellPrice: 110, stock: 250, minStock: 50, status: 'active' },
];

let nextId = 119;let nextId = 22;

@Injectable()
export class ProductsService {
  findAll(query?: { series?: string; status?: string; search?: string }): Product[] {
    let result = [...products];
    if (query?.series) result = result.filter(p => p.series === query.series);
    if (query?.status) result = result.filter(p => p.status === query.status);
    if (query?.search) {
      const s = query.search.toLowerCase();
      result = result.filter(p => 
        p.code.toLowerCase().includes(s) || 
        p.name.toLowerCase().includes(s)
      );
    }
    return result;
  }

  findOne(id: number): Product | undefined {
    return products.find(p => p.id === id);
  }

  findByCode(code: string): Product | undefined {
    return products.find(p => p.code === code);
  }

  create(data: Omit<Product, 'id'>): Product {
    const product = { id: nextId++, ...data };
    products.push(product);
    return product;
  }

  update(id: number, data: Partial<Product>): Product | undefined {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return undefined;
    products[idx] = { ...products[idx], ...data };
    return products[idx];
  }

  delete(id: number): boolean {
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return false;
    products.splice(idx, 1);
    return true;
  }

  getLowStock(): Product[] {
    return products.filter(p => p.stock <= p.minStock && p.status === 'active');
  }

  getSeries(): string[] {
    return [...new Set(products.map(p => p.series))];
  }
}
