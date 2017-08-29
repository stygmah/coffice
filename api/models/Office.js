/**
 * Office.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

 var schema = new mongoose.Schema({
     name: {type:mongoose.Schema.Types.Mixed, required:true}
 }, { collection: 'office', minimize: false  });




var Office = schema;

module.exports = Office;