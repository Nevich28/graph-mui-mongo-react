const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

const PORT = 3005;

const DB =
    'mongodb+srv://andreymarand:Qt8Jj94KjCRvdtlP@cluster0.koj1njd.mongodb.net/graphql-tutorial?retryWrites=true&w=majority';

mongoose.connect(DB, {
    useNewUrlParser: true, // new parameters
    useUnifiedTopology: true,
});

app.use('/graphql', graphqlHTTP({ schema, graphiql: true }));

const dbConnection = mongoose.connection;
dbConnection.on('error', (err) =>
    console.log(`Connection error: ${err}`),
);
dbConnection.once('open', () => console.log(`Connected to DB!`));

app.listen(PORT, (err) => {
    err
        ? console.log(err)
        : console.log(`Server started on port ${PORT}!`);
});
