import { ApolloServer } from '@apollo/server';
import { startServerAndCreateCloudflareWorkersHandler } from '@as-integrations/cloudflare-workers';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import PokemonAPI from './datasources/pokemon-api.ts';
import typeDefs from './schema.ts';
import resolvers from './resolvers.ts';

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
  introspection: true,
  plugins: [ApolloServerPluginLandingPageLocalDefault({ footer: false })],
});

export interface Env {
  //
}

export default {
  fetch: startServerAndCreateCloudflareWorkersHandler<Env, Context>(server, {
    context: async ({ env, request, ctx }) => {
      const dataSources: DataSources = {
        pokemonAPI: new PokemonAPI({ fetch: fetch.bind(globalThis) }),
      };

      return { dataSources };
    },
  }),
};
