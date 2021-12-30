import { createConnection, getConnectionOptions, Connection } from "typeorm";

//trocado a forma de exportar a conexao pq a seed n conseguia conectar
//ao banco da forma antiga
export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host,
    })
  );
};
