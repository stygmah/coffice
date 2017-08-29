/**
 * Office.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var schema = new mongoose.Schema({
    name: {type:mongoose.Schema.Types.Mixed, required:true},
    description:  {type:mongoose.Schema.Types.Mixed},
    owner: {type:mongoose.Schema.Types.Mixed, required:true},
    price: {
      amount: Number,
      currency: String,
      by: {type:mongoose.Schema.Types.Mixed}
    },
    attributes: {
       type: {type:mongoose.Schema.Types.Mixed},
       includes:{type:mongoose.Schema.Types.Mixed},
       availability:{type:mongoose.Schema.Types.Mixed},
       mood:{type:mongoose.Schema.Types.Mixed}
    },
    location:{
      geo: {
        lat: {type:mongoose.Schema.Types.Mixed},
        lon: {type:mongoose.Schema.Types.Mixed}
      },
      address: {type:mongoose.Schema.Types.Mixed}
    },
    bookings: [{type:mongoose.Schema.Types.Mixed}],
    reviews: [{type:mongoose.Schema.Types.Mixed}],
    submitedAt: Date,
    updatedAt: Date
 }, { collection: 'office', minimize: false  });

schema.pre('save', function(next){
  now = new Date();
  this.updatedAt = now;
  if ( !this.submitedAt ) {
    this.submitedAt = now;
  }
  next();
});


var Office = schema;

module.exports = Office;