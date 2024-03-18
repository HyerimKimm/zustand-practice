import { useMutation } from "@tanstack/react-query";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {TodoApi} from "../api/TodoApi";

const useTodoQuery = () => {
    const getTodoListQuery = useQuery({
        queryKey: ['fetchAllTodoList'],
        queryFn: TodoApi.getAllTodoList,
    });
    const getTodoDetailQuery = useQuery(TodoApi.getTodoItem);
    const updateMutation = useMutation(TodoApi.updateTodoItem);

    return {
        getTodoListQuery,
        getTodoDetailQuery,
        updateMutation,
    };
}

export default useTodoQuery;