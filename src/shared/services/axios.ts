import axios from 'axios'

interface IHttpRequest {
  url: string
  headers?: { [key: string]: any }
  params?: { [key: string]: any }
}

class AxiosUtil {
  static async get(request: IHttpRequest) {
    try {
      const result = await axios({ method: 'GET', ...request });
      return result?.data;
    } catch(err) {
      console.log(err);
    }
  }
}

export default AxiosUtil;