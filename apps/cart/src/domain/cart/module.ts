import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database/database.module';
import { cartProviders } from './providers';
import { CartService } from './service';
import { CartRepository } from './repositories/cart.repository';
import { Cart } from './entities/cart.entity';
import { CartResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...cartProviders,
    Cart,
    CartService,
    CartRepository,
    CartResolver,
  ],
})
export class CartModule {}
