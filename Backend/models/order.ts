import { DataTypes } from 'sequelize';

import { sequelize } from '../config/config.js'

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    customerName: {
        type: DataTypes.STRING,
        allowNull: false
    }, productName: {
        type: DataTypes.STRING,  // Define the field type as string
        allowNull: false,        // This field cannot be null
    },
    quantity: {
        type: DataTypes.INTEGER, // Define the field type as integer
        allowNull: false,        // This field cannot be null
    },
    totalPrice: {
        type: DataTypes.FLOAT,   // Define the field type as float (for price)
        allowNull: false,        // This field cannot be null
    },
    orderDate: {
        type: DataTypes.DATE,    // Define the field type as date
        defaultValue: DataTypes.NOW, // Default value as the current timestamp
    }
})

// Order.sync({ force: true })
//     .then(() => {
//         console.log('Order table has been created');
//     })
//     .catch((err: any) => {
//         console.error('Error creating Order table:', err);
//     });

export default Order;