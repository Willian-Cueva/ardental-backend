const { dniValidate } = require("../helpers/validations");
const UserModel = require("../models/user");
const AccountModel = require("../models/account");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const transporter = require("../mailer");
const { URL_RESQUE_PASSWORD } = require("../helpers/constants");
const userCtrl = {};

userCtrl.changePass = async (req,res)=>{
  try {
    const {email,howPass,newPass,repPass} = req.body
    const account = await AccountModel.findOne({email})
    if(newPass!==repPass)return res.json({status: "Las contraseñas no coinciden"})
    if (account) {
      const permit = await bcrypt.compare(howPass, account.password);
      if (permit) {
        account.password = newPass;
        await account.save()
        return res.json({status: "ok"});
      } else {
        return res.json({status: "Ingrese correctamente su contraseña actual"})
        
      }
    } else {
      return res.json({status: "No se encontró el ususario"})
    } 
  } catch (error) {
    console.log(error);
    return res.json({status: "No se pudo cambiar la contraseña"})
  }
}

userCtrl.putUser = async (req, res) => {
  try {
    const {
      name,
      lastname,
      dni,
      dateBorn,
      phone,
    } = req.body;
    const user = await UserModel.findOne({dni});
    user.name=name;
    user.lastname=lastname;
    user.dateBorn=dateBorn;
    user.phone = phone;


   
    await user.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ocurrió un error en el backend al actualizar el la forma de pago del paciente",
    });
  }
};

userCtrl.getUser = async (req, res) => {
  try {
    const { email } = req.params;
    const account = await AccountModel.findOne({ email });
    const user = await UserModel.findById(account.user);
    console.log(user);
    return res.json({ status: "ok", data: user,account });
  } catch (error) {
    console.log(error);
    return res.json({
      status:
        "Ha ocurrido un error al traer la información de las formas de pago del paciente",
    });
  }
};

userCtrl.changePassword = async (req, res) => {
  try {
    const { email, password, repeatPassword } = req.body;
    const account = await AccountModel.findOne({ email });
    if (password !== repeatPassword)
      return res.json({ status: "Las contraseñas no coinciden" });
    if (account) {
      const user = await UserModel.findById(account.user);
      if (user) {
        if (user.changePassword) {
          account.password = password;
          user.changePassword = false;
          await user.save();
          await account.save();
          return res.json({ status: "ok" });
        } else {
          return res.json({ status: "No se ha válidado el correo" });
        }
      } else {
        return res.json({ status: "No existe tal usuario" });
      }
    } else {
      return res.json({ status: "No existe tal cuenta" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ status: "No se pudo cambiar la contraseña" });
  }
};

userCtrl.resquePassword = async (req, res) => {
  try {
    const { email } = req.body;
    const account = await AccountModel.findOne({ email });
    if (!account)
      return res.json({
        status: "Este correo no está resgistrado en el sistema",
      });
    const user = await UserModel.findById(account.user);
    if (user) {
      user.changePassword = true;
      await user.save();
    } else {
      return res.json({ status: "No existe tal usuario" });
    }
    await transporter.sendMail({
      from: '"Ardental 🦷" <ardental@gmail.com>', // sender address
      // from: '"Ardental 🦷"', // sender address
      to: email, // list of receivers
      subject: "Reestablecer Contraseña", // Subject line
      text: "Hola, da click al siguiente enlace para restablecer tu contraseña", // plain text body
      html: `<div
     style="
       background-color: #5e35b1;
       width: 100%;
       padding: 2rem;
     "
   >
     <div
       style="
         font-size: 50px;
         font-family: Roboto, sans-serif;
         font-weight: bold;
         color: rgba(255, 255, 255, 0.952);
       "
     >
       Aderntal 🦷
     </div>
     <div
       style="
         font-size: 25px;
         font-family: Roboto, sans-serif;
         font-weight: bold;
         color: #e0e0e0;
       "
     >
       ¿Olvidaste tu contraseña?
     </div>
     <a style="text-decoration: none;
     font-size: 20px;
     font-family: Roboto, sans-serif;
     font-weight: bold;
     color: #212121;
     padding: 0.5rem;
     background-color: #90caf9;
     border-radius: 12px;
     margin-top: 1rem;
     transition: 0.3s ease-in-out;" href=${URL_RESQUE_PASSWORD}${email}
       >No te preocupes da click en este botón para reestablecerla</a
     >
   </div>`, // html body
    });
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({ status: "Hubo un error al enviar el correo" });
  }
};

userCtrl.tooglePermitions = async (req, res) => {
  try {
    const { dni } = req.body;
    const user = await UserModel.findOne({ dni });
    user.rol = user.rol === "admin" ? "not-authorized" : "admin";
    await user.save();
    return res.json({ status: "ok" });
  } catch (error) {
    console.log(error);
    return res.json({
      status: "No se pudo cambiar el estado del usuario",
    });
  }
};

userCtrl.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find().lean();
    const data = users.filter((usr) => usr.rol !== "super-administrer");
    return res.json({ status: "ok", data });
  } catch (error) {
    console.log(error);
    return res.json({ status: "No se pudieron obtener los usuarios" });
  }
};

userCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const accountDB = await AccountModel.findOne({ email });
    const permit = await bcrypt.compare(password, accountDB.password);
    if (permit) {
      const userDB = await UserModel.findById(accountDB.user);
      let user = {
        fullname: `${userDB.name} ${userDB.lastname}`,
        rol: userDB.rol,
        email: accountDB.email,
      };

      jwt.sign({ user }, "secretkey", { expiresIn: "1d" }, (err, token) => {
        if (err !== null) {
          return res.json({
            status: "Hubo un error al asignar el token",
          });
        } else {
          user = { ...user, token };
          return res.json({ status: "ok", data: user });
        }
      });
    } else {
      return res.json({ status: "Credenciales no válidas" });
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
    if (password !== repeatPassword)
      return res.json({ status: "Las contraseñas no coinciden" });
    if (name.length > 0) {
      if (lastname.length > 0) {
        if (dni.length > 0) {
          if (dateBorn.length > 0) {
            if (phone.length > 0) {
              if (email.length > 0) {
                if (password.length > 0) {
                  if (repeatPassword.length > 0) {
                    if (dniValidate(dni)) {
                      const existUser = await UserModel.findOne({ dni });
                      const existUserEmail = await AccountModel.findOne({
                        email,
                      });
                      if (!existUser && !existUserEmail) {
                        const user = new UserModel({
                          name,
                          lastname,
                          dni,
                          dateBorn,
                          phone,
                        });
                        let user_id = -1;
                        await user.save().then((pt) => {
                          user_id = String(pt._id);
                        });
                        const account = new AccountModel({
                          user: user_id,
                          email,
                          password,
                        });
                        await account.save();
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
        response.status = "Este usuario ya está registrado";
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
