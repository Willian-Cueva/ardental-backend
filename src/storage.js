const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/client/build/storage/imgs");
  },
  filename: function (req, file, cb) {
    try {
      const day = new Date();
      let name = `${day.getDate()}-${day.getMonth()}-${
        file.originalname
      }`.replaceAll(" ", "%");
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
