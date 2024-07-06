const cloudinary = require("cloudinary");
const CLOUDKEY = process.env.CLOUDKEY;

cloudinary.v2.config({
  cloud_name: "dxndplrix",
  api_key: "635338432495951",
  api_secret: CLOUDKEY,
  secure: true,
});

module.exports = cloudinary.v2;
