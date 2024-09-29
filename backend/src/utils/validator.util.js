import { validate } from 'class-validator';

export default class DtoValidator {
  static async validate(dto) {
    const errors = await validate(dto);

    if (errors.length > 0) {
      const errorMessages = errors.map(err => {
        return Object.values(err.constraints).join(', ');
      });
      throw new Error(`Validation failed: ${errorMessages.join('; ')}`);
    }
  }
}
