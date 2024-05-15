import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'sale'
})
export class Sale {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  //TODO: Add a relationship with the product entity
  product_id: string;

  @Column('float', {
    nullable: false
  })
  total: number;

  @Column('float', {
    nullable: false
  })
  tax: number;

  @ManyToOne(
    () => User,
    (user) => user.sale,
    {
      onDelete: 'CASCADE',
    }
  )
  user: User;

  @OneToMany(
    () => Product,
    (product) => product.sale,
    {
      cascade: true,
      eager: true
    }
  )
  products: Product[];

}
