const { Comments } = require('../models');

class CommentRepository {
  findAllComment = async (userId) => {
    const comments = Comments.findAll(
      { where: { userId } },
      { order: [['createdAt', 'DESC']] }
    );
    return comments;
  };

  createComment = async (diaryId, userId, name, comment) => {
    const createCommentData = await Comments.create({
      diaryId,
      userId,
      name,
      comment,
    });
    return createCommentData;
  };

  updateComment = async (commentId, comment) => {
    const updateCommentData = await Comments.update(
      { comment },
      { where: { commentId } }
    );

    return await Comments.findOne({ where: { commentId } });
  };

  deleteComment = async (commentId, userId) => {
    const deleteCommentData = await Comments.destroy({
      where: { commentId, userId },
    });
    return deleteCommentData;
  };

  findByComment = async (commentId) => {
    return await Comments.findByPk(commentId);
  };
}
module.exports = CommentRepository;
