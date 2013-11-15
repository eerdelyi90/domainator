var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var Log            = require('../models').Log;
var User            = require('../models').User;
var Domain            = require('../models').Domain;
var bcrypt          = require('bcrypt-nodejs');
var LogsController = new Controller();
var login           = require('connect-ensure-login');


LogsController.show = function(){

    var this_ = this;

    // these variables come from the url
    var moduleRef = this.param('moduleRef')
    var moduleName = this.param('moduleName');

    var searchJson = {};

    //this checks whether a module exists. This is where new filter columns need to be added
    if(typeof moduleName != undefined){
      switch(moduleRef){
        case 'module_name':
        searchJson.where = { 'module_name': moduleName };
          break;
        case 'user_id':
        searchJson.where = { 'user_id': moduleName };
          break;
        case 'description':
        searchJson.where = { 'description': moduleName };
          break;
           case 'module_event_id':
        searchJson.where = { 'module_event_id': moduleName };
          break;
           case 'change':
        searchJson.where = { 'change': moduleName };
          break;
        default:
          break;

      }
    }
     
      
    //show logs that match filter criteria above
    Log.findAll(searchJson)
    .success(function(logs) {
      var syncronisationsComplete = 0;
      logs.forEach(function(log, index){
        log.getUser().success(function(user){
          logs[index].User = user;
          ++syncronisationsComplete;
          if(syncronisationsComplete == logs.length) {

           this_.render({'logs' : logs});

          }
        });
      });

    })   
    .error(function(error) {
      this_.next(error);
    });


}

LogsController.index = function() {
  var this_ = this;
   
    //create a filter search dynamically with no duplicates
    var onSelectComplete = function(logs) {
      var uniqueLogs = {};

      var filterBy = ['module_name', 'user_id', 'description','module_event_id','change'];

      filterBy.forEach(function(fieldName){
         uniqueLogs[fieldName] = [];
         logs.forEach(function(log){

          if(uniqueLogs[fieldName].indexOf(log[fieldName]) == -1){
             uniqueLogs[fieldName].push(log[fieldName]);
          }
          
        });

      })

      this_.render({'logs' : logs, 'uniqueLogs' : uniqueLogs});
    }

    //retrieve all logs and log searchables
    Log.findAll()
    .success(function(logs) {
      var syncronisationsComplete = 0;
      logs.forEach(function(log, index){
        log.getUser().success(function(user){
          logs[index].User = user;
          ++syncronisationsComplete;
          if(syncronisationsComplete == logs.length) {

            onSelectComplete(logs);

          }
        });
      });

    })   
    .error(function(error) {
      this_.next(error);
    });

};

//this is the security redirect
LogsController.before('*', login.ensureLoggedIn('/login'));

module.exports = LogsController;
