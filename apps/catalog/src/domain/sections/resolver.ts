import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SectionsService } from './service';
import { Section } from './entity';
import { CreatedModel, RemovedModel } from '@app/database/database.types';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';

@Resolver(() => Section)
export class SectionsResolver {
  constructor(private readonly productService: SectionsService) {}

  @Query(() => [Section])
  getSections() {
    return this.productService.findAll();
  }

  @Query(() => Section)
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

  @Mutation(() => Section)
  updateSection(@Args('data') data: UpdateSectionInput) {
    return this.productService.update(data);
  }

  @Mutation(() => RemovedModel)
  removeSection(@Args('id', { type: () => String }) id: string) {
    return this.productService.remove(id);
  }
}
