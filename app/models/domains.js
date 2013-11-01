module.exports = function(sequelize, Sequelize) {
  return sequelize.define('Domain', {
  	Registrar         : Sequelize.STRING,
  	Action            : Sequelize.STRING,
  	Renewed           : Sequelize.STRING,
  	Price             : Sequelize.STRING,
    Domain            : Sequelize.STRING,
    Expiry            : Sequelize.STRING,
    Registrant        : Sequelize.STRING,
    Registrant_email  : Sequelize.STRING,
    Contact_name      : Sequelize.STRING,
    Address1          : Sequelize.STRING,
    Address2          : Sequelize.STRING,
    Address3          : Sequelize.STRING,
    City              : Sequelize.STRING,
    County            : Sequelize.STRING,
    Postcode          : Sequelize.STRING,
    Country           : Sequelize.STRING,
    DNS0              : Sequelize.STRING,
    DNS1              : Sequelize.STRING,
    DNS2              : Sequelize.STRING
  });
};
