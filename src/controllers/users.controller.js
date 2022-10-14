const { dniValidate } = require("../helpers/validations");
const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const userCtrl = {};

userCtrl.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        const userDB = await UserModel.findOne({ email }).lean();
        if (userDB !== null) {
          let user = {
            fullname: `${userDB.name} ${userDB.lastname}`,
            rol: userDB.rol,
            email: userDB.email,
          };
    
          jwt.sign({ user }, "secretkey", { expiresIn: "1d" }, (err, token) => {
            if (err) {
              return res.json({
                  status: "Hubo un error al asignar el token",
                });
            } else {
              user = { ...user, token};
              return res.json({status: "ok",data:user});
            }
          });
        } else {
          return res.json({ status: "credenciales no válidas" });
        }
      } catch (error) {
        console.log(error);
        return res.json({ status: `Backend Error -> ${error}` });
      }
};

userCtrl.register = async (req, res) => {
  try {
    const {
      name,
      lastname,
      dni,
      dateBorn,
      phone,
      email,
      password,
      repeatPassword,
    } = req.body;
    console.log(
      name,
      lastname,
      dni,
      dateBorn,
      phone,
      email,
      password,
      repeatPassword
    );
    if (name.length > 0) {
      if (lastname.length > 0) {
        if (dni.length > 0) {
          if (dateBorn.length > 0) {
            if (phone.length > 0) {
              if (email.length > 0) {
                if (password.length > 0) {
                  if (repeatPassword.length > 0) {
                    if (dniValidate(dni)) {
                      const user = new UserModel({
                        name,
                        lastname,
                        dni,
                        dateBorn,
                        password,
                        phone,
                        email,
                      });

                      const existUser = await UserModel.findOne({ dni });
                      if (!existUser) {
                        await user.save();
                        res.json({ status: "ok" });
                      } else {
                        res.json({
                          status:
                            "Esté usuario ya se encuentra registrado en el sistema.",
                        });
                      }
                    } else {
                      return res.json({
                        status: "Revise su número de cédula que esté correcta.",
                      });
                    }
                  } else {
                    return res.json({ status: "Debe repetir su contraseña" });
                  }
                } else {
                  return res.json({ status: "Debe llenar una contraseña" });
                }
              } else {
                return res.json({ status: "Debe llenar su correo" });
              }
            } else {
              return res.json({ status: "Debe llenar su número de celular" });
            }
          } else {
            return res.json({ status: "Debe llenar su fecha de nacimiento" });
          }
        } else {
          return res.json({ status: "Debe llenar su número de cédula" });
        }
      } else {
        return res.json({ status: "Debe llenar su apellido" });
      }
    } else {
      return res.json({ status: "Debe llenar su nombre" });
    }
  } catch (error) {
    let response = { status: "Error" };
    switch (error.code) {
      case 11000:
        response.status = "Este paciente ya está registrado";
        break;

      default:
        response.status =
          "Ha ocurrido un error en el servidor al guardar el nuevo paciente";
        break;
    }
    console.log(error);

    res.json(response);
  }
};

module.exports = userCtrl;
