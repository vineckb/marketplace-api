import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './service';
import { Product } from './entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CreatedModel, RemovedModel } from '@app/database/database.types';

@Resolver(() => Product)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [Product!]!)
  getProducts() {
    return this.productService.findAll();
  }

  @Query(() => Product)
  getProduct(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.productService.findOne(id);
  }

  @Mutation(() => CreatedModel)
  createProduct(@Args('data') data: CreateProductInput) {
    return this.productService.create(data);
  }

  @Mutation(() => Product)
  updateProduct(@Args('data') data: UpdateProductInput) {
    return this.productService.update(data);
  }

  @Mutation(() => RemovedModel)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
