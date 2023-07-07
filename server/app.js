const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3005;
let DB = process.env.DATABASE;

DB = DB.replace('<PASSWORD>', process.env.DATABASE_PASSWORD);
console.log(DB);

mongoose.connect(DB, {
    useNewUrlParser: true, // new parameters
    useUnifiedTopology: true,
});

app.use(cors());

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
