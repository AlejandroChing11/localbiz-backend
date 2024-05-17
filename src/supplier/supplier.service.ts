import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';

@Injectable()
export class SupplierService {

  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    private readonly userService: UserService
  ) { }

  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {

    const { userId, ...supplierData } = createSupplierDto;

    const user = await this.userService.findOne(userId);

    if (!user) {
      throw new Error('User not found');
    }

    try {
      const newSupplier = this.supplierRepository.create({
        ...supplierData,
        user
      })
      return this.supplierRepository.save(newSupplier);
    } catch (error) {
      throw new Error(error.message);
    }

  }

  findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  async findOne(id: string): Promise<Supplier> {

    const supplier = await this.supplierRepository.findOneBy({ id });

    if (!supplier) {
      throw new Error('Supplier not found');
    }

    return supplier;

  }

  //TODO: THIS SHOUD BE BY TERM(ID, NAME)
  findOneByTerm(term: string) {
    return 'this action returns a supplier by term'
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {

    const supplier = await this.supplierRepository.preload({
      id,
      ...updateSupplierDto
    })

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    try {
      return await this.supplierRepository.save(supplier);
    } catch (error) {
      throw new Error(error.message);
    }

  }

  async remove(id: string): Promise<string> {

    const supplier = await this.findOne(id);

    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    await this.supplierRepository.remove(supplier);

    return 'Supplier removed';

  }

  async findOneByName(supplierName: string): Promise<Supplier> {
    return this.supplierRepository.findOneBy({ supplier_name: supplierName });
  }


}
