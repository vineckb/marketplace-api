import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
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

  update({ id, ...input }: UpdateProductInput) {
    return this.productRepository.update(id, input);
  }

  remove(id: string) {
    return this.productRepository.remove(id);
  }
}
