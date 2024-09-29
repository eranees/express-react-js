import { CreateUserDto } from '../dtos/user/create-user.dto.js';
import { UserService } from '../services/user.service.js';
import { UserDtoValidator } from '../validators/user.validator.js';
import { UpdateUserDto } from '../dtos/user/update-user.dto.js';

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

  async findAll(req, res, next) {
    try {
      const response = await this.userService.findAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          message: 'Bad Request',
          error: 'id is required.',
        });
      }

      const response = await this.userService.delete(id);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = req.params.id;

      if (!id) {
        return res.status(400).json({
          message: 'Bad Request',
          error: 'User ID is required.',
        });
      }

      const updateUserDto = new UpdateUserDto(req.body.name, req.body.email, req.body.password);

      const response = await this.userService.update(id, updateUserDto);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
