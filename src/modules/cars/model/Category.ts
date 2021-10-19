import { v4 as uuuidV4 } from 'uuid'; // no TS, para sobescrever o nome de algo em um objeto, usamos 'as'

class Category {
  id?: string;
  name: string;
  description: string;
  created_at: Date;

  constructor(){
    if(!this.id){
      this.id = uuuidV4();
    }
  }
}

export { Category };