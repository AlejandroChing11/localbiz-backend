import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'product'
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  product_name: string;

  @Column('float')
  price: number;

}
