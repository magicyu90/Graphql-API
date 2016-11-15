import express from 'express';
import graphqlHTTP from 'express-graphql';
import mongoose from 'mongoose';
import schema from './graphql';
import {mongoConfig} from './config';

let app = express();
app.use('/graphql', graphqlHTTP(req => ({
    schema,
    pretty: true,
    graphiql: true
})));

//connect to mongodb
mongoose.connect(mongoConfig.development,(err)=>{

    if(err){
        console.error('Could not connect to MongoDB on port 27017');
    }
    else{
        console.log('Connect to MongoDB on port 27017 successfully');
    }
});


let server= app.listen(8080,()=>{

    console.log('listening at port', server.address().port);
});