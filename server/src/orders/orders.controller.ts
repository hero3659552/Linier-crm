import { Controller, Get, Post, Put, Param, Body, Query } from '@nestjs/common';
import { OrdersService, Order } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly service: OrdersService) {}
  @Get() findAll() { return this.service.findAll(); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id) || { statusCode: 404 }; }
  @Post() create(@Body() data: any) { return this.service.create(data); }
  @Put(':id/status') updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.service.updateStatus(+id, status) || { statusCode: 404 };
  }
}
