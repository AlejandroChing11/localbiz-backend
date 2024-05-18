import { Category } from "src/category/entities/category.entity";
import { Purchase } from "src/purchase/entities/purchase.entity";
import { Sale } from "src/sale/entities/sale.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'product'
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  product_name: string;

  @Column('float', {
    nullable: true
  })
  purchase_price: number;

  @Column('float')
  price: number;

  @Column('integer', {
    default: 0,
    nullable: true
  })
  quantity: number;

  @ManyToOne(() => Category, category => category.products, {
    onDelete: 'CASCADE',
  })
  category: Category;

  @ManyToOne(() => Purchase, purchase => purchase.products, {
    onDelete: 'SET NULL',
  })
  purchase: Purchase;

  @ManyToMany(() => Sale, (sale) => sale.products)
  sales: Sale[];

}
