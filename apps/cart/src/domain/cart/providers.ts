import { Mongoose } from 'mongoose';
import { CartSchema } from './schemas/cart.schema';

export const cartProviders = [
  {
    provide: 'CartModel',
    useFactory: (mongoose: Mongoose) => mongoose.model('CartModel', CartSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
