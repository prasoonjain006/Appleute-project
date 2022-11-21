const jwt = require("jsonwebtoken");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }
  const jwtData = jwt.verify(token, process.env.SECRET); 
  console.log("6", token);

  

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};

const auth = {
  verifyToken,
};
module.exports = auth;
