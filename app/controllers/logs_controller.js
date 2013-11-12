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
    
    Log.findAll({ include: [ User ] })
    .success(function(logs) {

      this_.render({logs : logs});

      /**
       * @todo  - Replace this bullshit, e.g. hasMany
       */
      /*var syncronisationsComplete = 0;
      logs.forEach(function(log, index){
        log.getUser().success(function(user){
          logs[index].User = user;
          ++syncronisationsComplete;
          if(syncronisationsComplete == logs.length) {
            this_.render({logs : logs});
          }
        });
      });*/

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
