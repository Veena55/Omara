import { sequelize } from './config/config.js';
const db = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connection established successfully.');
    }
    catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};
export default db;
