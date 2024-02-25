import { DatabaseRepository } from '@app/database/database.repository';
import { Injectable } from '@nestjs/common';
import { MerchantDocument } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Merchant } from './entity';

@Injectable()
export class MerchantRepository extends DatabaseRepository<MerchantDocument> {
  constructor(
    @InjectModel(Merchant.name) protected model: Model<MerchantDocument>,
  ) {
    super();
  }
}
