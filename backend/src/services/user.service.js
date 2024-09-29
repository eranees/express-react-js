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
