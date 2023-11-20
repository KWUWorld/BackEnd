const CommentRepository = require('../repositories/commensts.repositories');

class CommentService {
  commentService = new CommentRepository();

  findAllComment = async (userId) => {
    const allComment = await this.commentService.findAllComment(userId);
    return allComment;
  };

  createComment = async (diaryId, userId, name, comment) => {
    const createCommentData = await this.commentService.createComment(
      diaryId,
      userId,
      name,
      comment
    );
    return {
      diaryId: createCommentData.diaryId,
      userId: createCommentData.userId,
      name: createCommentData.name,
      comment: createCommentData.comment,
    };
  };

  updateComment = async (commentId, comment) => {
    const updateCommentData = await this.commentService.updateComment(
      commentId,
      comment
    );
    return updateCommentData;
  };

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await this.commentService.deleteComment(
      commentId,
      userId
    );
    return deleteCommentData;
  };

  findByComment = async (commentId)=>{
    return await this.commentService.findByComment(commentId)
  }
}

module.exports = CommentService;
