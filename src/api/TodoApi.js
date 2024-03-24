import axios from "axios";

export class TodoApi {
  static getAllTodoList() {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/todos`);
  }

  static getTodoItem(id) {
    return axios.get(`${process.env.REACT_APP_BASE_URL}/todos/${id}`);
  }

  static updateTodoItem(params) {
    return axios.put(`${process.env.REACT_APP_BASE_URL}/todos/${params.id}`, {
      id: params.id,
      title: params.title,
      userId: params.userId,
      completed: params.completed,
    });
  }
}
