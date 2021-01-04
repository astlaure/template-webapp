import { DataTypes, QueryInterface } from 'sequelize';

const migration = {
  up: async (query: QueryInterface) => {
    await query.createTable('users', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: DataTypes.STRING(120),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(64),
        allowNull: false,
      },
      rememberToken: {
        type: DataTypes.STRING(64),
        allowNull: true,
      },
      roleId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'roles',
          key: 'id',
        },
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
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
    await query.dropTable('users');
  },
};

export default migration;
