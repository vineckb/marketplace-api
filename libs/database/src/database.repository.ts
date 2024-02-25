import { QueryOptions } from '@nestjs/graphql';
import { AnyKeys, Document, FilterQuery, Model } from 'mongoose';
import { CreatedModel, RemovedModel } from './database.types';
import { IRepository } from './database.adapter';

export abstract class DatabaseRepository<
  T extends Document,
> extends IRepository<T> {
  protected model: Model<T>;

  async create(document: object): Promise<CreatedModel> {
    const createdDocument = await this.model.collection.insertOne(document);

    return {
      _id: createdDocument.insertedId.toString(),
      created: !!createdDocument.insertedId,
    };
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return await this.model.find(filter, undefined, options);
  }

  async findById(id: string | number): Promise<T> {
    return this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
    return await this.model.findOne(filter, undefined, options);
  }

  async findAll(): Promise<Model<T>[]> {
    return await this.model.find();
  }

  async remove(id: string): Promise<RemovedModel> {
    const { deletedCount } = await this.model.deleteOne({ _id: id });
    console.log('deletedCount', deletedCount);
    return { deletedCount, deleted: !!deletedCount };
  }

  update(id: string, data: AnyKeys<T>): Promise<T> {
    return this.model.findByIdAndUpdate(id, data, {
      new: true,
      upsert: true,
    });
  }
}
