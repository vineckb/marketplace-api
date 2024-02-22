import { Module } from '@nestjs/common';
import { ProductEntity } from './entity';
import { ProductsService } from './service';
import { ProductRepository } from './repository';
import { DatabaseModule } from '../database/database.module';
import { productsProviders } from './providers';
import { ProductsResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...productsProviders,
    ProductsService,
    ProductRepository,
    ProductEntity,
    ProductsResolver,
  ],
})
export class ProductModule {}
