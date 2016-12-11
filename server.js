import Koa from 'koa';
import graphqlHTTP  from 'koa-graphql';
import convert from 'koa-convert';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import schema from './src/graphql';
import {mongoConfig} from './src/config';
import {fromLogin} from './src/logic/authService';


const app = new Koa();
const router = new KoaRouter();

app.use(convert(bodyParser()));

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


router.all('/graphiql', convert(graphqlHTTP(async function (req) {

    const viewer = await fromLogin({name: "Hugo", password: "123456"});
    console.log('viewer:'+JSON.stringify(viewer));
    return {
        schema: schema,
        graphiql: true,
        pretty: true,
        context: {
            viewer: viewer
        }
    }
})));


app.use(router.routes()).use(router.allowedMethods());
// graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({
//     schema: schema,
//     context: {}
// }));
// graphQLServer.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}));

//app.use(router.routes()).use(router.allowedMethods());

let server = app.listen(8080, () => {

    console.log('listening at port', server.address().port);
});