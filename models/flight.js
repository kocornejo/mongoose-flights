const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new mongoose.Schema({

    airport: { 
     type: String,
     enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
 },

    arrival: Date
  

});



const flightSchema = new mongoose.Schema({

  airline: {
    type: String,
    enum: [ 'American', 'Southwest', 'United']
},


  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN']
},

 flightNo: {
  type: Number,
  min: 10,
  MAX: 9999
},


departs: {
  type: Date,
  default: function() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let day = d.getDate();
    let result = new Date(year + 1, month, day);
    return result;
  }
},

  destinations: [destinationSchema]
});


  module.exports = mongoose.model('Flight', flightSchema);
