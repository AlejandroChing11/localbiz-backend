import { Purchase } from "src/purchase/entities/purchase.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('supplier')
export class Supplier {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  supplier_name: string;

  @Column('float', {
    nullable: false
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

  @OneToOne(
    () => Purchase,
    (purchase) => purchase.supplier_id,
    {
      cascade: true,
      eager: true
    }
  )
  sale: Purchase;


}
