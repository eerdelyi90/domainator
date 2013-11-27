var locomotive        = require('locomotive');
var  path             = require('path');
var dateFormat        = require('dateformat');
var nodemailer        = require("nodemailer");
var cronJob           = require('cron').CronJob;
var Controller        = locomotive.Controller;
var Domain            = require('../models').Domain;
var Log               = require('../models').Log;
var DomainsController = new Controller();
var login             = require('connect-ensure-login');
var parseXlsx         = require('excel-parser');
var csv               = require('csv')
var fs                = require('fs');
var now               = new Date();
now                   = now.setMonth(now.getMonth()+1);
now                   = dateFormat(now, "yyyy-mm-dd");

var sendmailTransport = nodemailer.createTransport("SMTP", {
    host: "smtp.cyb.co.uk", // hostname
    secureConnection: false, // use SSL
    port: 25, // port for secure SMTP
    auth: {
        user: "techsupport@cyb.co.uk",
        pass: "rebyc01"
    }
});

 var mailOptions = {
    from: "cyber@cyb.co.uk",
    to: "egon@cyb.co.uk",
    subject: "The following domains are due for renewal!",
    text: "Plaintext body"
}

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

DomainsController.import = function() {
  var row_holder = [];
  var csv_import = {};
  var this_ = this;
  var params  = this.req.body;

   var importCSV = function(path) {
        csv()
      .from.path(path, { delimiter: ',', escape: '"' })
      // .to.stream(fs.createWriteStream(__dirname+'../../../uploads/'+this_.req.files.csvupload.name))
      .transform( function(row){
        row.unshift(row.pop());
        return row;
      })
      .on('record', function(row,index){
        console.log(row);
        // row_holder.push(JSON.stringify(row));
      
      })
      .on('close', function(count){
        // when writing to a file, use the 'close' event
        // the 'end' event may fire before the file has been written
        console.log('Number of lines: '+count);
      })
      .on('error', function(error){
        console.log(error.message);
      });
        //   for(var i = 1; i<row_holder.length; i++){
      //   Domain.create(row_holder[i])
      //   .success(function(domain) {

      //   })
      //    .error(function(error) {
      //         this_.req.flash('error', 'Something went wrong! ' + error);
      //   }); 
      // }
}

  // console.log('data', this.req.files);
  fs.readFile(this.req.files.csvupload.path, function (err, data) {
    var newPath = __dirname + "../../../uploads/"+this_.req.files.csvupload.name;
  fs.writeFile(newPath, data, function (err) {
    importCSV(newPath);
    console.log('pass');
  });
});




};
DomainsController.export = function() {
   var this_    = this;
   var now_ext  = new Date();
   var csv      = 'registrar,action,renewed,price,domain,expiry,registrant,registrant id,registrant email,contact name,address1,address2,address3,city,county,postcode,country,dns0,dns1,dns2,\n';
   var fileName = 'currentexport'+now+'.csv';
   var newPath  = __dirname + "../../../downloads/"+fileName;
   
// load all Domains
  Domain.findAll()
    .success(function(domains) {
       domains.forEach(function(domain) {
        csv += domain.registrar + ',' + domain.action + ','+ domain.renewed.format()+ ',' + domain.price+ ',' + domain.domain+ ',' + domain.expiry.format() + ','+ domain.registrant+ ',' + ',' + domain.registrant_email+ ',' + domain.contact_name+ ',' + domain.address1+ ',' + domain.address2 + ','+ domain.address3 + ','+ domain.city+ ',' + domain.county +',' + domain.postcode + ',' + domain.country +  ','+ domain.DNS0+ ',' + domain.DNS1+ ',' + domain.DNS2+ ','+'\n' ;
          fs.writeFile(newPath, csv, function (err) {
            console.log('pass2');
            this_.res.sendfile(fileName, {'root': __dirname +'../../../downloads'});
          });
        });
      })
    .error(function(error) {
      this_.next(error);
    });

};

DomainsController.quickedit = function(){

  var this_ = this;
  var params  = this.req.body;
  var dbobject = {};
  var unixdate = new Date(params.date);
  console.log(unixdate);

  switch(params.action){
    case 'paid':
      dbobject = {paid : params.date};
      break;
    case'invoiced':
     dbobject = {invoiced : params.date};
      break;
    case 'renewed':
     dbobject = {renewed : params.date};
      break;
    default:
    break;
  }

  console.log(this.req.body.date,this.req.body.action,this.req.body.id);

  Domain.find(this.param('id'))
    .success(function(domain) {
      domain.updateAttributes(dbobject)
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



DomainsController.create = function() {
  var this_   = this;
  var params  = this.req.body;
  var path    = this.domainsPath();

  

  Domain.create(params)
    .success(function(domain) {
      var params2 = {
      module_name     : 'domains',
      module_event_id : domain.id,
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

  // Get what it looked like before
  // Get what it looked like after
  // Create a string with the fields that differ
 
  Domain.find(this.param('id'))
    .success(function(domain) {

          var params2 = {
            'module_name'     : 'domains',
            'module_event_id' : domain.id,
            'user_id'         : this_.req.user.id,
            'timestamp'       : new Date(),
            'description'     : 'updated',
            'change'          :  domain.client
          };

          Log.create(params2)
           .success(function(){


          })
          .error(function(error) {
            this_.req.flash('error', 'Something went wrong! ' + error);
          // this_.redirect(path);
          }); 

      domain.updateAttributes(params)
        .success(function() {
            // console.log("PARAMS", params);
      
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



DomainsController.destroy = function(){

  var this_   = this;
  var id    = this.param('id');

  

  Domain.find(id)
  .success(function(domain) {
    var params2 = {
    module_name     : 'domains',
    module_event_id : domain.id,
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
      // now i'm gone :)
      this_.req.flash('success', 'Domain was deleted!');
      domain.destroy();

    })
    .error(function(error) {
          this_.req.flash('error', 'Something went wrong! ' + error);
          // this_.redirect(path);
    });

};

DomainsController.alerts = function(){

    var this_ = this;

    var job = new cronJob({
      cronTime: '00 30 11 * * 1-7',
      onTick: function() {
        // Runs every weekday (Monday through Friday)
        // at 11:30:00 AM. It does not run on Saturday
        // or Sunday.
    Domain.findAll(
    {where: "expiry >= '" + now + "'" },
    {raw: true})
    .success(function(domains) {
      console.log("sending mail",domains.length);
      if(domains.length == 0){

      }else{

        var domainInfo = '';

        for(i in domains) {
          domain = domains[i];
          domainInfo += ' + ' + domain.domain;
          domainInfo += ' expires on' + domain.expiry;
          domainInfo += '. The registrar is ' + domain.registrar;
          domainInfo += '. The cost is ' + domain.price + "\n";
        }

        var mailOptions = {
          from: "cyber@cyb.co.uk",
          to: "egon@cyb.co.uk",
          subject: "The following domains are due for renewal!",
          text: "These domains need to be renewed within the next month: \n\n" +  domainInfo 
      }
      sendmailTransport.sendMail(mailOptions,  function(error, responseStatus){
      console.log(error);
          if(!error){
              console.log(responseStatus.message); // response from the server
              console.log(responseStatus.messageId); // Message-ID value used

                   var params2 = {
                    module_name     : 'cron_alert',
                    module_event_id : domain.id,
                    user_id         : 1,
                    timestamp       : new Date(),
                    description     : 'renewal',
                    change          : domain.domain
                  };

                  Log.create(params2)
                    .success(function(){


                  })
                    .error(function(error) {
                     this_.req.flash('error', 'Something went wrong! ' + error);
                    // this_.redirect(path);
                   }); 
          }
      });

      console.log("sent!");
      }
    })
    .error(function(error) {
      this_.next(error);
    });
      },
      start: false,
    });
  job.start();


  // load all Domains
 


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

DomainsController.before('*', login.ensureLoggedIn('/login'));

module.exports = DomainsController;
