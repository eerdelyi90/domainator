var locomotive      = require('locomotive');
var Controller      = locomotive.Controller;
var Price            = require('../models').Price;
var bcrypt          = require('bcrypt-nodejs');
var PricesController = new Controller();
var Log               = require('../models').Log;
var login           = require('connect-ensure-login');


PricesController.index = function() {
  var this_ = this;

  // load all Price
  Price.findAll()
    .success(function(prices) {
      this_.render({ prices : prices });
    })
    .error(function(error) {
      this_.next(error);
    });
};

PricesController.quickedit = function(){

  var this_ = this;
  var params  = this.req.body;
  var dbobject = {};
  var id    = this.param('id');
  console.log('action', params.action, 'text', params.text,'id', params.id, this.param('id'));
  // var unixdate = new Date(params.date);
  // console.log(unixdate);

  switch(params.action){
    case 'domaintype':
      dbobject = {domaintype : params.text};
      console.log('fuuu', dbobject);
      break;
    case'registrar':
     dbobject = {registrar : params.text};
  
      break;
    case 'price':
     dbobject = {price : params.text};
      break;
    case 'year':
     dbobject = {year : params.text};
      break;
      case 'comment':
      dbobject = {comment : params.text};
      break;
    default:
    console.log('type not found');
    break;
  }

  console.log(dbobject);

  Price.find(id)
    .success(function(price) {
        price.updateAttributes(dbobject)
        .success(function() {
          this_.req.flash('success', 'Date for ' + params.action + 'has been updated!' );
        })
        .error(function(error) {
          this_.req.flash('error', 'Something went wrong! ' + error);
          
        });
    })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      
    });
};

PricesController.new = function() {
  // console.log(price);
   this.render({ price : {} });
};

PricesController.create = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.pricesPath();

  Price.create(params)
    .success(function(price) {
         var params2 = {
          module_name     : 'price list',
          module_event_id : this_.req.user.id,
          user_id         : this_.req.user.id,
          timestamp       : new Date(),
          description     : 'created',
          change          : 'all'
        };

        Log.create(params2)
          .success(function(){


        })
          .error(function(error) {
            this_.req.flash('error', 'Something went wrong! ' + error);
            // this_.redirect(path);
          }); 
      this_.req.flash('success', 'New user was created!');
      this_.redirect(path);
    })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      this_.redirect(path);
    });
};

PricesController.destroy = function(){

  var this_   = this;
  var id    = this.param('id');
    var params2 = {
    module_name     : 'price',
    module_event_id : Price.id,
    user_id         : this_.req.user.id,
    timestamp       : new Date(),
    description     : 'deleted',
    change          :  'all'
  };

  Log.create(params2)
    .success(function(){


  })
    .error(function(error) {
      this_.req.flash('error', 'Something went wrong! ' + error);
      // this_.redirect(path);
    });
  

  Price.find(id)
  .success(function(price) {
 
      // now i'm gone :)
      this_.req.flash('success', 'Price was deleted!');
      if(price != null){
      price.destroy();
    }

    })
    .error(function(error) {
          this_.req.flash('error', 'Something went wrong! ' + error);
          // this_.redirect(path);
    });

};
PricesController.edit = function() {
  var this_ = this;
  var id    = this.param('id');

  Price.find(id)
    .success(function(price) {
      this_.render({ price : price });
    })
    .error(function(error) {
      this_.next(error);
    });
};

PricesController.update = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.pricesPath();



  Price.find(this.param('id'))
    .success(function(price) {
      price.updateAttributes(params)
        .success(function() {
          console.log(params);
            var params2 = {
              module_name     : 'price',
              module_event_id : price.id,
              user_id         : this_.req.user.id,
              timestamp       : new Date(),
              description     : 'updated',
              change          : 'price change'
            };

            Log.create(params2)
              .success(function(){


            })
              .error(function(error) {
                this_.req.flash('error', 'Something went wrong! ' + error);
                // this_.redirect(path);
              }); 
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

PricesController.before('*', login.ensureLoggedIn('/login'));

module.exports = PricesController;