const { Guestbooks, Users } = require('../models');

class GuestBooksRepository {
  constructor() {
    this.Guestbooks = Guestbooks;
    this.Users = Users;
  }

  createBook = async (book) => {
    await this.Guestbooks.create(book);
  };

  // 방명록 조회시 guestbookId 기준 내림차순으로 조회
  getBooks = async (userId) => {
    return await this.Guestbooks.findAll({
      where: { userId },
      // order: [['guestbookId', 'desc']],
    });
  };

  findByGuestBook = async (guestbookId) => {
    return await this.Guestbooks.findByPk(guestbookId);
  };

  // updateBook = async (guestbook, guestbookId) => {
  //   await this.Guestbooks.update(
  //     { guestBook: guestbook },
  //     { where: { guestbookId } }
  //   );
  // };

  deleteBook = async (guestbookId) => {
    await this.Guestbooks.destroy({
      where: { guestbookId },
    });
  };

  findByUser = async (userId) => {
    return this.Users.findByPk(userId);
  };
}

module.exports = GuestBooksRepository;
