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

  @Column('text', {
    select: false,
  })
  password: string;

  @OneToMany(
    () => Supplier,
    (supplier) => supplier.user,
    {
      cascade: true,
      eager: true
    }
  )
  supplier: Supplier;

  @OneToMany(
    () => Purchase,
    (purchase) => purchase.user,
    {
      cascade: true,
      eager: true
    }
  )
  purchase: Purchase[];

  @OneToMany(
    () => Sale,
    (sale) => sale.user,
    {
      cascade: true,
      eager: true
    }
  )
  sale: Sale[];


}
