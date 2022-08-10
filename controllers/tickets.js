const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

module.exports ={
    new: newTicket,
    create,
};

function newTicket(req, res) {
    res.render('tickets/new', {flightId: req.params.id});
};

function create(req, res) {
    flightDocumentId = req.params.id;
    req.body.flight = flightDocumentId; 
    Ticket.create(req.body, function(err, ticket){
        res.redirect(`/flights/${flightDocumentId}`);
    });
};

