import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Users from './UsersModel.js';

const { DataTypes } = Sequelize

const Website = db.define('website', {
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    nomor_hp: {
        type: DataTypes.STRING(12),
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    jenis_web: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    harga: {
        type: DataTypes.INTEGER,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
       
}, {
    freezeTableNames: true,
});

Users.hasMany(Website)
Website.belongsTo(Users, {foreignKey: 'userId'})

export default Website; 
