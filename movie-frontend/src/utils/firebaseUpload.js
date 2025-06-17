const { getStorage } = require('firebase-admin/storage');
const admin = require('firebase-admin');
const path = require('path');
const fs = require('fs');

const serviceAccount = require('../config/firebaseServiceKey.json'); // your key

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_BUCKET, // e.g. 'your-app.appspot.com'
  });
}

const bucket = getStorage().bucket();

async function firebaseUpload(filePath) {
  const filename = path.basename(filePath);
  const uploadFile = await bucket.upload(filePath, {
    destination: `avatars/${filename}`,
    metadata: {
      contentType: 'image/jpeg',
      cacheControl: 'public,max-age=31536000',
    },
  });

  await uploadFile[0].makePublic();
  return uploadFile[0].publicUrl();
}

module.exports = firebaseUpload;
