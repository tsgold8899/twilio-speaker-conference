module.exports = (sequelize, DataTypes) => {
  const Meeting = sequelize.define('Meeting', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: sequelize.fn('random_string', 'mt_', 12),
    },
    // start_at: DataTypes.DATE,
    title: DataTypes.STRING,
    developer: DataTypes.STRING,
    client: DataTypes.STRING,
    project: DataTypes.STRING,
    description: DataTypes.STRING,
    start_time: DataTypes.STRING,
    twilio_sid: DataTypes.STRING,
    twilio_room_name: DataTypes.STRING,
  }, {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
  });
  return Meeting;
};
