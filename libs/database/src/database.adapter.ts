import {
  FilterQuery,
  Model,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { CreatedModel, RemovedModel } from './database.types';
import { QueryOptions } from '@nestjs/graphql';

export abstract class IRepository<T> {
  abstract create<T = SaveOptions>(
    document: object,
    saveOptions?: T,
  ): Promise<CreatedModel>;

  abstract findById(id: string | number): Promise<T>;

  abstract findAll(): Promise<Model<T>[]>;

  abstract find<TQuery = FilterQuery<T>, TOptions = QueryOptions<T>>(
    filter: TQuery,
    options?: TOptions | null,
  ): Promise<T[]>;

  abstract remove(id: string): Promise<RemovedModel>;

  abstract findOne<TQuery = FilterQuery<T>, TOptions = QueryOptions<T>>(
    filter: TQuery,
    options?: TOptions,
  ): Promise<T>;

  abstract update<TUpdate = UpdateQuery<T> | UpdateWithAggregationPipeline>(
    id: string,
    data: TUpdate,
  ): Promise<T>;
}
