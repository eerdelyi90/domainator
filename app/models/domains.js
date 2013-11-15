module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Domain', {
  	registrar         : Sequelize.STRING,
  	action            : Sequelize.STRING,
    client            : Sequelize.STRING,
  	renewed           : Sequelize.DATE,
  	price             : Sequelize.DECIMAL(10, 2),
    domain            : Sequelize.STRING,
    expiry            : Sequelize.DATETIME,
    renew             : Sequelize.INTEGER,
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
