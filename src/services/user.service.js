import { UserMapper } from '../mappers/user.mapper.js';
import pool from "../database/db.js";
import { CustomError } from '../utils/custom.error.js';

export class UserService {
  constructor() {
    this.userMapper = new UserMapper();
  }

  async create(createUserDto) {
    const userDto = await this.userMapper.toPersistence(createUserDto);

    const existingUser = await this._checkUserByEmail(userDto.email);
    if (existingUser) {
      throw new CustomError('Conflict Exception', 409, 'A user with this email already exists.');
    }

    const values = [
      userDto.name,
      userDto.email,
      userDto.password,
      userDto.createdAt,
      userDto.updatedAt,
      userDto.status,
    ];

    const query = `INSERT INTO "user" (name, email, password, "createdAt", "updatedAt", status) 
                   VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const result = await pool.query(query, values);
    const response = this.userMapper.toResponse(result.rows[0]);
    return {
      user: response,
      message: 'User created successfully.',
    };
  }

  async findOne(id) {
    const query = `SELECT * FROM "user" WHERE id = $1`;
    const result = await pool.query(query, [id]);
    if (result.rows.length > 0) {
      const response = this.userMapper.toResponse(result.rows[0]);
      return {
        user: response,
        message: 'User information successfully fetched.',
      };
    }
    throw new CustomError('Not Found Exception', 404, 'No user found with the provided ID.');
  }

  async findAll() {
    const query = `SELECT * FROM "user"`;
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      const response = this.userMapper.toArrayResponse(result.rows);
      return {
        users: response,
        message: 'User list fetched successfully.',
      };
    }
    return {
      users: null,
      message: 'User list is empty.',
    };
  }

  async delete(id) {
    const query = `DELETE FROM "user" WHERE id = $1`;
    const result = await pool.query(query, [id]);
    if (result.rowCount > 0) {
      return {
        user: null,
        message: 'User deleted successfully',
      };
    }
    throw new CustomError('Not Found Exception', 404, 'No user found with the provided ID.');
  }

  async update(id, updateUserDto) {
    const existingUser = await this.findOne(id);
    if (!existingUser) {
      throw new CustomError('Not Found Exception', 404, 'User not found.');
    }

    if (updateUserDto.email && updateUserDto.email !== existingUser.user.email) {
      const emailExists = await this._checkUserByEmail(updateUserDto.email);
      if (emailExists) {
        throw new CustomError('Conflict Exception', 409, 'A user with this email already exists.');
      }
    }

    const updatedUserDto = await this.userMapper.toPersistence(updateUserDto);

    const updatedUser = {
      name: updatedUserDto.name || existingUser.user.name,
      email: updatedUserDto.email || existingUser.user.email,
      password: updatedUserDto.password || existingUser.user.password,
      updatedAt: + new Date(),
      status: updatedUserDto.status || existingUser.user.status,
    };

    const values = [
      updatedUser.name,
      updatedUser.email,
      updatedUser.password,
      updatedUser.updatedAt,
      updatedUser.status,
      id,
    ];

    const query = `
      UPDATE "user" 
      SET name = $1, email = $2, password = $3, "updatedAt" = $4, status = $5 
      WHERE id = $6 RETURNING *`;

    const result = await pool.query(query, values);

    const response = this.userMapper.toResponse(result.rows[0]);

    return {
      user: response,
      message: 'User updated successfully.',
    };
  }

  async _checkUserByEmail(email) {
    const query = `SELECT * FROM "user" WHERE email = $1`;
    const result = await pool.query(query, [email]);
    if (result.rows.length > 0) {
      const response = this.userMapper.toResponse(result.rows[0]);
      return response;
    }
    return null;
  }
}
