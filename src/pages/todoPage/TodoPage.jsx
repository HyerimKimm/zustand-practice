import TodoListItem from "./components/TodoListItem";
import classes from './TodoPage.module.scss';
import {useTodoListQuery} from "../../query/useTodoQuery";

function TodoPage() {
  const { isLoading, error, data, isFetching } = useTodoListQuery();

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
      <div className={classes.pagewrapper}>
        <h1>오늘 할 일</h1>
        {
        data.data.map((data, idx)=><TodoListItem key={idx} item={data}/> )
      }</div>
  );
}

export default TodoPage;
