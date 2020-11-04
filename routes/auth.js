const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');
const router = express.Router();

//회원가입
router.post('/api/auth/register', isNotLoggedIn, async (req, res) => {
    const {
        userName,
        userEmail,
        userPassword,
        userBirth,
        userWeight,
        userHeight,
    } = req.body;
    try {
        //exUser 존재 시
        const exUser = await User.findOne({ where: { userEmail } });
        if (exUser) {
            return res.send('이미 가입된 이메일입니다');
        }
        //비밀번호는 암호화
        const hash = await bcrypt.hash(userPassword, 12);
        await User.create({
            userName: userName,
            userEmail: userEmail,
            userPassword: hash,
            userBirth: userBirth,
            userWeight: userWeight,
            userHeight: userHeight,
        });
        return res.status(201).send('회원가입이 완료되었습니다');
    } catch (error) {
        console.error(error);
        return next(error);
    }
});

//로그인
router.post('/api/auth/login', isNotLoggedIn, async (req, res, next) => {
    passport.authenticate('local', (authError, user, info) => {
        if (authError) {
            console.log(authError);
            return next(authError);
        }
        if (!user) {
            return res.send(info.message);
        }
        return req.login(user, (loginError) => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            }
            return res.send(`${user.userName}님이 로그인하셨습니다`);
        });
    })(req, res, next);
});

//로그아웃
router.get('/api/auth/logout', isLoggedIn, async (req, res) => {
    req.logout();
    req.session.destroy();
    return res.status(201).send('로그아웃 되었습니다');
});

module.exports = router;
