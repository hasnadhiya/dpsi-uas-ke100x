const sequelize = require('../config/database');
const User = require('../models/user');

// Sinkronisasi database
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });