module.exports = function(sequelize, Sequelize) {
    
    var Users = sequelize.import(__dirname + "/user");

    var Log = sequelize.define('Log', {
        module_name      : Sequelize.STRING,
        module_event_id  : Sequelize.INTEGER,
        user_id          : {
            type         : Sequelize.INTEGER,
            references   : "Users",
            referencesKey: "id"
        },
        timestamp        : Sequelize.DATE,
        description      : Sequelize.STRING,
        change           : Sequelize.STRING
    });

    Log.belongsTo(Users, { foreignKey: 'user_id' });

    return Log;
   
};