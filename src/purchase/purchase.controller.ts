import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PurchaseService } from './purchase.service';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { Purchase } from './entities/purchase.entity';

@Controller('purchase')
export class PurchaseController {
  constructor(private readonly purchaseService: PurchaseService) { }

  @Post()
  create(@Body() createPurchaseDto: CreatePurchaseDto): Promise<Purchase> {
    return this.purchaseService.create(createPurchaseDto);
  }

  @Get()
  findAll(): Promise<Purchase[]> {
    return this.purchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('date') date: Date): Promise<Purchase[]> {
    return this.purchaseService.findAllByDate(date);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<string> {
    return this.purchaseService.remove(id);
  }
}
