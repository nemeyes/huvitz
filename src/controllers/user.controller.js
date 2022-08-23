const moment = require("moment");
const db = require("../models");
const User = db.users;
const UserImage = db.userImages;

const Op = db.Sequelize.Op;

exports.createUser = (req, res) => {
  return User.create({
    userId: req.body.id,
    userName: req.body.name,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.send(users);
  } catch (e) {
    res.status(500).json({ message: e.toString() });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).send({ message: "id가 없습니다" });

  try {
    const user = await User.findAll({
      where: {
        user_id: id
      }
    });
    if (!user)
      res.send({ message: "사용자가 없습니다" });
    res.send(user);
  } catch (e) {
    console.log(e);
    res.status(500).send(e.toString());
  }
};

exports.deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { user_id: id },
    });
    const result = await User.destroy({
      where: {
        user_id: id,
      },
    });

    if (result) {
      res.send({ message: "success" });
    } else {
      res
        .status(200)
        .send({ message: "삭제할 사용자 페이지가 없습니다." });
    }
  } catch (e) {
    res.status(500).send(e.toString());
  }
};
