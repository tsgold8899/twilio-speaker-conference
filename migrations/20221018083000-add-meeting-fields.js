module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Meeting', 'title', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('Meeting', 'start_time', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('Meeting', 'description', {
          type: Sequelize.STRING,
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Meeting', 'title', { transaction: t }),
        queryInterface.removeColumn('Meeting', 'start_time', { transaction: t }),
        queryInterface.removeColumn('Meeting', 'description', { transaction: t }),
      ]);
    });
  }
};