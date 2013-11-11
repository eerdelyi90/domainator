var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var User            = require('../models').User;
var bcrypt          = require('bcrypt-nodejs');
var UsersController = new Controller();
var Log               = require('../models').Log;
var login           = require('connect-ensure-login');


UsersController.p_generate = function(){
var this_ = this;

}

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

  // Encrypt us some pazzw0rfd
  params.password = bcrypt.hashSync(params.password);
  // paramas.password = encrypt(params.password);

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

  params.password = bcrypt.hashSync(params.password);

  // console.log(params);
  var params2 = {
    module_name     : 'users',
    module_event_id : this_.req.user.id,
    user_id         : this_.req.user.id,
    timestamp       : new Date(),
    description     : 'updated'
  };

  Log.create(params2)
    .success(function(){


  })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      // this_.redirect(path);
    }); 

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

UsersController.destroy = function(req, res){

  var this_   = this;
  var id    = this.param('id');

    var params2 = {
    module_name     : 'users',
    module_event_id : this_.req.user.id,
    user_id         : this_.req.user.id,
    timestamp       : new Date(),
    description     : 'deleted'
  };

  Log.create(params2)
    .success(function(){


  })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      // this_.redirect(path);
    }); 

  User.find(id)
  .success(function(user) {
      // now i'm gone :)
      this_.req.flash('success', 'User was deleted!');
      user.destroy();

    })
    .error(function(error) {
          this_.req.flash('error', 'Something went wrong! ' + error);
          // this_.redirect(path);
    });

};
UsersController.before('*', login.ensureLoggedIn('/login'));

module.exports = UsersController;
