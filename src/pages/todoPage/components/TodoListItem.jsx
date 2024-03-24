import React from "react";
import classes from "./TodoListItem.module.scss";
import { useUIStore } from "../../../store/uiStore";
import TodoEditModal from "./TodoEditModal";

const TodoListItem = ({ item }) => {
  const setModalInfoAndOpen = useUIStore(
    (state) => state.actions.setModalInfoAndOpen
  );

  const handleItemClick = () => {
    setModalInfoAndOpen(<TodoEditModal id={item.id} />);
  };

  return (
    <div className={classes.wrapper} onClick={handleItemClick}>
      <h3>일정명 : {item.title}</h3>
      <div>완료여부 : {item.completed ? "완료" : "미완료"}</div>
    </div>
  );
};

export default TodoListItem;
