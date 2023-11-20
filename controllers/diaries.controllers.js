const DiaryService = require('../services/diaries.services');

class DiaryController {
  diaryController = new DiaryService();

  getDiary = async (req, res) => {
    const { userId } = req.params;
    const diaries = await this.diaryController.findAllDiary(userId);

    res.status(200).json({ data: diaries });
  };

  createDiary = async (req, res) => {
    const { userId } = req.params;
    const { content } = req.body;
    const { name } = res.locals.user;
    const userInfo = res.locals.user;

    try {
      if (!content) {
        res.status(400).json({ message: '내용을 입력해주세요!' });
      }
      // 본인 이외의 사람이 다이어리 작성시 예외처리
      if (userInfo.userId !== Number(userId)) {
        throw new Error('작성 권한이 없습니다.');
      }
      // 파일이 있으면 key값으로 이름을 정하고 없으면 null
      const imageFileName = req.file ? req.file.key : null;
      // imageFileName에 파일명이 들어 갔으면 s3 url주소 추가
      const dirImg = imageFileName
        ? process.env.S3_STORAGE_URL + imageFileName
        : null;

      await this.diaryController.createDiary(userId, name, dirImg, content);
      res.status(200).json({ msg: '다이어리 작성완료!' });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

  updateDiary = async (req, res) => {
    const { diaryId, userId } = req.params;
    const { content } = req.body;
    const userInfo = res.locals.user;

    // 수정사항에 이미지 파일이 있으면 key값으로 이름 정해주고 없으면 Null
    const imageFileName = req.file ? req.file.key : null;
    // imageFileName에 파일명 들어가면 s3 url주소 추가
    const dirImg = imageFileName
      ? process.env.S3_STORAGE_URL + imageFileName
      : undefined;
    try {
      // 본인 이외의 사람이 다이어리 수정시 예외처리
      if (userInfo.userId !== Number(userId)) {
        throw new Error('수정 권한이 없습니다.');
      }

      const updateDiaryData = await this.diaryController.updateDiary(
        diaryId,
        // userId,
        dirImg,
        content
      );
      res.status(200).json({ data: updateDiaryData });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };

  deleteDiary = async (req, res) => {
    const { diaryId } = req.params;
    const { userId } = req.params;
    const userInfo = res.locals.user;

    try {
      // 본인 이외의 사람이 다이어리 삭제시 예외처리
      if (userInfo.userId !== Number(userId)) {
        throw new Error('삭제 권한이 없습니다.');
      }
      const deleteDiaryData = await this.diaryController.deleteDiary(diaryId);
      res.status(200).json({ msg: '삭제되었습니다!' });
    } catch (err) {
      res.status(400).json({ err: err.message });
    }
  };
}

module.exports = DiaryController;
