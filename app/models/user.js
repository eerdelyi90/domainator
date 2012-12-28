module.exports = {
  User        : null,
  initialize  : function(sequelize, Sequelize) {
    var User = this.User = sequelize.define('User', {
      username  : Sequelize.STRING,
      password  : Sequelize.STRING,
      firstname : Sequelize.STRING,
      lastname  : Sequelize.STRING
    });
    return User;
  }
};
