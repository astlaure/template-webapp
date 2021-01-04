import { DataTypes, QueryInterface } from 'sequelize';

const migration = {
  up: async (query: QueryInterface) => {
    await query.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: DataTypes.DATE,
      },
      updatedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  down: async (query: QueryInterface) => {
    await query.dropTable('roles');
  },
};

export default migration;
