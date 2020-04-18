const express = require('express');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cookieSession = require('cookie-session');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(cookieParser());

// This sets us up to use cookie sessions
app.use(cookieSession({
    name: 'session',
    keys: ['secretValue'],
    cookie: {
        maxAge: 60 * 60 * 1000 // 1 Hour expiration.
    }
}));


const mongoose = require('mongoose');

const dbName = "employment";

// connect to the database
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// Users module
const users = require("./users.js");
app.use("/api/users", users.routes);

const infoRequests = require('./infoRequests.js');
app.use("/api/infoRequests", infoRequests.routes);

const opportunity = require('./opportunity.js');
app.use("/api/opportunity", opportunity.routes);

app.listen(3000, () => {console.log("Listening on port 3000...")});