import { Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Customer } from './entities/customer.entity';
import { Cart } from './entities/cart.entity';
import { ProductsService } from 'apps/catalog/src/products/products.service';

@Injectable()
export class AppService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly productService: ProductsService,
  ) {}

  async getOrCreate(customer: Customer): Promise<Cart> {
    const activeCart = await this.cartRepository.findActive(customer._id);

    if (activeCart) {
      return activeCart;
    }

    const newCart = await this.cartRepository.create({
      customer,
      status: 'open',
    });

    return newCart;
  }

  async addProduct(cartId: string, productId: string): Promise<void> {
    const cart = await this.cartRepository.findOne(cartId);
    const product = await this.productService.findOne(productId);

    cart.addProduct(product);

    cart.save();
  }
}
