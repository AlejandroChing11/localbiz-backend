import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoryService
  ) { }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { category, ...productData } = createProductDto;

    const productWithCategory = await this.categoryService.findOneByName(category);

    if (!productWithCategory) {
      throw new NotFoundException(`Product with category ${category} not found`);
    }

    const newProduct = this.productRepository.create({
      ...productData,
      category: productWithCategory
    });

    return this.productRepository.save(newProduct);

  }

  findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findOneById(id: string) {
    return await this.productRepository.findOneBy({ id })
  }

  async findOneByName(product_name: string): Promise<Product> {
    return await this.productRepository.findOneBy({ product_name })
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {

    const { category, ...productData } = updateProductDto;

    const product = await this.productRepository.preload({
      id,
      ...productData
    })

    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }

    if (category) {
      const productWithCategory = await this.categoryService.findOneByName(category);

      if (!productWithCategory) {
        throw new NotFoundException(`Product with category ${category} not found`);
      }

      product.category = productWithCategory;
    }

    return this.productRepository.save(product);

  }

  async updateQuantity(productName: string, quantity: number): Promise<Product> {
    const product = await this.findOneByName(productName);

    if (!product) {
      throw new NotFoundException(`Product ${productName} not found`);
    }

    if (product.quantity <= 0) {
      this.productRepository.delete(product.id);
      throw new NotFoundException(`Product ${productName} is out of stock`);
    }

    if (product.quantity < quantity) {
      throw new NotFoundException(`Product ${productName} has only ${product.quantity} items in stock`);
    }

    product.quantity -= quantity;

    const productUpdated = this.productRepository.save(product);
    return productUpdated;
  }

  remove(id: string): Promise<string> {
    this.productRepository.delete(id);
    return Promise.resolve(`Product #${id} has been deleted`);
  }

  private async deleteOutOfStockProducts() {
    const products = await this.productRepository.find({ where: { quantity: 0 } });
    products.forEach(async product => {
      await this.productRepository.delete(product.id);
    });
  }

}
