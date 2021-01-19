const models = require("../../db/models");

const { Image } = models;

exports.findAll = async (req, res, next) => {
  try {
    let images;
    if (Object.keys(req.query).length !== 0) {
      // search by image name
      images = await Image.findAll({
        where: {
          imageName: req.query.name,
        },
      });
    } else {
      images = await Image.findAll({});
    }
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

// exports.getImageById = asyn