const Flight = require('../models/flight');
const Ticket = require('../models/ticket');

module.exports ={
    new: newFlight,
    index,
    create,
    show
};

function index(req, res){
    Flight.find({}).sort('departs').exec(function(err, allFlights){

        if(err){
            res.send("You have an error");
        }
        res.render('flights/index.ejs', {
            allFlights,
            currentDate: new Date()
        });
    })
};

function newFlight(req, res) {
    let newFlight = new Flight();
    let dep = newFlight.departs;
    let destinationDate = `${dep.getFullYear()}-${dep.getMonth() + 1}-${dep.getDate()}T${dep
		.getHours()
		.toString()
		.padStart(2, '0')}:${dep.getMinutes().toString().padStart(2, '0')}`;

    res.render('flights/new.ejs', {destinationDate});
}

function create(req, res){ 
    console.log(req.body)
    Flight.create(req.body, function(err, flightCreated){
		if(err){
            console.log(err, ' <- err in the flights create controller')
			return res.render('flights/new.ejs')
        }
            res.redirect('flights');
        });
};

function show(req, res) {
	Flight.findById(req.params.id, function(err, flightDocument) {
	  console.log(flightDocument, " <- show page")
      Ticket.find({flight: flightDocument._id}, function(err,tickets) {
	  res.render('flights/show', { flightDocument, tickets});
	});
  });
}