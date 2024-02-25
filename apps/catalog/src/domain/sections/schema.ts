import { SchemaFactory } from '@nestjs/mongoose';
import { Section } from './entity';
import { HydratedDocument } from 'mongoose';

export type SectionDocument = HydratedDocument<Section>;
export const SectionSchema = SchemaFactory.createForClass(Section);
