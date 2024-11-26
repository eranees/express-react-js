import bcrypt from 'bcryptjs';

export default class BcryptUtil {
  static async hash(data) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(data, salt);
  }
}
