module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Meeting', 'developer', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('Meeting', 'client', {
          type: Sequelize.STRING,
        }, { transaction: t }),
        queryInterface.addColumn('Meeting', 'project', {
          type: Sequelize.STRING,
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Meeting', 'developer', { transaction: t }),
        queryInterface.removeColumn('Meeting', 'client', { transaction: t }),
        queryInterface.removeColumn('Meeting', 'project', { transaction: t }),
      ]);
    });
  }
};