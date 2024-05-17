import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';
import { UserService } from 'src/user/user.service';
import { SupplierService } from 'src/supplier/supplier.service';

@Injectable()
export class PurchaseService {

  constructor(
    @InjectRepository(Purchase)
    private readonly purchaseRepository: Repository<Purchase>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly userService: UserService,
    private readonly supplierService: SupplierService,
  ) { }

  async create(createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    const { userId, supplierName, products } = createPurchaseDto;

    const user = await this.userService.findOneById(userId);
    const supplier = await this.supplierService.findOneByName(supplierName);

    const total = products.reduce((acc, product) => {
      return acc + (product.purchase_price * product.quantity);
    }, 0)

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    const newPurchase = this.purchaseRepository.create({
      user,
      supplier: supplier,
      total
    });

    const savedPurchase = await this.purchaseRepository.save(newPurchase);

    for (const productDto of products) {
      const category = await this.categoryRepository.findOne({ where: { category_name: productDto.category } });
      if (!category) {
        throw new NotFoundException('Category not found');
      }

      const existingProduct = await this.productRepository.findOne({ where: { product_name: productDto.product_name } });
      if (existingProduct) {
        throw new NotFoundException('Product already exists');
      }

      const product = this.productRepository.create({
        ...productDto,
        purchase: savedPurchase,
        category,
      })
      await this.productRepository.save(product)
    }
    return savedPurchase;
  }

  findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  async findAllByDate(date: Date): Promise<Purchase[]> {
    return await this.purchaseRepository.find({ where: { date: date } });
  }

  async remove(id: string): Promise<string> {
    this.purchaseRepository.delete(id);
    return `Purchase with id ${id} has been deleted`;
  }

}
