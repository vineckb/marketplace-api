import { Module } from '@nestjs/common';
import { Product } from './entity';
import { ProductsService } from './service';
import { ProductRepository } from './repository';
import { productsProviders } from './providers';
import { ProductsResolver } from './resolver';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...productsProviders,
    ProductsService,
    ProductRepository,
    Product,
    ProductsResolver,
  ],
})
export class ProductModule {}
