import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'sale'
})
export class Sale {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', {
    nullable: false
  })
  total: number;

  @Column('float', {
    nullable: false
  })
  tax: number;

  @ManyToOne(() => User, user => user.sales, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  date: Date;

  @Column('varchar', {
    nullable: false
  })
  client_name: string;


  @ManyToMany(() => Product, (product) => product.sales)
  @JoinTable({
    name: 'sale_product',
    joinColumn: {
      name: 'sale_id',
    },
    inverseJoinColumn: {
      name: 'product_id',
    }
  })
  products: Product[];


}
