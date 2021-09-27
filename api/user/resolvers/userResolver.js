const { GraphQLScalarType } = require('graphql')

const userResolvers = {
    RolesType: {
        ESTUDANTE: "ESTUDANTE",
        DOCENTE: "DOCENTE",
        COORDENACAO: "COORDENACAO"
    },
    DateTime: new GraphQLScalarType({
        name: 'DateTime',
        description: 'string de data e hora no formato ISO-8601',
        serialize: (value) => value.toISOString(), //converte dado da base de dados
        parseValue: (value) => new Date(value), // converte dado através do input através de parametros
        parseLiteral: (ast) => new Date(ast.value) //converte dado através do input através de argumentos inline
    }),
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
    },
    Mutation: {
        adicionaUser: async (root, { user }, { dataSources }) => dataSources.usersAPI.adicionaUser(user),
        atualizaUser: async (root, novosDados, { dataSources }) => {
          console.log(novosDados)
          return dataSources.usersAPI.atualizaUser(novosDados)
        },
        deletaUser: async (root, { id }, { dataSources }) => dataSources.usersAPI.deletaUser(id)
      },
    User: {
      matriculas: (parent, _, { dataSources }) => 
      dataSources.matriculasAPI.getMatriculasPorEstudante
        .load(parent.id)
    } 
  }
  
  module.exports = userResolvers