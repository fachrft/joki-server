import { Sequelize } from 'sequelize';
import db from '../config/Database.js';
import Users from './UsersModel.js';

const { DataTypes } = Sequelize

const PPT = db.define('ppt', {
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
    pelajaran_ppt: {
        type: DataTypes.STRING,
        allowNullValues: true,
        validate: {
            notEmpty: true,
        }
    },
    materi_ppt: {
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

Users.hasMany(PPT)
PPT.belongsTo(Users, {foreignKey: 'userId'})



export default PPT; 
