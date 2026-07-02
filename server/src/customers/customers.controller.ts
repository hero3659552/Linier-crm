import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CustomersService, Customer } from './customers.service';

@Controller('customers')
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @Get() findAll(@Query() q: any) { return this.service.findAll(q); }
  @Get(':id') findOne(@Param('id') id: string) { return this.service.findOne(+id) || { statusCode: 404, message: 'Not found' }; }
  @Post() create(@Body() data: Omit<Customer, 'id'>) { return this.service.create(data); }
  @Put(':id') update(@Param('id') id: string, @Body() data: Partial<Customer>) { return this.service.update(+id, data) || { statusCode: 404, message: 'Not found' }; }
  @Delete(':id') delete(@Param('id') id: string) { return this.service.delete(+id) ? { message: 'Deleted' } : { statusCode: 404, message: 'Not found' }; }
}
