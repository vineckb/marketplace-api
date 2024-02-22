import { QueryOptions } from '@nestjs/graphql';
import {
  Document,
  FilterQuery,
  Model,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { CreatedModel, RemovedModel, UpdatedModel } from './database.types';
import { IRepository } from './database.adapter';

export abstract class DatabaseRepository<
  T extends Document,
> extends IRepository<T> {
  protected model: Model<T>;

  async create(document: object): Promise<CreatedModel> {
    const createdDocument = await this.model.collection.insertOne(document);

    return {
      id: createdDocument.insertedId.toString(),
      created: !!createdDocument.insertedId,
    };
  }

  async find(filter: FilterQuery<T>, options?: QueryOptions): Promise<T[]> {
    return await this.model.find(filter, undefined, options);
  }

  async findById(id: string | number): Promise<T> {
    return await this.model.findById(id);
  }

  async findOne(filter: FilterQuery<T>, options?: QueryOptions): Promise<T> {
    return await this.model.findOne(filter, undefined, options);
  }

  async findAll(): Promise<T[]> {
    return await this.model.find();
  }

  async remove(filter: FilterQuery<T>): Promise<RemovedModel> {
    const { deletedCount } = await this.model.deleteMany(filter);
    return { deletedCount, deleted: !!deletedCount };
  }

  async updateOne(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<UpdatedModel> {
    return await this.model.updateOne(filter, updated, options);
  }

  async updateMany(
    filter: FilterQuery<T>,
    updated: UpdateWithAggregationPipeline | UpdateQuery<T>,
    options?: QueryOptions,
  ): Promise<UpdatedModel> {
    return await this.model.updateMany(filter, updated, options);
  }
}
