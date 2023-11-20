const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewares');

const DiariyController = require('../controllers/diaries.controllers');
const diaryController = new DiariyController();

const Upload = require('../middlewares/diaryImageUploadMiddleware');
const upload = new Upload();

router.get('/:userId', diaryController.getDiary); // 다이어리 조회
router.post(
  '/:userId',
  authMiddleware, // 나중에 다시 수정
  upload.upload.single('dirImg'), //다이어리 이미지 업로드
  diaryController.createDiary
); // 다이어리 작성
router.put(
  '/:diaryId/:userId',
  authMiddleware, //나중에 다시 수정
  upload.upload.single('dirImg'), // 다이어리 이미지 수정
  diaryController.updateDiary
); // 다이어리 내용 수정
router.delete(
  '/:diaryId/:userId',
  authMiddleware, //나중에 다시 수정
  upload.delete_file,
  diaryController.deleteDiary
); // 다이어리 삭제

module.exports = router;
