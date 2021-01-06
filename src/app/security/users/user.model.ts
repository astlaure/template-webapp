import { DataTypes, Model } from 'sequelize';
import database from '../../database/database';
import Role from '../roles/role.model';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public rememberToken!: string;
  public enabled!: boolean;

  public role!: Role;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public toResponse() {
    return {
      id: this.id,
      username: this.username,
      role: this.role,
      enabled: this.enabled,
    };
  }
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING(120),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  rememberToken: {
    type: DataTypes.STRING(64),
    allowNull: true,
  },
  enabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
}, {
  sequelize: database,
  tableName: 'users',
});

Role.hasMany(User, {
  foreignKey: 'roleId',
  sourceKey: 'id',
  as: 'role',
});
User.belongsTo(Role, {
  foreignKey: 'roleId',
  as: 'role',
});

export default User;
