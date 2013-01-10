var should      = require('should');
var locomotive  = require('locomotive');
var models      = require('app/models');

describe('Application', function() {
  before(function(done) {
    // boot LocomotiveJS app
    this.app = new locomotive.Locomotive();
    this.app.boot(__dirname + '/..', 'test', function() {
      done();
    });
  });
  it('should have loaded the User model', function() {
    should.exist(models.User);
  });
});
