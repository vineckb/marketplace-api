import { Mongoose } from 'mongoose';
import { MerchantSchema } from './schema';

export const merchantsProviders = [
  {
    provide: 'MerchantModel',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('MerchantModel', MerchantSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
