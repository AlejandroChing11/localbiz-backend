import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

  //TODO: Add a relationship with the user entity
  user_id: string;



}
