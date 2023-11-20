const UsersService = require('../services/users.services');
const Joi = require('../util/joi');
const bcrypt = require('bcrypt');

class UsersController {
  usersService = new UsersService();

  //회원가입
  signup = async (req, res, next) => {
    try {
      console.log(req.body);
      const { email, name, password, confirm, gender, birth } =
        await Joi.signupSchema.validateAsync(req.body);

      if (!email || !name || !password || !confirm || !gender || !birth) {
        return res.status(400).send({
          message: '형식을 확인해주세요.',
        });
      }

      if (password !== confirm) {
        return res.status(400).send({
          message: '비밀번호가 일치하지 않습니다.',
        });
      }

      const emailcheck = await this.usersService.emailDuplicates(email);
      if (emailcheck) {
        return res.status(400).send({
          message: '이메일 중복검사를 해주세요.',
        });
      }

      if (name.includes(password) || password.includes(name)) {
        return res.status(400).send({
          message: '이름과 비밀번호를 다른형식으로 설정해주세요',
        });
      }

      const hashed = await bcrypt.hash(password, 10);
      const users = await Object.create({
        email: email,
        name: name,
        password: hashed,
        gender: gender,
        birth: birth,
      });

      await this.usersService.createUser(users);
      res.status(201).json({ msg: '회원가입에 성공하셨습니다.' });
    } catch (error) {
      next(error);
    }
  };
  //로그인
  login = async (req, res, next) => {
    try {
      const { email, password } = await Joi.loginSchema.validateAsync(req.body);
      console.log(req.body)
      const user = await this.usersService.userLogin({email, password});
      res.cookie('accesstoken', user.accesstoken);
      res.cookie('refreshtoken', user.refreshtoken);
      console.log(res.cookie,"11111111111")
      res.status(200).json({
        userId: user.user.userId,
        name : user.user.name,
        gender : user.user.gender,
        birth : user.user.birth,
        accesstoken: user.accesstoken,
        refreshtoken: user.refreshtoken,
        
        message: '로그인에 성공하였습니다',
      });
      // res
      //   .status(200)
      //   .set({
      //     accessToken: 'Bearer ' + user.accessToken,
      //     refreshToken: user.refreshToken,
      //   })
      //   .json({ msg: '로그인 되었습니다.' });
    } catch (error) {
      next(error);
    }
  };

  //이메일 인증
  emailCheck = async (req, res, next) => {
    try {
      const { email } = req.body;
      console.log(email,"111111111111111");
      await this.usersService.emailCheck({ email });
      res.status(200).send({ message: '인증 메일이 발송되었습니다.' });
    } catch (error) {
      next(error);
    }
  };

  certification = async (req, res, next) => {
    try {
      const { email, certificationNum } = req.body;
      await this.usersService.certification({ email, certificationNum });
      res.status(200).json({ message: '인증 확인되었습니다' });
    } catch (error) {
      next(error);
    }
  };

  surfing = async (req, res, next) => {
    try {
      const result = await this.usersService.surfing();
      res.status(200).send({ data: result.userId });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };

  myhome = async (req, res, next) => {
    try {
      await this.usersService.todayTotal(req, res);
      const result = await this.usersService.myhome(req, res);
      res.status(200).send({ data: result });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };

  // myhome = async (req, res, next) => {
  //   try {
  //     const { userId } = req.params;
  //     const myhome = await this.usersService.findOneId(userId);
  //     res.status(200).json({ data: myhome });
  //   } catch (error) {
  //     next(error);
  //   }
  // };
  intro = async (req, res, next) => {
    try {
      const { userId } = req.params;
      const { intro } = req.body;
      console.log(intro);
      const introupdate = await this.usersService.introupdate(userId, intro);
      console.log(introupdate);
      res
        .status(200)
        .json({ data: introupdate, msg: 'intro가 수정되었습니다' });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };


  //도토리
  chargeDotori = async (req, res, next) => {
    try {
      const price = await this.usersService.chargeDotori(req, res);
      res.status(200).send({ msg: `도토리 ${price}개가 충전되었습니다.` });
    } catch (error) {
      res.status(error.status || 400).send({ ok: false, msg: error.message });
    }
  };

  chargeCoupons = (req, res, next) => {
    try {
      res.status(200).send({msg:`쿠폰으로 ${coupon}개가 충전되었습니다.`})
    } catch (error) {
      res
        .status(error.status || 400)
        .send({ ok: false, msg: error.message });
    }
  };
}

module.exports = UsersController;