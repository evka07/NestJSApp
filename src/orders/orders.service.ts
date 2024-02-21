import { Injectable } from '@nestjs/common';
import { db, Order } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public create(orderData: Omit<Order, 'id' | 'productId'>): Order {
    const newOrder = { ...orderData, id: uuidv4(), productId: uuidv4() };
    db.orders.push(newOrder);
    return newOrder;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((p) => p.id === id);
  }

  public updateById(
      id: Order['id'],
      orderData: Omit<Order, 'id' | 'productId'>,
  ): void {
    db.orders = db.orders.map((order) => {
      if (order.id === id) {
        return { ...order, ...orderData };
      }
      return order;
    });
  }

  public delete(id: string): void {
    db.orders = db.orders.filter((order) => order.id !== id);
  }
}