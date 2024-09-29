import { instanceToPlain, plainToClass } from 'class-transformer';

import UserEntity from '../entities/user.entity.js';
import UserResponseDto from '../dtos/user/user-response.dto.js';
import BcryptUtil from '../utils/hash.util.js';

export class UserMapper {
  async toPersistence(userDto) {
    const data = instanceToPlain(userDto);
    data.password = await BcryptUtil.hash(data.password);
    const user = plainToClass(UserEntity, data);
    return user;
  }

  toResponse(data) {
    const d = instanceToPlain(data);
    const response = plainToClass(UserResponseDto, d);
    return response;
  }

  toArrayResponse(data) {
    return data.map((item) => {
      const d = instanceToPlain(item);
      return plainToClass(UserResponseDto, d, { excludeExtraneousValues: true });
    });
  }
}
