export default class UserResponseDto {
  constructor(id, name, email, password, createdAt, updatedAt, status) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.status = status;
  }
}
