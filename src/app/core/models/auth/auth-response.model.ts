import { UserModel } from "../user/user.model";

export interface AuthResponseModel {
  token: string;
  user: UserModel;
}
