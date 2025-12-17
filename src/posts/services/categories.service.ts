import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async findAll() {
    const categories = await this.categoriesRepository.find();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
       where: { id }
       });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async create(body: CreateCategoryDto) {
    try {
      const newCategory = await this.categoriesRepository.save(body);
      return this.findOne(newCategory.id);
    } catch {
      throw new BadRequestException('Error creating category');
    }
  }

  async update(id: number, changes: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      const UpdateCategoryDto = this.categoriesRepository.merge(category, changes);
      const savedCategory = await this.categoriesRepository.save(UpdateCategoryDto);
      return savedCategory;
    } catch {
      throw new BadRequestException('Error updating category');
    }
  }

  async remove(id: number) {
    try {
      await this.categoriesRepository.delete(id);
      return { message: 'Category deleted successfully' };
    } catch {
      throw new BadRequestException('Error deleting category');
    }
  }
}
