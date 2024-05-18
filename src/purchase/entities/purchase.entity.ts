import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { User } from "src/user/entities/user.entity";
import { Product } from "src/product/entities/product.entity";

@Entity({
  name: 'purchase'
})
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, user => user.purchases, {
    onDelete: 'CASCADE',
  })
  user: User;

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Supplier, supplier => supplier.purchases, {
    eager: true,
  })
  supplier: Supplier;

  @OneToMany(() => Product, product => product.purchase, {
    eager: true,
    cascade: ["insert"],
  })
  products: Product[];

  @Column('float', {
    nullable: false,
  })
  total: number;
}
