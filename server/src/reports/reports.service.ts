import { Injectable } from '@nestjs/common';

@Injectable()
export class ReportsService {
  getDashboard() {
    return {
      monthlySales: 62261,
      monthlyOrders: 45,
      totalCustomers: 86,
      lowStockItems: 3,
      salesGrowth: '+170%',
      targetAchievement: '65%',
    };
  }
}
