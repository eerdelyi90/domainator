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

  // Hash using bcrypt
  var hash =  bcrypt.hashSync(this.req.body.password);

  User.findAll({ where: {
      username: this.req.body.username
    }}).success(function(users) {
    if(users.length > 0 && bcrypt.compareSync(this_.req.body.password, users[0].password)) {
      console.log("YUUUUS");
    } else {
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
