import { Sequelize } from "sequelize";

const db = new Sequelize('db_posapp', 'root', '',{
    host : 'localhost',
    dialect : 'mysql'
});

export default db;