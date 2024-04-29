import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { PurchaseModule } from './purchase/purchase.module';
import { SaleModule } from './sale/sale.module';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [UserModule, ProductModule, CategoryModule, PurchaseModule, SaleModule, SupplierModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
