import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { products } from '../data';
import { faker } from '@faker-js/faker';

@Injectable()
export class ProductsService {
  async create(createProductInput: CreateProductInput) {
    const createdProduct = {
      ...createProductInput,
      _id: faker.database.mongodbObjectId(),
    };
    products.push(createdProduct);
    return createdProduct;
  }

  async findAll() {
    return products;
  }

  async findOne(_id: string) {
    const product = products.find((product) => product._id === _id);
    if (!product) {
      throw new Error(`Product #${_id} not found`);
    }
    return product;
  }

  async update(_id: string, updateProductInput: UpdateProductInput) {
    const index = products.findIndex((product) => product._id === _id);
    const updatedProduct = { ...products[index], ...updateProductInput, _id };
    products[index] = updatedProduct;
    return updatedProduct;
  }

  async remove(_id: string) {
    const index = products.findIndex((product) => product._id === _id);
    products.splice(index, 1);
  }
}
