import { faker } from '@faker-js/faker';
import { sequelize } from '../config/config.js';
import Order from '../models/order.js';
const generateFakeOrders = (num) => {
    const orders = [];
    for (let i = 0; i < num; i++) {
        orders.push({
            customerName: faker.person.firstName(),
            productName: faker.commerce.productName(),
            quantity: faker.number.int({ min: 1, max: 100 }),
            totalPrice: parseFloat(faker.commerce.price()),
            orderDate: faker.date.recent()
        });
    }
    return orders;
};
const InsertBulkData = async (num) => {
    try {
        await sequelize.sync({ force: true });
        console.log('Database synced!');
        // Generate fake data
        const fakeData = generateFakeOrders(num);
        //insert bulk data into Order Table
        await Order.bulkCreate(fakeData);
        console.log(`Successfully inserted ${num} orders into the database.`);
    }
    catch (err) {
        console.error('Error syncing database:', err);
    }
};
InsertBulkData(10000);
