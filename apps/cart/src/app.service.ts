import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from './repositories/cart.repository';
import { Customer } from './entities/customer.entity';
import { Cart } from './entities/cart.entity';
import { ClientProxy } from '@nestjs/microservices';
import { MerchantEntity } from './entities/merchant.entity';
import { AddProductInput } from './dto/add-product.input';

@Injectable()
export class CartService {
  constructor(
    private readonly cartRepository: CartRepository,
    @Inject('CatalogService') private readonly catalogService: ClientProxy,
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

  async addMerchant(cartId: string, merchant: MerchantEntity): Promise<void> {
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

  // async findProduct(productId: string): Promise<ProductEntity> {
  //   return new Promise((resolve) => {
  //     this.catalogService
  //       .send<ProductEntity>({ cmd: 'findProduct' }, productId)
  //       .subscribe((product) => {
  //         resolve(product);
  //       });
  //   });
  // }

  async addProduct(
    cartId: string,
    { merchantId, ...product }: AddProductInput,
  ): Promise<void> {
    const catEntity = await this.cartRepository.findOne(cartId);

    // @ts-ignore
    const merchant = (await this.merchantService.getMerchant(
      merchantId,
    )) as MerchantEntity;

    catEntity.addProduct({
      ...product,
      merchant,
    });

    catEntity.save();
  }
}
