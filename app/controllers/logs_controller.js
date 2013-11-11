var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var Log            = require('../models').Log;
var bcrypt          = require('bcrypt-nodejs');
var LogsController = new Controller();
var login           = require('connect-ensure-login');


LogsController.p_generate = function(){
var this_ = this;

}

LogsController.index = function() {
  var this_ = this;

  // load all Logs
  Log.findAll()
    .success(function(logs) {
      this_.render({ logs : logs });
    })
    .error(function(error) {
      this_.next(error);
    });
};

LogsController.new = function() {
  this.render({ log : {} });
};

LogsController.create = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.logsPath();

  // Encrypt us some pazzw0rfd
  params.password = bcrypt.hashSync(params.password);
  // paramas.password = encrypt(params.password);

  Log.create(params)
    .success(function(log) {
      this_.req.flash('success', 'New log was created!');
      this_.redirect(path);
    })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      this_.redirect(path);
    });
};

LogsController.edit = function() {
  var this_ = this;
  var id    = this.param('id');

  Log.find(id)
    .success(function(log) {
      this_.render({ log : log });
    })
    .error(function(error) {
      this_.next(error);
    });
};

LogsController.update = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.logsPath();

  params.password = bcrypt.hashSync(params.password);

  // console.log(params);

  Log.find(this.param('id'))
    .success(function(log) {
      log.updateAttributes(params)
        .success(function() {
          this_.req.flash('success', 'Log was updated!');
          this_.redirect(path);
        })
        .error(function(error) {
          this_.req.flash('error', 'Something went wrong! ' + error);
          this_.redirect(path);
        });
    })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      this_.redirect(path);
    });
};

LogsController.destroy = function(req, res){

  var this_   = this;
  var id    = this.param('id');

  Log.find(id)
  .success(function(log) {
      // now i'm gone :)
      this_.req.flash('success', 'Log was deleted!');
      log.destroy();

    })
    .error(function(error) {
          this_.req.flash('error', 'Something went wrong! ' + error);
          // this_.redirect(path);
    });

};
LogsController.before('*', login.ensureLoggedIn('/login'));

module.exports = LogsController;
