import { app } from "./app";

/*
  Renomeado o antigo server.ts para app.ts
  e separando o app do server, consegue ter todas info do app
  no teste do controller, sem precisar subir o servidor da apliacacao
*/

const port = 3333;
app.listen(port, () => {
  console.log(`APP LISTENING AT http://localhost:${port}`);
});
