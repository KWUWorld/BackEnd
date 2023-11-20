const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddlewares');

const CommentController = require('../controllers/commensts.controllers');
const commentController = new CommentController();

router.get('/:userId', commentController.getComment);
router.post('/:diaryId/:userId',authMiddleware,commentController.createComment);
router.put('/:diaryId/:commentId',authMiddleware,commentController.updataComment);
router.delete('/:diaryId/:commentId',authMiddleware,commentController.deleteComment);

module.exports = router;
