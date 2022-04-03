# RentalX #
> Aplicação para aluguel de carros.

## Cadastro de carro
**Requisitos funcionais:**
- Deve ser possível cadastrar um novo carro;

**Regra de negócio:**
- Não deve ser possivel cadastrar um carro com placa já existente;
<!-- - Não deve ser possível alterar a placa de um carro já cadastrado; -->
- O carro deve ser cadastrado com disponibilidade por padrão;
- Somente o administrador poderá cadastrar um novo carro (vai ser feito na hr do controller).


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
- Deve ser possível cadastrar uma especificação para um carro.

**Regra de negócio:**
- Não deve ser possível cadastrar uma especificação para um carro não existente;
- Não deve ser possível cadastrar uma especificação ja existente para o mesmo carro;
- Somente o administrador poderá cadastrar uma nova especificação.


## Cadastro de imagem do carro
**Requisitos funcionais:**
- Deve ser possível cadastrar a imagem do carro;

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
- Ao realizar um aluguel, o status do carro deverá alterado para indisponível;
- Não deve ser possível cadastrar mais de um aluguel simultaneamente para o mesmo usuário;
- Não deve ser possível cadastrar mais de um aluguel simultaneamente para o mesmo carro;
- O usuário deve estar logado na aplicação.

## Devolução de carro

**Requisitos funcionais:**
- Deve ser possível realizar a devolução de um carro.

**Regra de negócio:**
- Se o carro for devolvido com menos de 24h, deve ser cobrado diária completa;
- Ao realizar a devolução do carro, o carro deverá ser liberado para outro aluguel;
- Ao realizar a devolução do carro, o usuário deverá ser liberado para outro aluguel;
- Ao realizar a devolução, deverá ser calculado o valor total do aluguel;
- Caso o horário de devolução seja superior ao previsto, deverá ser cobrado multa proporcional ao atraso;
- Caso haja multa, deverá ser somado ao valor do aluguel;
- O usuário deve estar logado na aplicação.

## Listagem de Aluguéis para usuário
**Requisitos funcionais:**
- Deve ser possível realizar a busca de todos os aluguéis para o usuário.

**Requisitos não funcionais**
- Usuario deve estar logado na aplicação.

## Recuperar senha
**Requisitos funcionais:**
- Deve ser possível o usuário recuperar a senha informando o e-mail;
- O usuário deve receber um e-mail com o passo a passo para recuperação de senha;
- O usuário deve conseguir inserir uma nova senha.

**Requisitos não funcionais:**
- O usuário precisa informar uma nova senha;
- O link enviado para recuperação deve expirar em 3 horas.
