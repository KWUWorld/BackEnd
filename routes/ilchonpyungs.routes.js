const express = require('express');
const router = express.Router();
const IlchonpyungsController = require('../controllers/ilchonpyungs.controllers');
const ilchonpyungsController = new IlchonpyungsController();
const auth = require('../middlewares/authMiddlewares');

router
  .route('/:ilchonpyungId/:userId')
  /**
   * DELETE : 해당 미니홈피의 일촌평 삭제
   */
  .delete(auth, ilchonpyungsController.deleteBest);

router
  .route('/:userId')
  /**
   * POST : 해당 미니홈피의 일촌평 작성,
   * GET : 해당 미니홈피의 일촌평 목록 조회
   */
  .post(auth, ilchonpyungsController.createBest)
  .get(ilchonpyungsController.getBests);

module.exports = router;
