var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var User            = require('../models').User;
var LoginController = new Controller();
LoginController.index = function() {
  var this_ = this;

  // load all Users
  User.findAll()
    .success(function(users) {
      this_.render({ users : users });
    })
    .error(function(error) {
      this_.next(error);
    });
};
LoginController.new = function() {
  this.render({ login : {} });
};

module.exports = LoginController;
