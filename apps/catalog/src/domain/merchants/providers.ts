import { Mongoose } from 'mongoose';
import { MerchantSchema } from './schema';

export const merchantsProviders = [
  {
    provide: 'MerchantEntityModel',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('MerchantEntityModel', MerchantSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
