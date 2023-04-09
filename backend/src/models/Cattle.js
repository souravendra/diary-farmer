import Sequelize, { DataTypes, Model } from 'sequelize';

class Cattle extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        serial_code: DataTypes.STRING,
        age: DataTypes.INTEGER,
        gender: DataTypes.STRING,
        farm: DataTypes.STRING,
        ownerId: DataTypes.UUID,
        health: DataTypes.STRING,
        status: DataTypes.STRING,
        utilization: DataTypes.FLOAT,
        deletedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Cattle',
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'ownerId',
      targetKey: 'id',
    });
  }
}

export default Cattle;
