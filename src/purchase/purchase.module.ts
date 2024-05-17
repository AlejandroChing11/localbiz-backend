import { Module } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { PurchaseController } from './purchase.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { ProductModule } from 'src/product/product.module';
import { UserModule } from 'src/user/user.module';
import { CategoryModule } from 'src/category/category.module';
import { SupplierModule } from 'src/supplier/supplier.module';

@Module({
  controllers: [PurchaseController],
  providers: [PurchaseService],
  imports: [
    TypeOrmModule.forFeature([Purchase]),
    ProductModule,
    UserModule,
    CategoryModule,
    SupplierModule
  ]
})
export class PurchaseModule { }
