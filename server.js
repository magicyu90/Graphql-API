import express from 'express';
import {graphqlExpress} from 'graphql-server-express';
import mongoose from 'mongoose';
import schema from './src/graphql';
import {mongoConfig} from './config';
import bodyParser from 'body-parser';
import { graphiqlExpress } from 'graphql-server-express';


var graphQLServer = express();

mongoose.Promise = global.Promise;
//connect to mongodb
mongoose.connect(mongoConfig.development, (err) => {

    if (err) {
        console.error('Could not connect to MongoDB on port 27017');
    }
    else {
        console.log('Connect to MongoDB on port 27017 successfully');
    }
});

graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
    schema: schema,
    context: {}
}));
graphQLServer.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));


let server = graphQLServer.listen(8080, () => {

    console.log('listening at port', server.address().port);
});