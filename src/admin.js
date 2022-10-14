const User = require("./models/users");
const jwt = require("jsonwebtoken");

async function adminAccess(req, res, next) {
  try {
    jwt.verify(req.token, "secretkey", (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const { email, rol } = data.user;
        // const user = await User.findOne({email});
        User.findOne({ email }, function (err, user) {
          if (!err) {
            if (user.rol === rol && rol === "admin") {
              next();
            } else {
              // res.json({ status: "Rol no válido" });
              res.sendStatus(403);
            }
          } else {
            res.json({ status: "No existe tal ususario" });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.json({ status: "hubo un error" });
  }
}

module.exports = adminAccess;
