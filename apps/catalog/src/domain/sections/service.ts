import { Injectable } from '@nestjs/common';
import { CreateSectionInput } from './dto/create-section.input';
import { UpdateSectionInput } from './dto/update-section.input';
import { sections } from '../../data';
import { SectionRepository } from './repository';

@Injectable()
export class SectionsService {
  constructor(private readonly sectionRepository: SectionRepository) {}

  async create(input: CreateSectionInput) {
    const createdSection = await this.sectionRepository.create(input);
    return createdSection;
  }

  async findAll() {
    const allSections = await this.sectionRepository.findAll();
    return allSections;
  }

  async findOne(id: string) {
    return this.sectionRepository.findById(id);
  }

  async update(id: string, input: UpdateSectionInput) {
    return this.sectionRepository.updateOne({ id: id }, input);
  }

  async remove(id: string) {
    const index = sections.findIndex((section) => section._id === id);
    sections.splice(index, 1);
  }
}
