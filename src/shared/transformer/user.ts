import { IUser, _IUser } from "../interfaces/user";

class UserTransformer {
  static transformInUsers(data: _IUser[]): IUser[] {
    return data.map(item => ({
      id: item.id,
      name: item.name,
      username: item.username,
      email: item.email,
      city: item?.address?.city ?? 'N/A',
    }))
  }
}

export default UserTransformer;