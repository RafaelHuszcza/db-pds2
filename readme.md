# Sistema de Gerenciamento de Abrigos

Este projeto é uma base de backend para um Sistema de Gerenciamento de Abrigos. Ele fornece a estrutura do banco de dados e a base para endpoints de API para gerenciar abrigos, usuários, itens e pessoas abrigadas.

## Diagrama Entidade-Relacionamento

![Diagrama ER](./ER.drawio.svg)

## Tecnologias Utilizadas

- **Prisma**: Utilizado para modelagem de banco de dados e ORM (Object-Relational Mapping)
- **Express.js**: Framework de aplicação web para Node.js

## Status do Projeto

Este projeto está atualmente em seus estágios iniciais. O seguinte foi concluído:

- Design do diagrama Entidade-Relacionamento (ER)
- Estrutura do banco de dados usando o schema do Prisma

O backend é puramente uma base neste momento, fornecendo a estrutura básica para desenvolvimento futuro.

## Configuração

1. Clone o repositório
2. Instale as dependências:
   ```
   npm install
   ```
3. Configure a conexão do banco de dados no arquivo `.env`
4. Execute as migrações do Prisma:
   ```
   npx prisma migrate dev
   ```

## Esquema do Banco de Dados

O esquema do banco de dados inclui os seguintes modelos:

- Usuário (User)
- Abrigo (Shelter)
- Item
- Abrigado (Sheltered)

Para informações detalhadas sobre cada modelo e seus relacionamentos, por favor, consulte o diagrama ER acima.

## Desenvolvimento Futuro

- Implementar endpoints de API usando Express.js
- Adicionar autenticação e autorização
- Desenvolver interface frontend
- Implementar validação de dados e tratamento de erros

## Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para enviar um Pull Request.

## Licença

[MIT](https://choosealicense.com/licenses/mit/)
