import { DataTypes, Model } from 'sequelize';
import database from '../../database/database';

class Role extends Model {
  public id!: number;
  public name!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Role.init({
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
}, {
  sequelize: database,
  tableName: 'roles',
});

export default Role;
