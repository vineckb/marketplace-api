import { Mongoose } from 'mongoose';
import { SectionSchema } from './schema';

export const sectionsProviders = [
  {
    provide: 'SectionModel',
    useFactory: (mongoose: Mongoose) =>
      mongoose.model('SectionModel', SectionSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
