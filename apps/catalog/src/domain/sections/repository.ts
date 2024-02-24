import { DatabaseRepository } from '@app/database/database.repository';
import { Injectable } from '@nestjs/common';
import { SectionDocument } from './schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SectionEntity } from './entity';

@Injectable()
export class SectionRepository extends DatabaseRepository<SectionDocument> {
  constructor(
    @InjectModel(SectionEntity.name) protected model: Model<SectionDocument>,
  ) {
    super();
  }
}
