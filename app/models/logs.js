module.exports = function(sequelize, Sequelize) {

  return sequelize.define('Log', {
    module_name         : Sequelize.STRING,
    module_event_id     : Sequelize.INTEGER,
    user_id             : Sequelize.INTEGER,
    timestamp           : Sequelize.DATE,
    description         : Sequelize.STRING
    });
};