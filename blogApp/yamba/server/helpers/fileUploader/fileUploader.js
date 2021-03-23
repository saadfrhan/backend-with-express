const cloudinary = require('cloudinary')

cloudinary.config({
  cloud_name: 'dcoxab16n',
  api_key: '387991751498562',
  api_secret: 'l4Zaof1baMaTUYsir6WrliyZqp0'
});

module.exports.uploadImageToCloudinary = (imageToUpload) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload('data:image/png;base64,' + imageToUpload, {
      resource_type: "image", public_id: "imageDemo",
    }, function (error, result) {
      if (error) {
        console.log(error);
        reject(error)
      } else {
        console.log("Image added successfully! ", result)
        resolve(result)
      }
    });
  })
}




















