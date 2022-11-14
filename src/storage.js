const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/client/build/storage/imgs");
  },
  filename: function (req, file, cb) {
    // console.log(file, req, req.body);
    try {
      console.log("hola si entramos aki xd");
      const day = new Date();
      let name = `${day.getDate()}-${day.getMonth()}-${
        file.originalname
      }`.replaceAll(" ", "%");
      console.log("file name ->",file.name);
      req.body.nameImage = file.name;
      cb(null, name);
    } catch (error) {
      console.log("error storage");
      console.log(error);
    }
  },
});

const upload = multer({ storage });

module.exports = upload;
