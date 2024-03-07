import {useQuery} from "@tanstack/react-query";
import {TodoApi} from "../../api/TodoApi";
import TodoListItem from "./components/TodoListItem";
import classes from './TodoPage.module.scss';

function TodoPage() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ['fetchAllTodoList'],
    queryFn: async ()=> {
      const res = await TodoApi.getAllTodoList();
      return res.data;
    },
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
      <div className={classes.pagewrapper}>
        <h1>오늘 할 일</h1>
        {
        data.map((data, idx)=><TodoListItem key={idx} item={data}/> )
      }</div>
  );
}

export default TodoPage;
