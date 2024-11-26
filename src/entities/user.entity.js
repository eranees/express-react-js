import { Status } from "../enums/common.enums.js";
import { timeStamp } from "../utils/common.util.js";
export default class UserEntity {
	constructor(name, email, password, updated) {
		this.name = name;
		this.email = email;
		this.password = password;
		this.createdAt = timeStamp();
		this.updatedAt = updated || timeStamp();
		this.status = Status.Active;
	}
}
