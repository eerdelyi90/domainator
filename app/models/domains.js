module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Domain', {
  	registrar         : Sequelize.STRING,
  	action            : Sequelize.STRING,
  	renewed           : Sequelize.STRING,
  	price             : Sequelize.STRING,
    domain            : Sequelize.STRING,
    expiry            : Sequelize.STRING,
    registrant        : Sequelize.STRING,
    registrant_email  : Sequelize.STRING,
    contact_name      : Sequelize.STRING,
    address1          : Sequelize.STRING,
    address2          : Sequelize.STRING,
    address3          : Sequelize.STRING,
    city              : Sequelize.STRING,
    county            : Sequelize.STRING,
    postcode          : Sequelize.STRING,
    country           : Sequelize.STRING,
    DNS0              : Sequelize.STRING,
    DNS1              : Sequelize.STRING,
    DNS2              : Sequelize.STRING
  });
};
