import { Product } from "src/product/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'category'
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  category_name: string;

  @Column('text')
  description: string;

  @OneToMany(
    () => Product,
    (product) => product.category,
    {
      eager: true
    }
  )
  products: Product[];


}
