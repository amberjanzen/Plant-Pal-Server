module.exports = (sequelize, DataTypes) => {
    const Location = sequelize.define("location", {
      locationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      locationName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      locationDescription: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      sunExposure: {
        type: DataTypes.ENUM('full sun', 'partial sunshade', 'full shade'),
        allowNull: true,
      }


    });
    return Location;
  };
