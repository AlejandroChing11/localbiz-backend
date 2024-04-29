import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'purchase'
})
export class Purchase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  //TODO: Add a relationship with the user entity
  user_id: string;

  //TODO: Add a relationship with the supplier entity
  supplier_id: string;

  @Column('float', {
    nullable: false
  })
  total: number;

}
