const { verify } = require("../middlewares/jwt");
const controller = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [verify.checkDuplicateUsernameOrEmail],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.get("/api/auth/allusers", controller.allusers);
  app.get("/api/auth/checkauth", [auth.verifyToken], controller.checkauth);
  
};
