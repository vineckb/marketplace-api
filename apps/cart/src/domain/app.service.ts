import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from './cart/repositories/cart.repository';
import { Customer } from './cart/entities/customer.entity';
import { Cart } from './cart/entities/cart.entity';
import { ClientProxy } from '@nestjs/microservices';
import { Merchant } from './cart/entities/merchant.entity';
import { AddProductInput } from './cart/dto/add-product.input';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @Inject('CatalogService') private readonly catalogService: ClientProxy,
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

  async addMerchant(cartId: string, merchant: Merchant): Promise<void> {
    const cart = await this.cartRepository.findOne(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const merchantExists = cart.merchants.find((m) => m._id === merchant._id);

    if (merchantExists) {
      throw new Error('Merchant already exists in cart');
    }

    cart.merchants.push(merchant);

    await this.cartRepository.update(cartId, cart);
  }

  // async findProduct(productId: string): Promise<Product> {
  //   return new Promise((resolve) => {
  //     this.catalogService
  //       .send<Product>({ cmd: 'findProduct' }, productId)
  //       .subscribe((product) => {
  //         resolve(product);
  //       });
  //   });
  // }

  async addProduct(
    cartId: string,
    { merchantId, ...product }: AddProductInput,
  ): Promise<void> {
    const cat = await this.cartRepository.findOne(cartId);

    cat.save();
  }
}
