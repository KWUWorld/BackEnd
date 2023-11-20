const { Ilchonpyungs, Users } = require('../models');

class IlchonpyungsRepository {
  constructor() {
    this.Ilchonpyungs = Ilchonpyungs;
    this.Users = Users;
  }
  createBest = async (best) => {
    await this.Ilchonpyungs.create(best);
  };

  findByWriter = async (userId, writerId) => {
    return await this.Ilchonpyungs.findOne({
      where: { userId, writerId },
    });
  };

  // 일촌평 목록 조회 시 ilchonpyungId 기준 내림차순 조회
  getBests = async (userId) => {
    return await this.Ilchonpyungs.findAll({
      where: { userId },
      order: [['ilchonpyungId', 'desc']],
    });
  };

  findByBest = async (ilchonpyungId) => {
    return await this.Ilchonpyungs.findByPk(ilchonpyungId);
  };

  deleteBest = async (userId, ilchonpyungId) => {
    await await this.Ilchonpyungs.destroy({
      where: { userId, ilchonpyungId },
    });
  };

  findByUser = async (userId) => {
    return await this.Users.findByPk(userId);
  };
}

module.exports = IlchonpyungsRepository;
