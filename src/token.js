function ensureToken(req, res, next) {
  try {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
      req.token = bearerToken;
      next();
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.json({ status: "ocurrio un error - ensureToken" });
  }
}

module.exports = ensureToken;
