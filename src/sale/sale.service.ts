import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { ProductService } from 'src/product/product.service';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class SaleService {

  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,
    private readonly userService: UserService,
    private readonly productService: ProductService,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) { }

  async create(createSaleDto: CreateSaleDto) {

    const { userId, products } = createSaleDto;

    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    let total = 0;

    for (const productDto of products) {
      const product = await this.productService.findOneByName(productDto.product_name);
      if (!product) {
        throw new NotFoundException('Product not found');
      }

      if (product.quantity < productDto.quantity) {
        this.productRepository.delete(product.id);
        throw new NotFoundException(`Product ${productDto.product_name} has only ${product.quantity} items in stock`);
      }

      total += product.price * productDto.quantity;

    }

    total += total * (createSaleDto.tax / 100);

    const newSale = this.saleRepository.create({
      user,
      total,
      tax: createSaleDto.tax,
      client_name: createSaleDto.clientName,
    });

    const savedSale = await this.saleRepository.save(newSale);

    for (const productDto of products) {

      const product = await this.productService.findOneByName(productDto.product_name);

      if (!product) {
        throw new NotFoundException('Product not found');
      }

      product.quantity -= productDto.quantity;

      await this.productRepository.save(product);

      await this.productRepository.createQueryBuilder()
        .relation(Sale, 'products')
        .of(savedSale)
        .add(product);

    }
    return savedSale;
  }

  findAll(): Promise<Sale[]> {
    return this.saleRepository.find();
  }

  async findOneByDate(date: Date) {
    return await this.saleRepository.find({ where: { date } });
  }

  remove(id: number) {
    return `This action removes a #${id} sale`;
  }
}
