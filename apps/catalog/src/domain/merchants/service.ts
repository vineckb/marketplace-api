import { Injectable } from '@nestjs/common';
import { CreateMerchantInput } from './dto/create-merchant.input';
import { UpdateMerchantInput } from './dto/update-merchant.input';
import { merchants } from '../../data';
import { MerchantRepository } from './repository';

@Injectable()
export class MerchantsService {
  constructor(private readonly merchantRepository: MerchantRepository) {}

  async create(input: CreateMerchantInput) {
    const createdMerchant = await this.merchantRepository.create(input);
    return createdMerchant;
  }

  async findAll() {
    const allMerchants = await this.merchantRepository.findAll();
    return allMerchants;
  }

  async findOne(id: string) {
    return this.merchantRepository.findById(id);
  }

  async update(id: string, input: UpdateMerchantInput) {
    return this.merchantRepository.updateOne({ id: id }, input);
  }

  async remove(id: string) {
    const index = merchants.findIndex((merchant) => merchant.id === id);
    merchants.splice(index, 1);
  }
}
