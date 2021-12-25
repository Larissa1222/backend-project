# RentalX #
> Aplicação para aluguel de carros.

## Cadastro de carro
**Requisitos funcionais:**
- Deve ser possível cadastrar um novo carro;
- Deve ser possível listar todas as categorias.

**Regra de negócio:**
- Não deve ser possivel cadastrar um carro com placa já existente;
- Não deve ser possível alterar a placa de um carro já cadastrado;
- O carro deve ser cadastrado com disponibilidade por padrão;
- Somente o administrador poderá cadastrar um novo carro.


## Listagem de carro
**Requisitos funcionais:**
- Deve ser possível listar todos os carros disponíveis;
- Deve ser possível listar todos os carros disponíveis pelo nome da categoria;
- Deve ser possível listar todos os carros disponíveis pelo nome da marca;
- Deve ser possível listar todos os carros disponíveis pelo nome do carro.

**Regra de negócio:**
- O usuário nao precisa estar logado no sistema para ver a listagem.


## Cadastro de Especificação no carro
**Requisitos funcionais:**
- Deve ser possível cadastrar uma especificação para um carro;
- Deve ser possível listar todas as especificações;
- Deve ser possível listar todos os carros.

**Regra de negócio:**
- Não deve ser possível cadastrar uma especificação para um carro não existente;
- Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro;
- Somente o administrador poderá cadastrar uma nova especificação.


## Cadastro de imagem do carro
**Requisitos funcionais:**
- Deve ser possível cadastrar a imagem do carro;
- Deve ser possível listar todos os carros.

**Requisito não funcional:**
- Utilizar o multer para upload dos arquivos.

**Regra de negócio:**
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- Somente o administrador poderá cadastrar uma nova imagem.


## Aluguel de carro
**Requisitos funcionais:**
- Deve ser possível cadastrar um aluguel.
**Regra de negócio:**
- O aluguel deve ter duração mínima de 24h;
- Não deve ser possível cadastrar mais de um aluguel simultaneamente para o mesmo usuário;
- Não deve ser possível cadastrar mais de um aluguel simultaneamente para o mesmo carro.