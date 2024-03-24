import axios from "axios";

export class UserApi {
  static getUserInfo = (id) => {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/users/${id}`);
  };
}
