const Joi = require('joi');
const birthRegEx =/^(19[0-9][0-9]|20\d{2})-(0[0-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
const passwordRegEx = /^(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]{8,20}$/;
module.exports = {
  signupSchema: Joi.object({
    email: Joi.string()
      // .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .alphanum()
      .required()
      .error(new Error('이메일 형식이 올바르지 않습니다.')),
    name: Joi.string()
      // .pattern(nameRegEx)
      // .max(10)
      .required()
      .error(
        new Error('이름은 최소 1~10자, 한글 또는 영문으로 구성되어야 합니다.')
      ),
    password: Joi.string()
      .pattern(passwordRegEx)
      .required()
      .error(new Error('비밀번호는 8자 이상 20자 이하로 입력해주세요.')),
    confirm: Joi.string()
      .pattern(passwordRegEx)
      .required()
      .error(new Error('비밀번호는 8자 이상 20자 이하로 입력해주세요.')),
    gender: Joi.string().required().error(new Error('성별을 입력해주세요.')),
    birth: Joi.string()
      .pattern(birthRegEx)
      .required()
      .error(new Error('생일형식을 확인해주세요')),
  }),

  loginSchema: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['kw.ac.kr'] } })
      .required()
      .error(new Error('이메일 또는 패스워드를 확인해주세요.')),
    password: Joi.string()
      .pattern(passwordRegEx)
      .required()
      .error(new Error('이메일 또는 패스워드를 확인해주세요.')),
  }),
};