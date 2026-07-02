import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { InventoryModule } from './inventory/inventory.module';
import { ReportsModule } from './reports/reports.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ProductsModule,
    CustomersModule,
    OrdersModule,
    InventoryModule,
    ReportsModule,
    AuthModule,
  ],
})
export class AppModule {}
