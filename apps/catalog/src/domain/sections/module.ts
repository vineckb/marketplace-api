import { Module } from '@nestjs/common';
import { SectionEntity } from './entity';
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
    SectionEntity,
    SectionsResolver,
  ],
})
export class SectionModule {}
