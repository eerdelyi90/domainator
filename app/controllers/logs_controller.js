var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var Log            = require('../models').Log;
var User            = require('../models').User;
var Domain            = require('../models').Domain;
var bcrypt          = require('bcrypt-nodejs');
var LogsController = new Controller();
var login           = require('connect-ensure-login');


LogsController.p_generate = function(){
var this_ = this;

}

LogsController.index = function() {
  var this_ = this;
    // Load logs
    // this.current_user = this.req.user ;
    
    var onSelectComplete = function(logs) {
      var uniqueLogs = {};

      // Loop though alll,
      //  Loop through all
      //    Assign key to object key and item to array if not already exists
      //    
      // uniqueLogs= {
      //  module: [],
      //  time: [],
      //  description: []
      // }
      
      var filterBy = ['module_name', 'user_id', 'description'];

      filterBy.forEach(function(fieldName){
         uniqueLogs[fieldName] = [];
         logs.forEach(function(log){

          if(uniqueLogs[fieldName].indexOf(log[fieldName]) == -1){
             uniqueLogs[fieldName].push(log[fieldName]);
          }
          
        });

      })

      console.log(uniqueLogs);

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
    // User.findAll()
    // .success(function(users) {

    //    Domain.findAll()
    //    .success(function(domains) {
    //       this_.render({ domains : domains , users : users  });
    //    })
    //  .error(function(error) {
    //     this_.next(error);
    //   });
    // })
    // .error(function(error) {
    //   this_.next(error);
    // });
};

// LogsController.before('*', login.ensureLoggedIn('/login'));

module.exports = LogsController;
