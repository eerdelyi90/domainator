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

    var moduleName = this.param('moduleName');
    var userID = this.param('userID');

    var searchJson = {};

    if(typeof moduleName != undefined)
      searchJson.where = { 'module_name': moduleName };

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
    // Load logs
    // this.current_user = this.req.user ;
    
    var onSelectComplete = function(logs) {
      var uniqueLogs = {};

      var filterBy = ['module_name', 'user_id', 'description'];

      filterBy.forEach(function(fieldName){
         uniqueLogs[fieldName] = [];
         logs.forEach(function(log){

          if(uniqueLogs[fieldName].indexOf(log[fieldName]) == -1){
             uniqueLogs[fieldName].push(log[fieldName]);
          }
          
        });

      })

      // console.log(uniqueLogs);

      this_.render({'logs' : logs, 'uniqueLogs' : uniqueLogs});
    }

    
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

// LogsController.before('*', login.ensureLoggedIn('/login'));

module.exports = LogsController;
