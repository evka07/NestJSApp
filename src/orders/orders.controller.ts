import {
  Controller,
  Get,
  Param,
  Delete,
  Post,
  Body,
  Put,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { ParseUUIDPipe } from '@nestjs/common';
import { CreateOrderDTO } from './dtos/create-order.dto';
import { UpdateOrderDTO } from './dtos/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Get('/')
  async getAll() {
    return this.ordersService.getAll();
  }

  @Get('/:id')
  async getById(@Param('id') id: string) {
    const order = await this.ordersService.getById(id);
    if (!order) throw new NotFoundException('Product not found');
    return order;
  }

  @Delete('/:id')
  async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');

    await this.ordersService.deleteById(id);
    return { success: true };
  }

  @Post('/')
  create(@Body() orderData: CreateOrderDTO) {
    return this.ordersService.create(orderData);
  }

  @Put('/:id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() orderData: UpdateOrderDTO,
  ) {
    if (!(await this.ordersService.getById(id)))
      throw new NotFoundException('Order not found');

    await this.ordersService.updateById(id, orderData);
    return { success: true };
  }
}
