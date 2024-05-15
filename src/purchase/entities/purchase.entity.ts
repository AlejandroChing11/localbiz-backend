import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
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

  @OneToOne(
    () => Supplier,
    (supplier) => supplier.sale,
    {
      onDelete: 'CASCADE'
    }
  )
  supplier_id: Supplier;

}
