const models = require("../../db/models");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");

const { User, Image } = models;

exports.createImage = async (req, res, next) => {
  try {
    const uploader = async (path) => await cloudinary.uploads(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path, filename } = file;
      const newPath = await uploader(path);
      newPath.imageName = filename.split(".").slice(0, -1).join("."); // remove extension
      newPath.permission = req.body.permission;
      urls.push(newPath);
      fs.unlinkSync(path);
    }
    const { id } = req.decoded;
    const user = await User.findByPk(req.params.id);
    if (!user) {
      res.status(400).json({
        error: "Resource not found",
      });
    } else if (id === user.id) {
      urls.forEach((obj) => (obj.userId = id));
      const bulkImage = await Image.bulkCreate(urls);
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        Image: bulkImage,
      });
    } else {
      res.status(401).json({
        error: "You are not authorized to access this resource",
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getUserImages = async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const images = await Image.findAll({
      where: {
        userId: id,
      },
    });
    if (!images) {
      res.status(400).json({
        error: "Resource not found",
      });
    }
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      images,
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteOneImage = async (req, res, next) => {
  const { id } = req.decoded;
  try {
    const image = await Image.findByPk(req.params.id);
    if (!image) {
      res.statusCode = 400;
      res.end("Resource not found");
    } else if (id === image.userId) {
      const response = await Image.destroy({
        where: {
          id: req.params.id,
        },
      });
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json({
        message: "Entry Deleted",
        response,
      });
    } else {
      res.statusCode = 403;
      res.end("You are not authorized to perform this operation");
    }
  } catch (error) {
    next(error)
  }
}