import { v4 as uuuidV4 } from 'uuid';

class Specification {
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

export { Specification }