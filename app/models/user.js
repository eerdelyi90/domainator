var bcrypt     = require('bcrypt-nodejs');

module.exports = function(sequelize, Sequelize) {
	
  var User = sequelize.define('User', {
    username  : Sequelize.STRING,
    password  : Sequelize.STRING,
    firstname : Sequelize.STRING,
    lastname  : Sequelize.STRING
  }, {
	classMethods: {
		authenticate: function(password, username, callback) {

			var this_ = this;

			// Hash using bcrypt
			var hash =  bcrypt.hashSync(password);
			var error = '';
			var user = false;

			this.findAll({ where: {
				username: username
			}}).success(function(users) {

				if(users.length > 0 && bcrypt.compareSync(password, users[0].password)) {
					user = users[0];
				} else {
					 if(typeof callback == 'function') {
					callback(error, user);
				} else {
					throw new Exception('Callback not a function');
				}
					// error = 'User not found';
				}

				if(typeof callback == 'function') {
					callback(error, user);
				} else {
					throw new Exception('Callback not a function');
				}

			});

		}
	},
	instanceMethods: {

	}
  });

  return User;

};

/*User.authenticate = function(password, username) {
  var this_ = this;

  // Hash using bcrypt
  var hash =  bcrypt.hashSync(password);

  User.findAll({ where: {
      username: username
    }}).success(function(users) {
    if(users.length > 0 && bcrypt.compareSync(password, users[0].password)) {
      return users[0].username;
    } else {
      // NOOs
      return false;
      console.log("NOOO");
    }
  });
};*/