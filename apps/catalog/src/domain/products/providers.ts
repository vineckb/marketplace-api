import { Mongoose } from 'mongoose';
import { ProductSchema } from './schema';

export const productsProviders = [
  {
    provide: 'ProductEntityModel',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('ProductEntityModel', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
