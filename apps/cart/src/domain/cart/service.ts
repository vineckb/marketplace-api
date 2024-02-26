import { Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Customer } from './entities/customer.entity';
import { Cart } from './entities/cart.entity';
import { AddProductInput } from './dto/add-product.input';
import { CartMerchant } from './entities/merchant.entity';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    // @Inject('CatalogService') private readonly catalogService: ClientProxy,
  ) {}

  async getOrCreate(customer: Customer): Promise<Cart> {
    const activeCart = await this.cartRepository.findActive(customer.id);

    if (activeCart) {
      return activeCart;
    }

    const newCart = await this.cartRepository.create({
      customer,
      status: 'open',
    });

    return newCart;
  }

  async addMerchant(cartId: string, merchant: CartMerchant): Promise<void> {
    const cart = await this.cartRepository.findOne(cartId);

    if (!cart) {
      throw new Error('Cart not found');
    }

    const merchantExists = cart.merchants.find((m) => m.id === merchant.id);

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
