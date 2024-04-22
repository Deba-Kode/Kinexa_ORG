import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import typeDefs from "./SchemalGQL.js";
import resolvers from './resolvers.js';
import mongoose from 'mongoose';

mongoose.connect(`mongodb+srv://debashishadcs:qwerty12345@kinexa.nbb9j9q.mongodb.net/Kinexa`)
    .then(() => {
        console.log(`Mongoose Atlas db is connected with ${mongoose.connection.host}`);
    })
    .catch(error => {
        console.error("Error connecting to MongoDB Atlas:", error);
    });

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground()
    ]
});

server.listen().then(({ url }) => {
    console.log(`🚀 Listening to the server at port 4000`);
});
