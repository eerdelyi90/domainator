var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var User            = require('../models').User;
var UsersController = new Controller();

UsersController.index = function() {
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

UsersController.new = function() {
  this.render({ user : {} });
};

UsersController.create = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.usersPath();

  User.create(params)
    .success(function(user) {
      this_.req.flash('success', 'New user was created!');
      this_.redirect(path);
    })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      this_.redirect(path);
    });
};

UsersController.edit = function() {
  var this_ = this;
  var id    = this.param('id');

  User.find(id)
    .success(function(user) {
      this_.render({ user : user });
    })
    .error(function(error) {
      this_.next(error);
    });
};

UsersController.update = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.usersPath();

  User.find(this.param('id'))
    .success(function(user) {
      user.updateAttributes(params)
        .success(function() {
          this_.req.flash('success', 'User was updated!');
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

module.exports = UsersController;
