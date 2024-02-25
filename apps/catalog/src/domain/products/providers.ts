import { Mongoose } from 'mongoose';
import { ProductSchema } from './schema';

export const productsProviders = [
  {
    provide: 'ProductModel',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('ProductModel', ProductSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
