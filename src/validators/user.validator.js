export class UserDtoValidator {
  static async validate(userDto) {
    const errors = [];

    if (!userDto.name || typeof userDto.name !== 'string') {
      errors.push('Name must be a non-empty string');
    }

    if (!userDto.email || typeof userDto.email !== 'string' || !userDto.email.includes('@')) {
      errors.push('Email must be a valid email address');
    }

    if (!userDto.password || typeof userDto.password !== 'string' || userDto.password.length < 6) {
      errors.push('Password must be a string with at least 6 characters');
    }

    if (errors.length > 0) {
      throw new Error(`Validation failed: ${errors.join('; ')}`);
    }
  }
}
