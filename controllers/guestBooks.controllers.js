const GuestBooksService = require('../services/guestBooks.services');

class GuestBooksController {
  guestBooksService = new GuestBooksService();

  // 방명록 작성
  createBook = async (req, res, next) => {
    console.log(req.body?.bookImage);
    try {
      await this.guestBooksService.createBook(req, res);
      res.status(200).send({ msg: '방명록이 작성되었습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };

  // 방명록 목록 조회
  getBooks = async (req, res, next) => {
    try {
      const result = await this.guestBooksService.getBooks(req, res);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };

  // 방명록 수정
  // updateBook = async (req, res, next) => {
  //   try {
  //     await this.guestBooksService.updateBook(req, res);
  //     res.status(200).send({ msg: '방명록이 수정되었습니다.' });
  //   } catch (error) {
  //     res.status(error.status || 400).send({ ok: false, msg: error.message });
  //   }
  // };

  // 방명록 삭제
  deleteBook = async (req, res, next) => {
    try {
      await this.guestBooksService.deleteBook(req, res);
      res.status(200).send({ msg: '방명록이 삭제되었습니다.' });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };
}

module.exports = GuestBooksController;
