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
  price: number;

  @ManyToOne(
    () => Sale,
    (sale) => sale.products,
    {
      onDelete: 'CASCADE',
      nullable: true
    }
  )
  sale?: Sale;

  @ManyToOne(
    () => Category,
    (category) => category.id,
    {
      onDelete: 'CASCADE',
    }
  )
  category: Category;



}
