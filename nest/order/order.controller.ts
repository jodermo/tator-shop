import { Get, Post, Controller, Param, Body, Delete, Patch } from '@nestjs/common';
import { OrderService } from './order.service';
import { Order } from './order.entity';

@Controller('api/order')
export class OrderController {
    constructor(private readonly dataService: OrderService) {
    }

    @Get()
    getEntries(): Promise<Order[]> {
        return this.dataService.findAll();
    }

    @Get(':id')
    getOrderById(@Param() params: Order): Promise<Order> {
        return this.dataService.findById(params.id);
    }

    @Post()
    createOrder(@Body() body: Order) {
        if (body) {
            return this.dataService.createOrder(body);
        }
    }

    @Patch(':id')
    updateOrder(@Param() params: Order, @Body() body: Order) {
        if (body) {
            return this.dataService.updateOrder(params.id, body);
        }
    }

    @Delete(':id')
    deleteOrder(@Param() params: Order) {
        return this.dataService.deleteOrder(params.id);
    }
}
