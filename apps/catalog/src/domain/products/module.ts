import { Module } from '@nestjs/common';
import { ProductEntity } from './entity';
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
    ProductEntity,
    ProductsResolver,
  ],
})
export class ProductModule {}
