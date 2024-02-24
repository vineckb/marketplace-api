import { SchemaFactory } from '@nestjs/mongoose';
import { SectionEntity } from './entity';
import { HydratedDocument } from 'mongoose';

export type SectionDocument = HydratedDocument<SectionEntity>;
export const SectionSchema = SchemaFactory.createForClass(SectionEntity);
