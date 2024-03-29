import { v4 as uuidV4 } from "uuid";
import { hash } from "bcrypt";

import createConnection from "../index"

async function create() {
  const connection = await createConnection("localhost");
  const id = uuidV4();
  const password = await hash("admin", 8);

  await connection.query(`
    INSERT INTO USERS(id, name, password, email, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', '${password}', 'admin@rentx.com', true, 'now()', '123456' )
  `);
  connection.close;
}
/**
 * Para criar usuario admin rodar yarn seed:admin e descomentar esse codigo abaixo
 * create().then(() => {
 *   console.log("user admin created"); 
 * });
 */


