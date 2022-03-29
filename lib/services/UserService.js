const bcrypt = require('bcryptjs/dist/bcrypt');

module.exports = class UserService {
  static async create({ firstName, lastName, email, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await UserService.insert({
      firstName,
      lastName,
      email,
      passwordHash,
    });

    return user;
  }
};
