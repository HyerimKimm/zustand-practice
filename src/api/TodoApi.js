import axios from "axios";

export class TodoApi {
    static BASE_URL = 'https://jsonplaceholder.typicode.com';

    static getAllTodoList () {
        return axios.get(`${this.BASE_URL}/todos`);
    }

    static getTodoItem (id) {
        return axios.get(`${this.BASE_URL}/todos/${id}`)
    }

    static updateTodoItem (params) {
        return axios.put(`${this.BASE_URL}/todos/${params.id}`, {
            id: params.id,
            title: params.title,
            userId: params.userId,
            completed: params.completed,
        })
    }
}