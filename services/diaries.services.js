const DiaryRepository = require('../repositories/diaries.repositories');
const multer = require('multer');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3'); // multer-s3이 아닌 multer-s3-transform을 임포트
require('dotenv').config();
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

class DiaryService {
  diaryService = new DiaryRepository();
  upload = multer({
    storage: multerS3({
      s3: s3,
      
      //bucket: 'wepet-bucket', //버켓 이름
      bucket: process.env.S3_STORAGE_BUCKET,
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

  findAllDiary = async (userId) => {
    // 저장소에서 데이터요청
    const allDiary = await this.diaryService.findAllDiary(userId);

    for (let i = 0; i < allDiary.length; i++) {
      allDiary[i].dataValues.diaryNo = i + 1;
    }

    // 호출한 Diary들 중 가장 최근 게시글순으로 정렬
    return allDiary.sort((a, b) => {
      return b.dataValues.diaryNo - a.dataValues.diaryNo;
    });

    // 사용자에게 보여줄 데이터를 가공
    // return allDiary.map((diary) => {
    //   return {
    //     diaryId: diary.diaryId,
    //     userId: diary.userId,
    //     dirImg: diary.dirImg,
    //     content: diary.content,
    //     diaryNo: diary.diaryNo,
    //     createdAt: diary.createdAt,
    //     updatedAt: diary.updatedAt,
    //   };
    // });
  };

  createDiary = async (userId, name, dirImg, content) => {
    return await this.diaryService.createDiary(userId, name, dirImg, content);
  };

  updateDiary = async (diaryId, dirImg, content) => {
    console.log(dirImg,"22222222222");
    const updateDiaryData = await this.diaryService.updateDiary(
      diaryId,
      // userId,
      dirImg,
      content
    );

    return {
      diaryId: updateDiaryData.diaryId,
      userId: updateDiaryData.userId,
      name: updateDiaryData.name,
      dirImg: updateDiaryData.dirImg,
      content: updateDiaryData.content,
      diaryNo: updateDiaryData.diaryNo,
      createdAt: updateDiaryData.createdAt,
    };
  };

  
  deleteDiary = async (diaryId) => {
    const deleteDiaryData = await this.diaryService.deleteDiary(diaryId);
    return deleteDiaryData;
  };
}

module.exports = DiaryService;
