import { EUserReducerType } from "../constants/enum";
import { IUser } from "../interfaces/user";

class UserAction {
  static setUsers(payload: IUser[]) {
    return {
      type: EUserReducerType.SetUsers,
      payload
    }
  }
  
  static addUser(payload: IUser) {
    return {
      type: EUserReducerType.AddUser,
      payload
    }
  }

  static updateUser(payload: IUser) {
    return {
      type: EUserReducerType.UpdateUser,
      payload
    }
  }

  static deleteUser(id: number) {
    return {
      type: EUserReducerType.DeleteUser,
      payload: id
    }
  }
}

export default UserAction;