module.exports = (sequelize, DataTypes) => {
    const Plant = sequelize.define("plant", {
      // plantId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      //   primaryKey: true,
      //   autoIncrement: true
      // },
      // locationId: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false,
      // },

      plantName: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      plantType: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      sunRequirement: {
        type: DataTypes.ENUM("Full Sun", "Partial Sun/Shade", "Full Shade"),
        allowNull: false,
      },
      waterNeeds: {
        type: DataTypes.ENUM("Regularly", "Infrequently"),
        allowNull: false,
      },
      plantCare: {
        type: DataTypes.STRING,
        allowNull: true,
      }
    }, {
      tableName: 'plant'
    });
    // }, {
    //   tableName: 'plantLocation'
    // });

    return Plant;
  };