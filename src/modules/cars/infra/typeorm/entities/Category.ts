import { v4 as uuidV4 } from "uuid"; // no TS, para sobescrever o nome de algo em um objeto, usamos 'as'
import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";


// Pro typeorm entender q essa classe é uma entidade e
// vai precisar ser convertida para uma tabela
@Entity("categories")
class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Category };
