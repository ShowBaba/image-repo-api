const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { secretKey } = require("../config/vars");

const { User } = require("../db/models");

const { tokenBlacklist } = require("../db/models");

dotenv.config();

module.exports = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      error: "You are not authorized to access this resource",
    });
  }
  const token = req.headers.authorization.split(" ")[1];
  // check if a token is in the black list db
  try {
    const result = await tokenBlacklist.findOne({
      where: { token },
    });
    // return result;
    if (result !== null) {
      return res.status(401).json({
        error: "User already logged out of session",
      });
    }
    jwt.verify(
      token,
      secretKey,
      { expiresIn: 3600 },
      (err, decoded) => {
        if (err) {
          return res.status(401).send({
            error: err,
          });
        }
        req.decoded = decoded;
        User.findByPk(decoded.id).then((user) => {
          if (!user) {
            return res.status(401).json({
              error: "User does not exist",
            });
          }
          next();
        });
      }
    );
  } catch (error) {
    next(error);
  }
};
