const bcrypt = require('bcrypt');

// by default seeder file not track of excecuted files
// so we need to add seederStorage: 'sequelize' in config.json file
// to track the executed files

module.exports = {
  up: (queryInterface, Sequelize) => {
    const password = process.env.ADMIN_PASSWORD;
    const hashedPassword = bcrypt.hashSync(password, 10);
    return queryInterface.bulkInsert('User', [
      {
        userType: '0',
        firstName: 'John',
        lastName: 'Doe',
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('User', { userType: '0' }, {});
  },
};

