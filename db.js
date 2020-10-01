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


Plant.belongsTo(User);
User.hasMany(Plant);


Location.belongsTo(User);
User.hasMany(Location);


// Plant.belongsTo(Location);
// Location.hasMany(Plant);

Location.hasMany(Plant, {
    foreignKey: "locationId",
    sourceKey: "locationId",
    as: 'plant'
});

Plant.belongsTo(Location, {
    foreignKey: "locationId",
    sourceKey: "locationId",
    as: "plantlocation"
});



module.exports = sequelize

