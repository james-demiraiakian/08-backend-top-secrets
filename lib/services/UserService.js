const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User/User');

module.exports = class UserService {
  static async create({ firstName, lastName, email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });
    console.log('In create UserService', user);

    return user;
  }

  static async signIn({ email, password }) {
    try {
      const user = await User.getByEmail(email);
      console.log('In signIn UserService', user);

      if (!user) throw new Error('invalid email');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');

      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });

      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
