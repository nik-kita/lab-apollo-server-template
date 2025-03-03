import { Resolvers } from "./@types/apollo-server.d.ts";

const resolvers: Resolvers<Context> = {
  Query: {
    example: () => {
      return 'Hello universe!';
    },

    pokemon: (_source: any, { id } :any, { dataSources }: any) => {
      return dataSources.pokemonAPI.getPokemon(id);
    },
  }
}

export default resolvers;
