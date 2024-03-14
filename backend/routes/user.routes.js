const express = require("express");
const { userRegister, logoutUser, userLogin,getData } = require("../controller/user.controller");
const router = express();

router.route("/user/register").post(userRegister);

router.route("/user/login").post(userLogin);

router.route("/user/logout").get(logoutUser);

router.route("/user/getdata").get(getData)

module.exports = router;
