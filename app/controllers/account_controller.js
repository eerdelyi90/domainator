var locomotive        = require('locomotive');
var passport          = require('passport');
var Controller        = locomotive.Controller;
var User              = require('../models').User;
var Log               = require('../models').Log;
var login             = require('connect-ensure-login');
var AccountController = new Controller();
//var now               = new Date()

AccountController.show = function() {
  
  var this_ = this;

  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ action: 'login' }));

  this.user = this.req.user;
  // console.log({
  //   module_name: 'account',
  //   module_event_id: this.req.user.id,
  //   user_id: this.req.user.id,
  //   timestamp: new Date()
  // });
  var params = {
    module_name     : 'account',
    module_event_id : this.req.user.id,
    user_id         : this.req.user.id,
    timestamp       : new Date(),
    description     : 'login'
  };
  Log.create(params)
  .success(function(log) {
  this_.render();
  })
  .error(function(error) {
  this_.render();
  });

    
  
};

AccountController.new = function() {
  this.render();
};

AccountController.loginForm = function() {

  this.render();
};

AccountController.login = function() {
  passport.authenticate('local', {
    successRedirect: this.urlFor({ action: 'show' }),
    failureRedirect: this.urlFor({ action: 'login' }) }
  )(this.__req, this.__res, this.__next);
};

AccountController.logout = function() {
    var params2 = {
    module_name     : 'account',
    module_event_id : this_.req.user.id,
    user_id         : this_.req.user.id,
    timestamp       : new Date(),
    description     : 'logout'
  };

  Log.create(params2)
    .success(function(){


  })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      // this_.redirect(path);
    }); 
  this.req.logout();
  this.redirect('/login');
};


AccountController.before('login', login.ensureLoggedOut('/'));
AccountController.before('login', passport.authenticate('local', { failureRedirect: '/login',
                                                                 failureFlash: true }));
// AccountController.before('*', function(){
// this.req
// });

module.exports = AccountController;