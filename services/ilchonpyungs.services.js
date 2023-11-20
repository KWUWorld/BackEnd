const IlchonpyungsRepository = require('../repositories/ilchonpyungs.repositories');

class IlchonpyungsService {
  ilchonpyungsRepository = new IlchonpyungsRepository();

  // 일촌평 작성
  createBest = async (req, res, next) => {
    const { ilchonpyung, nick } = req.body;
    const { userId } = req.params;
    const { user } = res.locals;

    // 미니홈피의 user data가 없을시
    const existUser = await this.ilchonpyungsRepository.findByUser(userId);
    if (!existUser) throw new Error('미니홈피가 존재하지 않습니다.');

    if (!nick) throw new Error('일촌명을 입력해주세요.');

    // 일촌평을 작성하지 않거나 3자 이하로 작성시 예외처리
    if (!ilchonpyung) throw new Error('일촌평을 작성해주세요.');
    if (ilchonpyung.length < 3)
      throw new Error('일촌평을 3자이상 입력해주세요.');

    // 본인의 미니홈피에 일촌평 작성시 예외처리
    if (+userId === user.userId)
      throw new Error('본인 미니홈피에는 작성이 불가합니다.');

    // 두 개 이상의 일촌평 작성 시도시 예외처리
    const existBest = await this.ilchonpyungsRepository.findByWriter(
      userId,
      user.userId
    );
    if (existBest) throw new Error('일촌평은 하나만 작성 가능합니다.');

    await this.ilchonpyungsRepository.createBest({
      userId,
      nick,
      name: user.name,
      writerId: user.userId,
      ilchonpyung,
    });
  };

  // 일촌평 목록 조회
  getBests = async (req, res, next) => {
    const { userId } = req.params;

    // 미니홈피의 기준인 userId를 parameter로 받아서 repo에 조회
    return await this.ilchonpyungsRepository.getBests(userId);
  };

  // 일촌평 삭제
  deleteBest = async (req, res, next) => {
    const { userId, ilchonpyungId } = req.params;
    const { user } = res.locals;

    // 일촌평 id를 받아 존재유무 확인 후 본인 여부 확인
    const best = await this.ilchonpyungsRepository.findByBest(ilchonpyungId);
    if (!best) throw new Error('존재하지 않는 일촌평입니다.');
    if (best.writerId !== user.userId)
      throw new Error('본인이 작성한 일촌평이 아닙니다.');

    await this.ilchonpyungsRepository.deleteBest(userId, ilchonpyungId);
  };
}
module.exports = IlchonpyungsService;
