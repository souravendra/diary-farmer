import Sequelize, { DataTypes, Model } from 'sequelize';

class Tasks extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          primaryKey: true,
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
        },
        description: DataTypes.STRING,
        type: DataTypes.STRING,
        status: DataTypes.STRING,
        userId: DataTypes.UUID,
        createdBy: DataTypes.UUID,
        deletedAt: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Tasks',
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, {
      foreignKey: 'userId',
      targetKey: 'id',
    });
  }
}

export default Tasks;
