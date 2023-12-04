const UsersRepositories = require("../repositories/users.repositories");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authEmail = require("../util/nodemailer");
require("dotenv").config();

class UsersService {
  usersRepositories = new UsersRepositories();

  createUser = async (users) => {
    const { email, name, password, gender, birth, department, hb } = users;

    // let isGender;

    // if (gender === '남자') isGender = 'man';
    // else isGender = 'lady';

    await this.usersRepositories.createUser({
      email: email,
      password: password,
      name: name,
      // gender: `https://qportminiprojectmini.s3.ap-northeast-2.amazonaws.com/sample/${isGender}.png`,
      gender: gender,
      birth: birth,
      department : department,
      hb : hb,
    });
  };

  emailDuplicates = async (email) => {
    return await this.usersRepositories.findOneEmail({
      email: email + "@kw.ac.kr",
      //email: email
    });
  };

  // duplicate = async (email) => {
  //   return await this.usersRepositories.findOneEmail({
  //     email: email + '@cyworld.com',
  //   });
  // };

  userLogin = async ({email, password}) => {
    const user = await this.usersRepositories.findOneEmail({ email });
    if (!user) {
      throw new Error("가입하신 회원이 아닙니=다.");
    }

    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      throw new Error("비밀번호가 다릅니다.");
    }
    const accesstoken = jwt.sign(
      { 
        userId: user.userId,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        department : user.department,
        hb : user.hb,
      },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );
    const refreshtoken = jwt.sign(
      { 
        userId: user.userId,
        email: user.email,
        name: user.name,
        gender: user.gender,
        birth: user.birth,
        department : user.department,
        hb : user.hb,
      },
      process.env.SECRET_KEY,
      { expiresIn: "14d" }
    );
    await this.usersRepositories.updateRefresh({user,refreshtoken});
    return { user, accesstoken, refreshtoken };
  };

  emailCheck = async ({ email }) => {
    console.log("@2222222222222");
    const emailDuplicate = await this.usersRepositories.findByEmail({ email });
    if (emailDuplicate) {
      throw new Error('이미 가입된 이메일입니다.');
    }
    const emailVerified = await this.usersRepositories.authEmail({ email });
    if (emailVerified) {
      await this.usersRepositories.deleteEmail({ email });
    }
    console.log(email);
    authEmail(email);
  };

  certification = async ({ email, certificationNum }) => {
    const checkEmail = await this.usersRepositories.authEmail({ email });
    if (!checkEmail) {
      throw new Error('email 정보가 존재하지 않습니다');
    }
    if (checkEmail.certificationNum !== certificationNum) {
      throw new Error('인증번호가 일치하지 않습니다');
    }
    if (checkEmail.certificationNum === certificationNum) {
      const auth = await this.usersRepositories.emailCheck({ email });
      return {
        certificationId: auth.certificationId,
        email: auth.email+"kw.ac.kr",
        certificationNum: auth.certificationNum,
        certificationCheck: auth.certificationCheck,
      };
    }
  };

  findOneId = async (userId) => {
    const findOneId = await this.usersRepositories.findOneId(userId);
    console.log("111111111", findOneId);
    return {
      userId: findOneId.userId,
      email: findOneId.email,
      name: findOneId.name,
      gender: findOneId.gender,
      birth: findOneId.birth,
      intro: findOneId.intro,
      today: findOneId.today,
      total: findOneId.total,
    };
  };

  surfing = async () => {
    const maxUserId = await this.usersRepositories.findMaxUser();
    console.log(maxUserId,"1111111111111111111");
    const random = Math.ceil(Math.random() * maxUserId.userId) + "";
    console.log(random,"22222222222");
    return await this.usersRepositories.findByUser({userId:random});
  };

  todayTotal = async (req, res, next) => {
    // 현재 사용중인 유저의 ip를 가져온다.
    const ipAdress = req.ip.split(":").pop();

    const { userId } = req.params;

    const findByUser = await this.usersRepositories.findByUser({userId});

    if (!findByUser) throw new Error("존재하지 않는 미니홈피 입니다.");

    const time = Date.now();

    // 중복된 아이피가 있는지 검증하기위해 repository 요청
    const existIp = await this.usersRepositories.todayTotalCheck({
      ip: ipAdress,
      userId,
    });

    // 중복된 아이피가 없으면 DB에 추가
    if (!existIp)
      return await this.usersRepositories.createTodayTotal({
        userId,
        ip: ipAdress,
        time,
      });
    // 이전 조회수 업데이트 날짜와 현재 날짜가 다를경우 today는 1로 초기화, total +1
    // 구현되는 것을 확인하기 위해 1분마다 today 초기화
    // const day = new Date() + '';
    // const myhomeDay = existIp.updatedAt + '';
    // const intervalDay = day.split(':')[1] - myhomeDay.split(':')[1] === 0;

    // if (!intervalDay)
    //   return await this.usersRepositories.newTodayTotal({
    //     ip: ipAdress,
    //     time,
    //     userId,
    //   });

    // 조회수를 무작정 올리는것을 방지하기 위한 5초 간격
    const intervalCount = time.toString() - existIp.time > 5000;

    // 조회수를 올린지 5초가 지났으면 조회수 요청 및 시간 업데이트 요청
    if (intervalCount)
      await this.usersRepositories.todayTotalCount({
        ip: ipAdress,
        time,
        userId,
      });
  };

  myhome = async (req, res, next) => {
    const { userId } = req.params;
    return await this.usersRepositories.findByUser({userId});
  };

  introupdate = async (userId, intro) => {
    const introupdate = await this.usersRepositories.introUpdate(userId, intro);
    return {
      userId: introupdate.userId,
      intro: introupdate.intro,
    };
  };

  logout = async(userId,accesstoken,refreshtoken)=>{
    const logout = await this.usersRepositories.updatetoken(userId,accesstoken,refreshtoken)
    console.log(logout,"222222222");
    return logout
  }
}
module.exports = UsersService;
