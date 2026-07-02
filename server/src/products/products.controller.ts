import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductsService, Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly service: ProductsService) {}

  @Get('sliders')
  getSliders() { return this.service.findSliders(); }

  @Get('rails')
  getRails() { return this.service.findRails(); }

  @Get()
  findAll(@Query() q: any) { return this.service.findAll(); }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const p = this.service.findOne(+id);
    return p || { statusCode: 404, message: 'Not found' };
  }

  @Post()
  create(@Body() data: Omit<Product, 'id'>) { return this.service.create(data); }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Product>) {
    return this.service.update(+id, data) || { statusCode: 404 };
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.service.delete(+id) ? { message: 'Deleted' } : { statusCode: 404 };
  }

  @Post('batch-delete')
  batchDelete(@Body('ids') ids: number[]) {
    const count = this.service.batchDelete(ids);
    return { deleted: count };
  }

  @Post('batch-import')
  batchImport(@Body() items: Omit<Product, 'id'>[]) {
    const created = this.service.batchImport(items);
    return { imported: created.length, items: created };
  }

  @Get('export/all')
  exportAll() { return this.service.exportAll(); }
}
