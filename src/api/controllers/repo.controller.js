const models = require("../../db/models");

const { Image } = models;

exports.findByName = async (req, res, next) => {
  try {
    const images = await Image.findAll({
      where: {
        imageName: req.query.name,
      },
    });
    const publicImages = images.filter(
      (image) => (image.permission = "public")
    );
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({
      success: true,
      publicImages,
    });
  } catch (error) {
    next(error);
  }
};
