const AccountModel = require("./models/account");
const UserModel = require("./models/user")
const jwt = require("jsonwebtoken");

function adminAccess(req, res, next) {
  try {
    jwt.verify(req.token, "secretkey",async (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { email } = data.user;
        const account = await AccountModel.findOne({email});
        UserModel.findById(account.user, function (err, user) {
          if (!err) {
            const {rol} = user;
            if (rol === "super-administrer") {
              next();
            } else {
              // res.json({ status: "Rol no válido" });
              return res.json({status: "El usuario no tiene los permisos para realizar esta acción"})
            }
          } else {
            return res.json({ status: "No existe tal ususario" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    return res.json({ status: "hubo un error" });
  }
}

module.exports = adminAccess;
