import { Mongoose } from 'mongoose';
import { SectionSchema } from './schema';

export const sectionsProviders = [
  {
    provide: 'SectionEntityModel',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('SectionEntityModel', SectionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
