import { Purchase } from "src/purchase/entities/purchase.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('supplier')
export class Supplier {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  supplier_name: string;

  @Column('float', {
    default: 0,
    nullable: true
  })
  debt: number;

  @ManyToOne(
    () => User,
    (user) => user.suppliers,
    {
      onDelete: 'CASCADE'
    }
  )
  user: User;

  @OneToMany(
    () => Purchase,
    (purchase) => purchase.supplier,
    {
      onDelete: 'CASCADE',
    }
  )
  sale: Purchase;


}
