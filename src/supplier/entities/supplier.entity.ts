import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'supplier'
})
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

  //TODO: Add a relationship with the user entity
  user_id: string;

}
