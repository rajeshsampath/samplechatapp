const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

AWS.config.update({
  accessKeyId: 'AKIAJUYQ4N342VXVT6FQ',
  secretAccessKey: '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',
  region: 'ap-south-1'
});

const s0 = new AWS.S3({});
const upload = multer({
  storage: multerS3({
    s3: s0,
    bucket: 'chatappi',
    acl: 'public-read',
    metadata: function(req, file, cb){
      cb(null, {fieldName: file.fieldName});
    },
    key: function(req, file, cb){
      cb(null, file.originalname);
    },
    rename: function(fieldName, fileName){
      return fileName.replace(/\W+/g,'-');
    }
  })
});

exports.Upload = upload;
