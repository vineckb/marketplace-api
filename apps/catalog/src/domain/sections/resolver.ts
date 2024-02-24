import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SectionsService } from './service';
import { SectionEntity } from './entity';
import { CreatedModel } from '@app/database/database.types';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';

@Resolver(() => SectionEntity)
export class SectionsResolver {
  constructor(private readonly productService: SectionsService) {}

  @Query(() => [SectionEntity])
  getSections() {
    return this.productService.findAll();
  }

  @Query(() => SectionEntity)
  getSection(
    @Args('id', { type: () => String })
    id: string,
  ) {
    return this.productService.findOne(id);
  }

  @Mutation(() => CreatedModel)
  createSection(@Args('data') data: CreateSectionInput) {
    return this.productService.create(data);
  }

  @Mutation(() => SectionEntity)
  updateSection(@Args('data') data: UpdateSectionInput) {
    return this.productService.update(data.id, data);
  }

  @Mutation(() => SectionEntity)
  removeSection(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
