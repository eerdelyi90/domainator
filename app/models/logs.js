module.exports = function(sequelize, Sequelize) {
    
    var User = sequelize.import(__dirname + "/user");

    var Log = sequelize.define('Log', {
        module_name      : Sequelize.STRING,
        module_event_id  : Sequelize.INTEGER,
        user_id          : {
            type         : Sequelize.INTEGER,
            references   : "User",
            referencesKey: "id"
        },
        timestamp        : Sequelize.DATE,
        description      : Sequelize.STRING
    });

    Log.belongsTo(User, { foreignKey: 'user_id' });

    return Log;
   
};