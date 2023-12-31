const { Users, Counts, Certifications } = require("../models");
const { Op } = require("sequelize");
class UsersRepositories {
  createUser = async (user) => {
    const createUser = await Users.create(user);
    return createUser;
  };

  authEmail = async ({ email }) => {
    const authEmail = await Certifications.findOne({ where: { email } });
    return authEmail;
  };

  emailCheck = async ({ email }) => {
    const emailCheck = await Certifications.update(
      { certificationCheck: true },
      { where: { email } },
    );
    return emailCheck;
  };

  findByEmail = async ({ email }) => {
    const findEmail = await Users.findOne({ where: { email } });
    return findEmail;
  };
  deleteEmail = async ({ email }) => {
    const destroyEmail = await Certifications.destroy({ where: { email } });
    return destroyEmail;
  };

  findOneId = async (userId) => {
    const findOneId = await Users.findOne({ where: { userId } });
    return findOneId;
  };

  findOneEmail = async ({ email }) => {
    const findOneEmail = await Users.findOne({ where: { email } });
    return findOneEmail;
  };

  findById = async (userId, email) => {
    const findById = await Users.findByPk({
      where: {
        [Op.and]: [{ userId }, { email }],
      },
    });
    return findById;
  };

  updateRefresh = async ({user, refreshtoken}) => {
    await Users.update({ refreshtoken }, { where: { userId: user.userId } });
  };

  // ----------------------------------------------------------------

  findMaxUser = async () => {
    return Users.findOne({
      order: [["userId", "desc"]],
    });
  };

  findByUser = async ({userId}) => {
    return Users.findOne({
      attributes: {
        exclude: ["password"],
      },
      where: { userId },
    });
  };

  todayTotalCheck = async ({ ip, userId }) => {
    return await Counts.findOne({ where: { ip, userId } });
  };

  createTodayTotal = async ({ userId, ip, time }) => {
    await Counts.create({ userId, ip, time });
    await Users.increment({ today: 1, total: 1 }, { where: { userId } });
  };

  todayTotalCount = async ({ ip, time, userId }) => {
    await Counts.update({ time }, { where: { ip, userId } });
    await Users.increment({ today: 1, total: 1 }, { where: { userId } });
  };

  // newTodayTotal = async ({ ip, time, userId }) => {
  //   await MyHomeCounts.update({ time }, { where: { ip, userId } });
  //   await Users.increment({ total: 1 }, { where: { userId } });
  //   await Users.update({ today: 1 }, { where: { userId } });
  // };

  introUpdate = async (userId, intro) => {
    const introupdate = await Users.update(
      { intro: intro },
      { where: { userId } }
    );
    return introupdate;
  };

  updatetoken = async ({userId, accesstoken,refreshtoken}) => {
    await Users.update({ accesstoken,refreshtoken }, { where: { userId } });
    console.log(userId,accesstoken,refreshtoken,"11111111111111");
  };

  // chargeDotori = async (userId, price) => {
  //   const isDotori = await this.findByUser(userId);
  //   if (isDotori.dotori === null)
  //     await Users.update({ dotori: 0 }, { where: { userId } });
  //   return await Users.increment({ dotori: price }, { where: { userId } });
  // };

  // findCoupon = async (coupon) => {
  //   return await Coupons.findOne({
  //     where: { coupon },
  //   });
  // };

  // afterCoupon = async (couponId) => {
  //   await Coupons.update(
  //     { status: 'x' },
  //     {
  //       where: { couponId },
  //     }
  //   );
  // };

  // chargeCoupons = async () => {};
  introsix = async (userId, sixwords) => {
    const introsix = await Users.update(
      { sixwords: sixwords },
      { where: { userId } }
    );
    return introsix;
  };

}
module.exports = UsersRepositories;
