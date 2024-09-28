import pool from "../../db.js";

export default class UserMigration {
  constructor() { }

  async up() {
    const query = `
      CREATE TYPE user_status AS ENUM ('ACTIVE', 'IN_ACTIVE');

      CREATE TABLE "user" (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100),
        password VARCHAR(255),
        createdAt BIGINT,
        updatedAt BIGINT,
        status user_status
      );
    `;

    try {
      await pool.query(query);
      console.log("User table created successfully.");
    } catch (error) {
      console.error("Error creating user table:", error);
    }
  }

  async down() {
    const query = `
      DROP TABLE IF EXISTS "user";
      DROP TYPE IF EXISTS user_status;
    `;

    try {
      await pool.query(query);
      console.log("User table and user_status type dropped successfully.");
    } catch (error) {
      console.error("Error dropping user table and type:", error);
    }
  }
}
