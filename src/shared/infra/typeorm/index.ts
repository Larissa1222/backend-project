import { createConnection, getConnectionOptions, Connection } from "typeorm";

/**
 * Trocado a forma de exportar a conexao pq a seed
 * n conseguia conectar ao banco da forma antiga
 */

/**
 * Criado outro database, somente p/ testes, e por isso foi incluido
 * oum if no object.assign
 */

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === 'test' ? 'localhost' : host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_test"
          : defaultOptions.database,
    })
  );
};
