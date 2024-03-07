import axios from "axios";
import { useQuery } from '@tanstack/react-query';
import {createQueryKeys} from "@lukemorales/query-key-factory";

const STALE_TIME = 1000;

const todoQueryKey = createQueryKeys('todo', {
    fetchAllTodoList: () => ['fetchAllTodoList'],
    fetchTodoItemDetail: (todoId) => ['fetchTodoItemDetail', todoId],
});

export class TodoApi {
    static BASE_URL = 'https://jsonplaceholder.typicode.com';

    static getAllTodoList() {
        return useQuery({
            queryKey: todoQueryKey.fetchAllTodoList().queryKey,
            queryFn: ()=>axios.get(`${this.BASE_URL}/todos`),
            staleTime: STALE_TIME
        });
    }

    static getTodoItem(todoId) {
        return axios.get(`${this.BASE_URL}/todos/${todoId}`)
    }
}