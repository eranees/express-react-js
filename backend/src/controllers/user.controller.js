import { CreateUserDto } from '../dtos/user/create-user.dto.js';
import { UserService } from '../services/user.service.js';
import { UserDtoValidator } from '../validators/user.validator.js';

export default class UserController {
  constructor() {
    this.userService = new UserService();
  }

  async create(req, res, next) {
    try {
      const createUserDto = new CreateUserDto(req.body.name, req.body.email, req.body.password);
      await UserDtoValidator.validate(createUserDto);
      const response = await this.userService.create(createUserDto);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          message: 'Bad Request',
          error: 'id is required.',
        });
      }

      const response = await this.userService.findOne(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
