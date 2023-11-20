const DiaryRepository = require('../repositories/diaries.repositories');
require('dotenv').config();

class DiaryService {
  diaryService = new DiaryRepository();

  findAllDiary = async (userId) => {
    // 저장소에서 데이터요청
    const allDiary = await this.diaryService.findAllDiary(userId);

    for (let i = 0; i < allDiary.length; i++) {
      allDiary[i].dataValues.diaryNo = i + 1;
    }

    // 호출한 Diary들 중 가장 최근 게시글순으로 정렬
    return allDiary.sort((a, b) => {
      return b.dataValues.diaryNo - a.dataValues.diaryNo;
    });

    // 사용자에게 보여줄 데이터를 가공
    // return allDiary.map((diary) => {
    //   return {
    //     diaryId: diary.diaryId,
    //     userId: diary.userId,
    //     dirImg: diary.dirImg,
    //     content: diary.content,
    //     diaryNo: diary.diaryNo,
    //     createdAt: diary.createdAt,
    //     updatedAt: diary.updatedAt,
    //   };
    // });
  };

  createDiary = async (userId, name, dirImg, content) => {
    return await this.diaryService.createDiary(userId, name, dirImg, content);
  };

  updateDiary = async (diaryId, dirImg, content) => {
    const updateDiaryData = await this.diaryService.updateDiary(
      diaryId,
      // userId,
      dirImg,
      content
    );

    return {
      diaryId: updateDiaryData.diaryId,
      userId: updateDiaryData.userId,
      name: updateDiaryData.name,
      dirImg: updateDiaryData.dirImg,
      content: updateDiaryData.content,
      diaryNo: updateDiaryData.diaryNo,
      createdAt: updateDiaryData.createdAt,
    };
  };

  deleteDiary = async (diaryId, userId) => {
    const deleteDiaryData = await this.diaryService.deleteDiary(diaryId);
    return deleteDiaryData;
  };
}

module.exports = DiaryService;
