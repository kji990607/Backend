//입력한 userEmail, userPassword를 DB와 비교
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'userEmail',
                passwordField: 'userPassword',
            },
            async (userEmail, userPassword, done) => {
                try {
                    const exUser = await User.findOne({ where: { userEmail } });
                    if (exUser) {
                        const result = await bcrypt.compare(
                            userPassword,
                            exUser.userPassword,
                        );
                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, { message: '잘못된 비밀번호입니다' });
                        }
                    } else {
                        done(null, false, { message: '잘못된 이메일입니다' });
                    }
                } catch (error) {
                    console.error(error);
                    next(error);
                }
            },
        ),
    );
};
