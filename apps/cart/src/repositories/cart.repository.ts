import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartDocument } from '../schemas/cart.schema';
import { AnyKeys, Model } from 'mongoose';
import { Cart } from '../entities/cart.entity';

export interface IRepository<T> {
  findAll?(): Promise<T[]>;

  findOne?(id: string): Promise<T>;

  create?(cart: T): Promise<T>;
  update?(id: string, cart: T): Promise<T>;
  delete?(id: string): Promise<T>;
  deleteMany?(ids: string[]): Promise<T[]>;
}

@Injectable()
export class CartRepository implements IRepository<Cart> {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async findAll() {
    return this.cartModel.find().exec();
  }

  async findActive(customerId: string) {
    return this.cartModel
      .findOne({ status: 'open', 'customer.id': customerId })
      .exec();
  }

  async findOne(id: string) {
    return this.cartModel.findById(id).exec();
  }

  async create(cart: AnyKeys<Cart>) {
    return this.cartModel.create(cart);
  }

  async update(id: string, cart: Cart) {
    return this.cartModel.findByIdAndUpdate(id, cart, { new: true }).exec();
  }
  async delete(id: string) {
    return this.cartModel.findByIdAndDelete(id).exec();
  }
}
