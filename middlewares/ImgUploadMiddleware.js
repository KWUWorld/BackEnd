const multer = require('multer');
const multerS3 = require('multer-s3'); // multer-s3이 아닌 multer-s3-transform을 임포트
const s3 = require('../config/s3');
const { Community } = require('../models');

class S3ImageController {
  upload = multer({
    storage: multerS3({
      s3: s3,
      //bucket: 'wepet-bucket', //버켓 이름
      bucket: 'hyunjin9603-bucket',
      acl: 'public-read', //접근 권한
      contentType: multerS3.AUTO_CONTENT_TYPE,
      shouldTransform: true,
      key: function (req, file, cb) {
        console.log(file);
        let ext = file.mimetype.split('/')[1]; // 확장자
        // 이미지만 처리
        if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext))
          return cb(new Error('이미지 파일이 아닙니다.'));

        cb(null, `${Date.now()}.${ext}`);
      },
    }),
    limits: { fileSize: 10 * 1024 * 1024 }, // 10메가로 용량 제한
  });

  delete_file = async (req, res, next) => {
    const { communityId } = req.params;
    const imgName = await Community.findOne({ where: { communityId } });

    const s3ImgName = imgName.image.split('/').pop()

    let params = {
      //Bucket: 'wepet-bucket', //버켓 이름
      Bucket: 'hyujin9603-bucket',
      Key: s3ImgName,
    };

    try {
      s3.deleteObject(params, function (error, data) {
        if (error) {
          console.log('err', error, error.stack);
        } else {
          console.log(data, '정말 삭제 되었습니다.');
        }
      });
      next();
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
}

module.exports = S3ImageController;
// const multer = require('multer');
// const multerS3 = require('multer-s3'); // multer-s3이 아닌 multer-s3-transform을 임포트
// const s3 = require('../config/s3');

// class S3ImageController {
//   upload = multer({
//     storage: multerS3({
//       s3: s3,
//       bucket: 'wepet', //버켓 이름
//       acl: 'public-read', //접근 권한
//       contentType: multerS3.AUTO_CONTENT_TYPE,
//       shouldTransform: true,
//       key: function (req, file, cb) {
//         console.log(file);
//         let ext = file.mimetype.split('/')[1]; // 확장자
//         // 이미지만 처리
//         if (!['png', 'jpg', 'jpeg', 'gif'].includes(ext))
//           return cb(new Error('이미지 파일이 아닙니다.'));

//         cb(null, `post/${Date.now()}.${ext}`);
//       },
//     }),
//     limits: { fileSize: 10 * 1024 * 1024 }, // 10메가로 용량 제한
//   });
// }

// module.exports = S3ImageController;