var locomotive        = require('locomotive');
var passport          = require('passport');
var Controller        = locomotive.Controller;
var User              = require('../models').User;
var login             = require('connect-ensure-login');
var AccountController = new Controller();




AccountController.show = function() {
  if (!this.req.isAuthenticated())
    return this.res.redirect(this.urlFor({ action: 'login' }));

  this.user = this.req.user;
  this.render();
};

AccountController.new = function() {
  this.render();
};

AccountController.loginForm = function() {

  //console.log(this.req);

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

module.exports = AccountController;