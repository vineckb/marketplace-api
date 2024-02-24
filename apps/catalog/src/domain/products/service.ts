import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { products } from '../../data';
import { ProductRepository } from './repository';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(input: CreateProductInput) {
    const createdProduct = await this.productRepository.create(input);
    return createdProduct;
  }

  async findAll() {
    const allProducts = await this.productRepository.findAll();
    return allProducts;
  }

  async findOne(id: string) {
    return this.productRepository.findById(id);
  }

  async update(id: string, input: UpdateProductInput) {
    return this.productRepository.updateOne({ id: id }, input);
  }

  async remove(id: string) {
    const index = products.findIndex((product) => product.id === id);
    products.splice(index, 1);
  }
}
