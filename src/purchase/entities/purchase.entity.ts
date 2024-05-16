import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Supplier } from "src/supplier/entities/supplier.entity";
import { User } from "src/user/entities/user.entity";

@Entity({
  name: 'purchase'
})
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('float', {
    nullable: false
  })
  total: number;

  @ManyToOne(
    () => User,
    (user) => user.purchase,
    {
      onDelete: 'CASCADE',
    }
  )
  user: User;

  @ManyToOne(
    () => Supplier,
    (supplier) => supplier.sale,
    { eager: true }
  )
  supplier: Supplier;

}
