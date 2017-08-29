var mongoose = require('mongoose');

var connections = {};

var createDatabaseConnection = function(dbName){
    if(connections[dbName]){
         console.log("Connection to " + dbName + " existed");
    }
    else{
        console.log("New connection created to: " + dbName);
        initializeDb(dbName);
    }
};


var initializeDb = function(dbName){
    //var connection = mongoose.createConnection('mongodb://localhost:27017/' + dbName);
    var connectionString = sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].url + dbName;
    if(sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].replicaSet === true){
        connectionString += '?' + sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].replicaSetUrlConfig;
    }
    var connection = mongoose.createConnection(connectionString);
    
    connections[dbName] = connection;

    connection.on('connected', function () {
                console.log('Mongoose default connection open to  ' + dbName);
            });
            // When the connection is disconnected
    connection.on('disconnected', function () {
                console.log('Mongoose '+ dbName +' connection disconnected');
            });

            // If the Node process ends, close the Mongoose connection
    process.on('SIGINT', function() {
                connection.close(function () {
                    console.log(dbName +' connection disconnected through app termination');
                    process.exit(0);
                });
            });
    //initializeModels(dbName);
};

var getDatabaseConnection = function(dbName) {
    if(connections[dbName]) {
        //database connection already exist. Return connection object
        return connections[dbName];
    } else {
        var connectionString = 
            'mongodb://'
            + sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].host
            + ':' 
            + sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].port
            + '/'
            + dbName;
        if(sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].replicaSett === true){
            connectionString += '?' + sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].replicaSetUrlConfig;
        }
        connections[dbName] = mongoose.createConnection(connectionString);
        return connections[dbName];
    }
}

var connectDefault = function(){
    return getDatabaseConnection(sails.config.connections[sails.config.models[Object.keys(sails.config.models)[0]]].database);
}

module.exports.getDatabaseConnection = getDatabaseConnection;
module.exports.createDatabaseConnection = createDatabaseConnection;
module.exports.connectDefault = connectDefault;