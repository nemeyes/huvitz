module.exports = (sequelize, Sequelize) => {
  const UserImage = sequelize.define(
    "UserImage",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      data: {
        allowNull: false,
        type: Sequelize.BLOB("long"),
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      charset: "utf8",
      collate: "utf8_general_ci",
    }
  );

  return UserImage;
};