import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { ProductsService, Product } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  findAll(@Query() query: { series?: string; status?: string; search?: string }) {
    return this.productsService.findAll(query);
  }

  @Get('series')
  getSeries() {
    return this.productsService.getSeries();
  }

  @Get('low-stock')
  getLowStock() {
    return this.productsService.getLowStock();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const product = this.productsService.findOne(+id);
    if (!product) return { statusCode: 404, message: 'Product not found' };
    return product;
  }

  @Post()
  create(@Body() data: Omit<Product, 'id'>) {
    return this.productsService.create(data);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: Partial<Product>) {
    const product = this.productsService.update(+id, data);
    if (!product) return { statusCode: 404, message: 'Product not found' };
    return product;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    const deleted = this.productsService.delete(+id);
    if (!deleted) return { statusCode: 404, message: 'Product not found' };
    return { message: 'Deleted successfully' };
  }
}
