import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './service';
import { ProductEntity } from './entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CreatedModel } from '@app/database/database.types';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [ProductEntity!]!)
  async getProducts() {
    const products = await this.productService.findAll();
    console.log(products);
    return products;
  }

  @Query(() => ProductEntity)
  async getProduct(
    @Args('id', { type: () => String })
    id: string,
  ) {
    const product = await this.productService.findOne(id);
    console.log('product', product);
    return product;
  }

  @Mutation(() => CreatedModel)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.create(data);
  }

  @Mutation(() => ProductEntity)
  updateProduct(@Args('data') data: UpdateProductInput) {
    return this.productService.update(data._id, data);
  }

  @Mutation(() => ProductEntity)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
