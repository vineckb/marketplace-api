import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ProductsService } from './service';
import { ProductEntity } from './entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { CreatedModel, RemovedModel } from '@app/database/database.types';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [ProductEntity!]!)
  getProducts() {
    return this.productService.findAll();
  }

  @Query(() => ProductEntity)
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

  @Mutation(() => ProductEntity)
  updateProduct(@Args('data') data: UpdateProductInput) {
    return this.productService.update(data);
  }

  @Mutation(() => RemovedModel)
  removeProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
