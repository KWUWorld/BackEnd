const express = require('express');
const router = express.Router();
const GuestBooksController = require('../controllers/guestBooks.controllers');
const guestBooksController = new GuestBooksController();
const auth = require('../middlewares/authMiddlewares');

router
  .route('/:guestbookId/:userId')
  /**
   * PUT : 해당 미니홈피의 방명록 수정,
   * DELETE : 해당 미니홈피의 방명록 삭제
   */
  // .put(auth, guestBooksController.updateBook)
  .delete(auth, guestBooksController.deleteBook);

router
  .route('/:userId')
  /**
   * POST : 해당 미니홈피의 방명록 작성,
   * GET : 해당 미니홈피의 방명록 조회
   */
  .post(auth, guestBooksController.createBook)
  .get(guestBooksController.getBooks);

module.exports = router;
