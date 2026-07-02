import { Controller, Post, Body } from '@nestjs/common';
import { InventoryService } from './inventory.service';
@Controller('inventory')
export class InventoryController {
  constructor(private readonly service: InventoryService) {}
  @Post('check-stock') checkStock(@Body('productIds') ids: number[]) { return this.service.checkMaterialStock(ids); }
}
