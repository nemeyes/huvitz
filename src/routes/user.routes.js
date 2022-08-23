module.exports = (app) => {
    const user = require("../controllers/user.controller.js");
    const upload = require("../middleware/upload");
    const fs = require("fs");
    const fsPromise = require("fs").promises;
  
    var router = require("express").Router();

    router.post("/", user.createUser);
    router.get("/", user.getUsers);
    router.get("/:id", user.getUserById);
    router.delete("/:id", user.deleteUserById);
  
    router.post("/upload", upload, async (req, res) => {
      try {
        const imgData = fs
          .readFileSync(`app${req.file.path.split("app")[1]}`)
          .toString("base64");
  
        res.json({
          success: true,
          path: imgData,
        });
      } catch (err) {
        res.status(400).json({ success: false, message: err.message });
      } finally {
        await fsPromise.unlink(`app${req.file.path.split("app")[1]}`);
      }
    });
  
    app.use("/api/v1/users", router);
  };