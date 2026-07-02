import { Injectable } from '@nestjs/common';
@Injectable()
export class InventoryService {
  checkMaterialStock(productIds: number[]) {
    return { message: 'Material stock check endpoint - will integrate with Prisma' };
  }
}
