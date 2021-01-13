const cloudinary = require("cloudinary");
const {
  cloudinaryApiSecret,
  cloudinaryApiKey,
  cloudinaryCloudName,
} = require("../config/vars");

cloudinary.config({
  cloud_name: cloudinaryCloudName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

// TODO: modify image before storing
exports.uploads = (file, folder) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file,
      (result) => {
        resolve({
          imageUrl: result.url,
          imageId: result.public_id,
        });
      },
      {
        resource_type: "auto",
        folder: folder,
      }
    );
  });
};
