import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { MerchantsService } from './service';
import { MerchantEntity } from './entity';
import { CreateMerchantInput } from './dto/create-merchant.input';
import { UpdateMerchantInput } from './dto/update-merchant.input';
import { CreatedModel, RemovedModel } from '@app/database/database.types';

@Resolver(() => MerchantEntity)
export class MerchantsResolver {
  constructor(private readonly merchantService: MerchantsService) {}

  @Query(() => [MerchantEntity])
  getMerchants() {
    return this.merchantService.findAll();
  }

  @Query(() => MerchantEntity)
  async getMerchant(
    @Args('id', { type: () => String })
    id: string,
  ): Promise<MerchantEntity> {
    const merchant = await this.merchantService.findOne(id);
    return merchant;
  }

  @Mutation(() => CreatedModel)
  createMerchant(@Args('data') data: CreateMerchantInput) {
    return this.merchantService.create(data);
  }

  @Mutation(() => MerchantEntity)
  updateMerchant(@Args('data') data: UpdateMerchantInput) {
    return this.merchantService.update(data);
  }

  @Mutation(() => RemovedModel)
  removeMerchant(@Args('id', { type: () => String }) id: string) {
    return this.merchantService.remove(id);
  }
}
