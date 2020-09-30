const Sequelize = require('sequelize');
const sequelize = new Sequelize('plant-pal-server', 'postgres', 'Grapesn2020.',
{
    host: 'localhost',
    dialect: 'postgres'
});
sequelize.authenticate().then(
    function(){
        console.log('connected to plantpal database');
    },
    function(err){
        console.log(err);
    }
);
User = sequelize.import("./models/user");
Plant = sequelize.import("./models/plant");
Location = sequelize.import("./models/location");


User.hasMany(Plant);
Plant.belongsTo(User);


User.hasMany(Location);
Location.belongsTo(User);


Location.hasMany(Plant, {
    foreignKey: "plantLocation",
    sourceKey: "locationId",
    as: 'locations'
});
Plant.belongsTo(Location,{
    foreignKey: "plantLocation",
    sourceKey: "locationId",
    as: "locations"
});



module.exports = sequelize

