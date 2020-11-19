import axios from "axios";
const API_URL = "http://localhost:8080";

class UserService {
  retrieveAllUsers() {
    console.log("Data: ", axios.get(`${API_URL}/api/users`));
    return axios.get(`${API_URL}/api/users`);
  }

  retrieveUserById(id) {
    return axios.get(`${API_URL}/api/users/${id}`);
  }

  updateUser(id, data) {
    return axios.put(`${API_URL}/api/users/${id}`, data);
  }

  createUser(data) {
    return axios.post(`${API_URL}/api/users/`, data);
  }

  deleteUser(id) {
    return axios.delete(`${API_URL}/api/users/${id}`);
  }
}
export default new UserService();
