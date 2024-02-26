import { Injectable } from '@nestjs/common';
import { CreateMerchantInput } from './dto/create-merchant.input';
import { UpdateMerchantInput } from './dto/update-merchant.input';
import { MerchantRepository } from './repository';

@Injectable()
export class MerchantsService {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  create(input: CreateMerchantInput) {
    return this.merchantRepository.create(input);
  }

  findAll() {
    return this.merchantRepository.findAll();
  }

  findOne(id: string) {
    return this.merchantRepository.findById(id);
  }

  update({ id, ...input }: UpdateMerchantInput) {
    return this.merchantRepository.update(id, input);
  }

  remove(id: string) {
    return this.merchantRepository.remove(id);
  }
}
