import {
  FilterQuery,
  Model,
  SaveOptions,
  UpdateQuery,
  UpdateWithAggregationPipeline,
} from 'mongoose';
import { CreatedModel, RemovedModel, UpdatedModel } from './database.types';
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

  abstract remove<TQuery = FilterQuery<T>>(
    filter: TQuery,
  ): Promise<RemovedModel>;

  abstract findOne<TQuery = FilterQuery<T>, TOptions = QueryOptions<T>>(
    filter: TQuery,
    options?: TOptions,
  ): Promise<T>;

  abstract updateOne<
    TQuery = FilterQuery<T>,
    TUpdate = UpdateQuery<T> | UpdateWithAggregationPipeline,
    TOptions = QueryOptions<T>,
  >(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions,
  ): Promise<UpdatedModel>;

  abstract updateMany<
    TQuery = FilterQuery<T>,
    TUpdate = UpdateQuery<T> | UpdateWithAggregationPipeline,
    TOptions = QueryOptions<T>,
  >(
    filter: TQuery,
    updated: TUpdate,
    options?: TOptions,
  ): Promise<UpdatedModel>;
}
