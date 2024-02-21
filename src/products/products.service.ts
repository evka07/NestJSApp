import { Injectable } from '@nestjs/common';
import { db, Product } from './../db';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  public getAll(): Product[] {
    return db.products;
  }

  public create(productData: Omit<Product, 'id'>): Product {
    const newProduct = { ...productData, id: uuidv4() };
    db.products.push(newProduct);
    return newProduct;
  }
  public getById(id: string): Product | null {
    return db.products.find((p) => p.id === id);
  }

  public delete(id: string): void {
    db.products = db.products.filter((product) => product.id !== id);
  }
}
