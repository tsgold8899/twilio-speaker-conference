module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`CREATE FUNCTION random_string(VARCHAR, INTEGER) RETURNS VARCHAR as $$
        SELECT CONCAT($1, STRING_AGG(SUBSTR('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', FLOOR(RANDOM()*62)::INTEGER, 1), ''))
        FROM generate_series(1, $2);
      $$ language sql;`);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`
        DROP FUNCTION random_string;
    `);
  }
};