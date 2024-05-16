import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category> {

    const category = await this.categoryRepository.findOneBy({ id });

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    return category;

  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {

    const category = await this.categoryRepository.preload({
      id: id,
      ...updateCategoryDto
    })

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    try {
      return await this.categoryRepository.save(category);
    } catch (err) {
      throw new Error(err.message);
    }

  }

  async remove(id: string): Promise<string> {

    const category = await this.findOne(id);

    if (!category) {
      throw new NotFoundException(`Category #${id} not found`);
    }

    try {
      await this.categoryRepository.remove(category);
    } catch (err) {
      throw new Error(err.message);
    }

    return `Category with id ${id} has been deleted`

  }
}
