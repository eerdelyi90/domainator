var fs        = require('fs');
var path      = require('path');
var async     = require('async');
var Sequelize = require("sequelize");

// setup sequelize
module.exports = function(done) {
  // store reference to sequelize in app instance
  this.sequelize = new Sequelize(null, null, null, {
    dialect : 'sqlite',
    storage : 'locomotive-sequelize-boilerplate.db',
    logging : console.log
  });

  // find models and load them
  var modelsdir = __dirname + '/../../app/models';
  var this_     = this;
  async.forEachSeries(fs.readdirSync(modelsdir).sort(), function(file, next) {
    /* match .js files only (for now) */
    if (/\.js$/.test(file))
    {
      // load model
      var mod   = require(path.join(modelsdir, file));
      var model = mod.initialize(this_.sequelize, Sequelize);

      /* sync model (creates tables if they don't yet exist) */
      model.sync()
        .success(function() {
          next();
        })
        .error(function(error) {
          next(error);
        });
    }
    else
      next();
  }, function() {
    done();
  });
};
