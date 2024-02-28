import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/interceptors/services/prisma.service';
import { Product } from '@prisma/client';


@Injectable()
export class ProductsService {

  constructor(private prismaService: PrismaService) {}


public getAllExtended(): Promise<Product[]> {
  return this.prismaService.product.findMany({
    include: { orders: true },
  });
}

public getAllProducts(): Promise<Product[]> {
  return this.prismaService.product.findMany({
  });
}


public getExtendedById(id: Product['id']): Promise<Product | null> {
  return this.prismaService.product.findUnique({
    where: { id },
    include: { orders: true },
  });
}


public getById(id: Product['id']): Promise<Product | null> {
  return this.prismaService.product.findUnique({
    where: { id },
  });
}


  public deleteById(id: Product['id']): Promise<Product> {
  return this.prismaService.product.delete({
    where: { id },
  });
}

public create(
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
  return this.prismaService.product.create({
    data: productData,
  });
}

  public updateById(
  id: Product['id'],
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>,
  ): Promise<Product> {
  return this.prismaService.product.update({
    where: { id },
    data: productData,
  });
}
}
