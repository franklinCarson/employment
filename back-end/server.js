const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

const dbName = "employment";

const PENDING = "pending";
const ACCEPTED = "accepted";
const CONTACTED = "contacted";

// connect to the database
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true
});

// Users module
const users = require("./users.js");
app.use("/api/users", users.routes);

const opportunitySchema = new mongoose.Schema({
    title: String,
    description: String,
    contactID: String,
    status: String,
});

const contactSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String
});


const infoRequestSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    status: String,
    opportunityTitle: String
});


const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    password: String,
    role: String
});

schemas = [opportunitySchema, contactSchema, infoRequestSchema, userSchema];

schemas.forEach(function(schema) {

    schema.virtual('id')
        .get(function () {
            return this._id.toHexString();
        });

    schema.set('toJSON', {
        virtuals: true
    });

});

const Opportunity = mongoose.model('Opportunity', opportunitySchema);
const Contact = mongoose.model('Contact', contactSchema);
const InfoRequest = mongoose.model('InfoRequest', infoRequestSchema);

app.post('/api/opportunity', async (req, res) => {
    const contact = new Contact({
        firstName: req.body.contact.firstName,
        lastName: req.body.contact.lastName,
        email: req.body.contact.email
    });

    try {
        var savedContact = await contact.save();
        const opp = new Opportunity({
            title: req.body.title,
            description: req.body.description,
            contactID: savedContact.id,
            status: PENDING
        });

        savedOpp = await opp.save();
        return res.send({ opportunity: savedOpp });
    } catch (e) {
        return res.sendStatus(500)
    }
});

async function getOpps(status){
    return Opportunity.find({
        status: status
    })
}

app.get('/api/opportunity', async (req, res) => {
    try {
        opps = await getOpps(ACCEPTED);
        return res.send({ opportunities: opps })
    } catch (e) {
        return res.sendStatus(500)
    }
});

app.get('/api/opportunity/:status', async (req, res) => {
    let status = req.params.status;
    try {
        opps = await getOpps(status);
        return res.send({ opportunities: opps })
    } catch (e) {
        return res.sendStatus(500)
    }
});

// You need to handle the exceptions from the find/ save in this function.
async function approveOpportunity(req){

    let opp = await Opportunity.findOne({
        _id: req.body.id
    });

    opp.status = ACCEPTED;

    await opp.save();


    return opp;
}

// You need to handle the exception from the deleteOne in this function.
async function deleteOpportunity(req) {

    oppID = req.id;

    await Opportunity.deleteOne({
        _id: oppID
    })
}

app.patch('/api/opportunity', async (req, res) => {

    let action = req.body.action;
    let resBody;
    try {
        switch (action) {
            case 'approve':
                resBody = approveOpportunity(req);
                return res.send(resBody);

            case 'decline':
                resBody = deleteOpportunity(req);
                return res.sendStatus(200);

            default:
                return res.sendStatus(400);
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

app.delete('/api/opportunity/:id', async (req, res) => {
   try {
       await Opportunity.deleteOne({
           _id: req.params.id
       });
       return res.sendStatus(200)
   } catch (e) {
       console.log(e);
       return res.sendStatus(500)
   }
});

app.post('/api/infoRequest', async (req, res) => {

    let infoReq = new InfoRequest(req.body);
    infoReq.status = PENDING;

    try {

        await infoReq.save();
        return res.sendStatus(200)
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

app.get('/api/infoRequests/:status', async (req, res) => {
    let status = req.params.status;

    try {
        let requests = await InfoRequest.find({
            status: status
        });

        return res.send(requests);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

app.patch('/api/infoRequest/:id', async (req, res) => {
    let id = req.params.id;

    try {
        let infoReq = await InfoRequest.findOne({
            _id: id
        });
        if(!infoReq){
            return res.sendStatus(400)
                .send({
                    message: "Info request doesn't exist."
                })
        }

        infoReq.status = CONTACTED;

        await infoReq.save();
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

app.listen(3000, () => {console.log("Listening on port 3000...")});