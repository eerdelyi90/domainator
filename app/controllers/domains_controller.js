var locomotive        = require('locomotive');
var dateFormat        = require('dateformat');
var Controller        = locomotive.Controller;
var Domain            = require('../models').Domain;
var DomainsController = new Controller();
var now               = new Date();
now                   = now.setMonth(now.getMonth()+1);
now                   = dateFormat(now, "yyyy/mm/dd HH:MM:SS");
// var today             = new Date();
// var dd                = today.getDate();
// var mm                = today.getMonth()+1; //January is 0!
// var yyyy              = today.getFullYear();

DomainsController.index = function() {
  var this_ = this;

  // load all Domains
  Domain.findAll()
    .success(function(domains) {
      this_.render({ domains : domains });
    })
    .error(function(error) {
      this_.next(error);
    });
};

DomainsController.new = function() {
  this.render({ domain : {} });
};

DomainsController.create = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.domainsPath();

  Domain.create(params)
    .success(function(domain) {
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
    .success(function(domain) {
      this_.render({ domain : domain });
    })
    .error(function(error) {
      this_.next(error);
  });
};

DomainsController.update = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.domainsPath();
  // console.log("PARAMS", params);
  Domain.find(this.param('id'))
    .success(function(domain) {
      domain.updateAttributes(params)
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



DomainsController.destroy = function(req, res){

  var this_   = this;
  var id    = this.param('id');

  Domain.find(id)
  .success(function(domain) {
      // now i'm gone :)
      this_.req.flash('success', 'Domain was deleted!');
      domain.destroy();

    })
    .error(function(error) {
          this_.req.flash('error', 'Something went wrong! ' + error);
          // this_.redirect(path);
    });

};

DomainsController.alerts = function(req, res){

  var this_ = this;
  var currentDateString = 

  // load all Domains
  Domain.findAll(
    {where: "expiry >" now },
    {raw: true})
    .success(function(domains) {
      console.log("ahahahvwdghklsd;hohhhhhhhhhhhhhhhhhho;fweo;uhfo;ehf;owehf;ofhr;o");
      
    })
    .error(function(error) {
      this_.next(error);
    });

  /**
   * @TODO:
   *
   *   When the URL (/domains/alerts) is run, which will be with a CRON on
   *   the terminal. It will hunt for domains that are due to expire within
   *   X months (try and define X in a config file).
   *
   *   The alert will be a 'The domain is due to expire, please invoice X
   *   client and renew the domain once they have paid. The amount to invoice
   *   is £X which will renew them for X years and is for the following domain:
   *   X'
   */


}

module.exports = DomainsController;
