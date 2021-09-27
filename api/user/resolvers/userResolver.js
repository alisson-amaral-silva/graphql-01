const userResolvers = {
    Query: {
    /*
        - root (ou parent): o resultado da chamada no “nível” anterior da query; 
        - args: os argumentos que o resolver pode receber da query, 
        por exemplo os dados para um novo User ou um ID
        - context (dataSourcers): um objeto com o contexto para o GraphQL,
        como dados sobre a conexão, permissões de usuário, etc;
        - info: a representação em árvore da query ou da mutation.
    
    */
      users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
      user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
    }
  }
  
  module.exports = userResolvers