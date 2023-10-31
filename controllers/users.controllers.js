const UsersService = require('../services/users.services');
const Joi = require('../util/joi');
const bcrypt = require('bcrypt');

class UsersController {
    usersService = new UsersService();
}

//회원가입
    signup = async(req,res,next)=>{
        try{
            const {email,password,name,gender,birth} =
            await Joi.signupSchema.validateAsync(req.body);

            if(!email || !password || !name || !gender || !birth){
                return res.status(400).send({
                    ok:false,
                    msg: '형식을 확인해주세요.',
                });
            }

            if (password !== confirm) {
                return res.status(400).send({
                    ok: false,
                    msg: '비밀번호가 일치하지 않습니다.',
                });
            }

            const emailcheck = await this.usersService.emailDuplicates(email);
            if (emailcheck) {
                return res.status(400).send({
                    ok: false,
                    msg: '이메일 중복검사를 해주세요.',
                });
            }

            if (name.includes(password) || password.includes(name)) {
                return res.status(400).send({
                    ok: false,
                    msg: '이름과 비밀번호를 다른형식으로 설정해주세요',
                });
            }

            const hashed = await bcrypt.hash(password, 10);
            const users = await Object.create({
                email: email,
                password: hashed,
                name : name,
                gender: gender,
                birth: birth,
            });

            await this.usersService.createUser(users);
            res.status(201).json({ msg: '회원가입에 성공하셨습니다.' });
        } catch (error) {
            next(error);
        }
    };