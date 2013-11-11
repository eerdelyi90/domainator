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
    module_name: 'account',
    module_event_id: this.req.user.id,
    user_id: this.req.user.id,
    timestamp: new Date()
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