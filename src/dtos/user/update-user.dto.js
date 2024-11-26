
export class UpdateUserDto {
  constructor(name, email, password) {
    if (name) this.name = name;
    if (email) this.email = email;
    if (password) this.password = password;
  }
}
