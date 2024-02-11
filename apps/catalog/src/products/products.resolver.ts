import { Resolver, Query, Mutation, Args, ResolveField } from '@nestjs/graphql';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';

@Resolver(() => ProductEntity)
export class ProductsResolver {
  constructor(private readonly productService: ProductsService) {}

  @Query(() => [ProductEntity])
  getProducts() {
    return this.productService.findAll();
  }

  @Query(() => ProductEntity)
  getProduct(@Args('id', { type: () => String }) id: string) {
    return this.productService.findOne(id);
  }

  @Mutation(() => ProductEntity)
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

  @ResolveField(() => ProductEntity)
  resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<ProductEntity> {
    return this.productService.findOne(reference.id);
  }
}
