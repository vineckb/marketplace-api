import { Module } from '@nestjs/common';
import { Section } from './entity';
import { SectionsService } from './service';
import { SectionRepository } from './repository';
import { sectionsProviders } from './providers';
import { DatabaseModule } from '../../infra/database/database.module';
import { SectionsResolver } from './resolver';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...sectionsProviders,
    SectionsService,
    SectionRepository,
    Section,
    SectionsResolver,
  ],
})
export class SectionModule {}
