import { Purchase } from "src/purchase/entities/purchase.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('supplier')
export class Supplier {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  supplier_name: string;

  @Column('float', {
    nullable: true
  })
  debt: number;

  @ManyToOne(
    () => User,
    (user) => user.supplier,
    {
      onDelete: 'CASCADE'
    }
  )
  user: User;

  @OneToMany(
    () => Purchase,
    (purchase) => purchase.supplier,
    {
      onDelete: 'CASCADE'
    }
  )
  sale: Purchase;


}
