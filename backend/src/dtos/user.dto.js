import { Status } from "../enums/common.enums";
import { timeStamp } from "../utils/common.utils";

export default class UserDto {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = timeStamp();
  }
}
