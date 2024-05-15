import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'category'
})
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true
  })
  category_name: string;

  @Column('text')
  description: string;

  //TODO: Add a relationship with the product entity


}
