import { useMutation } from "@tanstack/react-query";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TodoApi } from "../api/TodoApi";
import { queryKeys } from "./queryKeys";

export const useTodoListQuery = () => {
  return useQuery({
    queryKey: queryKeys.todo.list().queryKey,
    queryFn: async () => {
      const res = await TodoApi.getAllTodoList();
      return res;
    },
  });
};

export const useTodoItemQuery = (id) => {
  return useQuery({
    queryKey: queryKeys.todo.detail(id).queryKey,
    queryFn: async () => {
      const res = await TodoApi.getTodoItem(id);
      return res;
    },
    cacheTime: 0,
  });
};

export const useUpdateTodoMutation = (
  onSuccess,
  onError,
  onSettled,
  onMutate
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params) => TodoApi.updateTodoItem(params),
    onSuccess: () => {
      // Mutation 에 성공한 뒤 실행됨
      queryClient.invalidateQueries({
        queryKey: queryKeys.todo.list().queryKey, // fetchAllTodoList 의 데이터를 무효화 시킴.
      });
      onSuccess && onSuccess();
    },
    onError: () => {
      // mutation이 Error를 만나면 실행됨, try-catch-finally의 catch 역할임
      onError && onError();
    },
    onSettled: () => {
      // mutation이 성공해서 성공한 데이터 또는 Error가 전달될 때 try-catch-finally의 finally 역할임
      onSettled && onSettled();
    },
    onMutate: () => {
      // mutationFn이 실행되기 전에 실행되고, mutation 함수가 받을 동일한 변수가 전달된다.
      // optimistic update 사용 시 유용한 함수이다. (백앤드에 API를 요청하고 나서, 기다리지 않고 response를 업데이트 하는 것)
      onMutate && onMutate();
    },
  });
};
