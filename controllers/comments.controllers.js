const CommentService = require('../services/commensts.services');

class CommentController {
  commentController = new CommentService();

  getComment = async (req, res) => {
    const { userId } = req.params;
    const comments = await this.commentController.findAllComment(userId);
    res.status(200).json({ data: comments });
  };

  createComment = async (req, res) => {
    const { diaryId, userId } = req.params;
    const { name } = res.locals.user;
    const { comment } = req.body;

    const createCommentData = await this.commentController.createComment(
      diaryId,
      userId,
      name,
      comment
    );
    res.status(200).json({ data: createCommentData });
  };

  updataComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    const { comment } = req.body;
    try {
      const isWriter = await this.commentController.findByComment(commentId);

      if (userId !== isWriter.userId) {
        throw new Error('수정 권한이 없습니다.');
      }
      const updateCommentData = await this.commentController.updateComment(
        commentId,
        comment
      );
      res.status(200).json({ data: updateCommentData });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

  deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const { userId } = res.locals.user;
    try {
      const isWriter = await this.commentController.findByComment(commentId);

      if (userId !== isWriter.userId) {
        throw new Error('삭제 권한이 없습니다.');
      }
      const deleteCommentData = await this.commentController.deleteComment(
        commentId,
        userId
      );
      res.status(200).json({msg:"삭제되었습니다." ,data: deleteCommentData });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
}

module.exports = CommentController;
