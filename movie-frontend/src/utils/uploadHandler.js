const cloudinaryUpload = require('./cloudinaryUpload');
const firebaseUpload = require('./firebaseUpload');

async function uploadAvatar(filePath, platform = 'cloudinary') {
  if (platform === 'firebase') {
    return await firebaseUpload(filePath);
  }
  return await cloudinaryUpload(filePath); // default
}

module.exports = uploadAvatar;
