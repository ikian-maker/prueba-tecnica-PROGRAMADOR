import { Sequelize } from "sequelize";


const sequelize = new Sequelize('plux', 'root', 'Mysql1234*21', {
    host: 'localhost',
    dialect: 'mysql',
});

export default sequelize;