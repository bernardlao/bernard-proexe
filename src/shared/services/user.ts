import UserTransformer from "../transformer/user";
import AxiosUtil from "./axios";

class UserService {
  static async getUsers() {
    const data = await AxiosUtil.get({ url: 'https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data' });
    if(data && data.length > 0) {
      return UserTransformer.transformInUsers(data);
    }
    return [];
  }
}

export default UserService;