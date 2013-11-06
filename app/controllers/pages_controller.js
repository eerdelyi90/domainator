var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , User       = require('../models').User
  , bcrypt     = require('bcrypt-nodejs');

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Dashboard';
  this.stuff ='stuff';
  this.render();
}

PagesController.login = function() {

  this.title = 'login';
  this.stuff ='login';
  var this_ = this;

  // console.log('req:', this.req.body);

  // , ["password = ?", this.req.body.password]
  User.findAll({ where: {
      username: this.req.body.username,
      password: this.req.body.password
    }}).success(function(users) {
    if(users.length > 0){
  
    }else{
      // NOOs
      console.log("NOOO");
    }
  });
  // this.render();

}

PagesController.settings = function() {
  this.title = 'settings';
  this.stuff ='settings';
  this.render();
}

module.exports = PagesController;
