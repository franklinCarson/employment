const mongoose = require('mongoose');
const express = require("express");
const users = require("./users.js");
const router = express.Router();

const validUser = users.valid;

const ACCEPTED = "accepted";
const PENDING = "pending";

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

let schemas = [opportunitySchema, contactSchema];

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

/* -- API Endpoints --*/

router.post('/', async (req, res) => {
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

        let savedOpp = await opp.save();
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

router.get('/', async (req, res) => {
    try {
        let opps = await getOpps(ACCEPTED);
        return res.send({ opportunities: opps })
    } catch (e) {
        return res.sendStatus(500)
    }
});

router.get('/:status', async (req, res) => {
    let status = req.params.status;
    try {
        let opps = await getOpps(status);
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

    let oppID = req.id;

    await Opportunity.deleteOne({
        _id: oppID
    })
}

router.patch('/', validUser, async (req, res) => {

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
                return res.sendStatus(400)
                    .send({ message: "Requires a valid action." });
        }
    } catch (e) {
        console.log(e);
        return res.sendStatus(500)
    }
});

router.delete('/:id', validUser, async (req, res) => {
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

module.exports = {
    routes: router,
    model: Opportunity
};