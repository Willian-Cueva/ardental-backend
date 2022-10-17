const express = require("express");
const { login, register, getAllUsers, tooglePermitions, resquePassword, changePassword, getUser, putUser, changePass } = require("../controllers/users.controller");
const router = express.Router()

router.put("/update-user",putUser);
router.get("/get-user/:email",getUser);

router.put("/change-pass",changePass);

router.put("/change-password",changePassword)

router.post("/resque-password",resquePassword)

router.post("/toggle-permition",tooglePermitions);

router.get("/all-users",getAllUsers);

router.post("/login",login);

router.post("/register",register);

module.exports = router;