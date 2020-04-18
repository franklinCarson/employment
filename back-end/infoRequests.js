const mongoose = require('mongoose');
const express = require("express");
const users = require("./users.js");
const router = express.Router();

const validUser = users.valid;

const PENDING = "pending";
const CONTACTED = "contacted";


const infoRequestSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    status: String,
    opportunityTitle: String
});

infoRequestSchema.virtual('id')
    .get(function () {
        return this._id.toHexString();
    });

infoRequestSchema.set('toJSON', {
    virtuals: true
});

const InfoRequest = mongoose.model('InfoRequest', infoRequestSchema);

router.post('/', async (req, res) => {

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

router.get('/:status', validUser, async (req, res) => {
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

router.patch('/:id', validUser, async (req, res) => {
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
        res.sendStatus(200);
    } catch (e) {
        console.log(e);
        return res.sendStatus(500);
    }
});

module.exports = {
    routes: router,
    model: InfoRequest
};