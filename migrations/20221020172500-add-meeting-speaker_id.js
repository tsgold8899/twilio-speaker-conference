module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn('Meeting', 'speaker_id', {
          type: Sequelize.INTEGER,
          references: { model: 'User', key: 'id' }
        }, { transaction: t }),
      ]);
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Meeting', 'speaker_id', { transaction: t }),
      ]);
    });
  }
};