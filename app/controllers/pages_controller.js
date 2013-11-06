var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , User       = require('../models').User;

var PagesController = new Controller();

PagesController.main = function() {
  this.title = 'Dashboard';
  this.stuff ='stuff';
  this.render();
}
PagesController.login = function(req, res) {
  this.title = 'login';
  this.stuff ='login';

  console.log(req);

  User.findAll({ where: ["username = ?" , req.body.username],["password = ?", req.body.password}).success(function(users) {
    if(users.length > 0)
      // Greate
      console.log("GREAAAT");
    else
      // NOOs
      console.log("NOOO");
  });
  this.render();
}
PagesController.settings = function() {
  this.title = 'settings';
  this.stuff ='settings';
  this.render();
}

module.exports = PagesController;
