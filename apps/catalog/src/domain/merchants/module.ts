import { Module } from '@nestjs/common';
import { Merchant } from './entity';
import { MerchantsService } from './service';
import { MerchantRepository } from './repository';
import { merchantsProviders } from './providers';
import { MerchantsResolver } from './resolver';
import { DatabaseModule } from '../../infra/database/database.module';

@Module({
  imports: [DatabaseModule],

  providers: [
    MerchantsResolver,
    MerchantsService,
    MerchantRepository,
    Merchant,
    ...merchantsProviders,
  ],
})
export class MerchantModule {}
