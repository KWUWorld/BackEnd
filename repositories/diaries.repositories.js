const { Diaries } = require('../models');

class DiaryRepository {
  findAllDiary = async (userId) => {
    // 다양한 유저들이 존재해서 해당 유저가 작성한 게시글이 필요함
    return await Diaries.findAll({ where: { userId } });
  };

  createDiary = async (userId, name, dirImg, content) => {
    return await Diaries.create({
      userId,
      name,
      dirImg,
      content,
    });
  };

  updateDiary = async (diaryId, dirImg, content) => {
    await Diaries.update({ content, dirImg }, { where: { diaryId } });

    return await Diaries.findOne({ where: { diaryId } });
  };

  deleteDiary = async (diaryId) => {
    const deleteDiaryImg = await Diaries.findOne({ where: { diaryId } });

    const deleteDiaryData = await Diaries.destroy({ where: { diaryId } });
    return deleteDiaryData;
  };
}

module.exports = DiaryRepository;
