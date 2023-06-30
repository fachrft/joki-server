import { Sequelize } from 'sequelize';

const db = new Sequelize('db_joki', 'root', '' , {
    host: 'localhost',
    dialect : 'mysql'
})

export default db