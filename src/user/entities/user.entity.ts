import { Purchase } from 'src/purchase/entities/purchase.entity';
import { Sale } from 'src/sale/entities/sale.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  name: string;

  @Column('text', {
    unique: true,
  })
  email: string;

  @Column('text', { nullable: true })
  address: string;

  @Column('real', { nullable: true })
  capital: number;

  @Column('text', {
    select: false,
  })
  password: string;

  @OneToMany(() => Supplier, supplier => supplier.user, {
    cascade: true,
    eager: true,
  })
  suppliers: Supplier[];

  @OneToMany(() => Purchase, purchase => purchase.user, {
    eager: true,
  })
  purchases: Purchase[];

  @OneToMany(() => Sale, sale => sale.user, {
    eager: true,
  })
  sales: Sale[];
}
