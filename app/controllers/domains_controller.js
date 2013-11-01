var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var Domain            = require('../models').Domain;
var DomainsController = new Controller();

DomainsController.index = function() {
  var this_ = this;

  // load all Domains
  Domain.findAll()
    .success(function(Domains) {
      this_.render({ Domains : Domains });
    })
    .error(function(error) {
      this_.next(error);
    });
};

DomainsController.new = function() {
  this.render({ Domain : {} });
};

DomainsController.create = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.DomainsPath();

  Domain.create(params)
    .success(function(Domain) {
      this_.req.flash('success', 'New Domain was created!');
      this_.redirect(path);
    })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      this_.redirect(path);
    });
};

DomainsController.edit = function() {
  var this_ = this;
  var id    = this.param('id');

  Domain.find(id)
    .success(function(Domain) {
      this_.render({ Domain : Domain });
    })
    .error(function(error) {
      this_.next(error);
    });
};

DomainsController.update = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.DomainsPath();

  Domain.find(this.param('id'))
    .success(function(Domain) {
      Domain.updateAttributes(params)
        .success(function() {
          this_.req.flash('success', 'Domain was updated!');
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

module.exports = DomainsController;
