import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database/database.module';
import { cartProviders } from './providers';
import { CartService } from '../app.service';
import { CartRepository } from './repositories/cart.repository';
import { Cart } from './entities/cart.entity';

@Module({
  imports: [DatabaseModule],
  providers: [...cartProviders, Cart, CartService, CartRepository],
})
export class CartModule {}
