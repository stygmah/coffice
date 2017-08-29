/**
 * OfficeController
 *
 * @description :: Server-side logic for managing offices
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var officeSchema = require('../models/Office');


module.exports = {
	getAll: function(req,res){
    var connection = DbService.connectDefault();
    var Office = connection.model('Office', officeSchema);
    Office.find({}).then(function(doc){
      return res.send(doc);
    },function(e){
      return res.send(e);
    });
    
  }
};

