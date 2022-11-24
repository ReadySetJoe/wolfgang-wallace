import { ApolloServer } from "apollo-server-micro";
import Cors from "micro-cors";

import { typeDefs } from "../../server/schemas";
import { resolvers } from "../../server/resolvers";

export const config = {
  api: {
    bodyParser: false,
  },
};

const cors = Cors();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = server.start();

export default cors(async (req, res) => {
  await startServer;
  await server.createHandler({ path: "/api/graphql" })(req, res);
});
