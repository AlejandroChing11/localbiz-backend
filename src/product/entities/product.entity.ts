import { Category } from "src/category/entities/category.entity";
import { Sale } from "src/sale/entities/sale.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @Column('float')
  purchase_price: number;

  @Column('float')
  price: number;

  @ManyToOne(
    () => Category,
    (category) => category.products,
    {
      onDelete: 'CASCADE',
    }
  )
  category: Category;

  @ManyToOne(
    () => Sale,
    (sale) => sale.products,
    {
      onDelete: 'CASCADE',
    }
  )
  sale: Sale;



}
