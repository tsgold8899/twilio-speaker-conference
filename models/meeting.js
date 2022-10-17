module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: sequelize.fn('random_string', 'mt_', 12),
    },
    start_at: DataTypes.DATE,
    twilio_sid: DataTypes.STRING,
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  });
  return Meeting;
};
