import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { products } from '../data';
import { ProductRepository } from './repositories/product.repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(input: CreateProductInput) {
    const createdProduct = this.productRepository.create(input);
    return createdProduct;
  }

  async findAll() {
    return this.productRepository.findAll();
  }

  async findOne(id: string) {
    return this.productRepository.findById(id);
  }

  async update(id: string, input: UpdateProductInput) {
    return this.productRepository.updateOne({ _id: id }, input);
  }

  async remove(_id: string) {
    const index = products.findIndex((product) => product._id === _id);
    products.splice(index, 1);
  }
}
