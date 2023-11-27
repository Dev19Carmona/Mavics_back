import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core/dist/plugin/drainHttpServer/index.js";
import express from "express";
import http from "http";
import cors from "cors";
import pkg from "body-parser";
const { json } = pkg;
import jwt from "jsonwebtoken";
import { typeDefs, resolvers } from "./GraphQl/Schema.js";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.mjs";
import { config } from "dotenv";
import { jwtVerify } from "./Constants/_general.js";
config();

export const startServer = async () => {
  const PORT = process.env.PORT;
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    introspection: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(graphqlUploadExpress(), express.static("public"));
  app.use(
    "/graphql",
    cors(),
    json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const operationName = req.body.operationName; // Nombre de la operación (puede ser null)
        const query = req.body.query; // Texto de la consulta o mutación
        const variables = req.body.variables;
        const token = req.headers.authorization;
        let session;
        if (token) {
          try {
            session = jwtVerify(token)
            const nowInSeconds = Math.floor(Date.now() / 1000);
            if (session.exp < nowInSeconds) {
              session = null;
            }
          } catch (error) {
            session = null;
          }
        }

        return { session };
      },
    })
  );

  await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
};
