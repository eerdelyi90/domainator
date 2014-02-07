module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Price', {
  	domaintype        : Sequelize.STRING,
    registrar         : Sequelize.STRING,
  	comment           : Sequelize.STRING,
    year              : Sequelize.STRING,
  	price             : Sequelize.DECIMAL(10, 2),
  });
};
