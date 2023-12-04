const multer = require('multer');
const multerS3 = require('multer-s3'); // multer-s3이 아닌 multer-s3-transform을 임포트
const s3 = require('../config/s3');
const { Diaries } = require('../models');

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
    const { diaryId } = req.params;
    const imgName = await Diaries.findOne({ where: { diaryId } });

    if(!imgName){
      return new Error('이미 삭제된 게시글입니다.');
      
    }
    else if(!imgName.dirImg){
      return next();
    }
    
    const s3ImgName = imgName.dirImg.replace(process.env.S3_STORAGE_URL,"");

    let params = {
      //Bucket: 'wepet-bucket', //버켓 이름
      Bucket: process.env.S3_STORAGE_BUCKET,
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
