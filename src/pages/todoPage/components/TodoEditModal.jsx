import React, { useState } from "react";
import classes from "./TodoEditModal.module.scss";
import { useQuery } from "@tanstack/react-query";
import { TodoApi } from "../../../api/TodoApi";

const TodoEditModal = ({ id }) => {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["fetchTodoItem"],
    queryFn: async () => {
      const res = await TodoApi.getTodoItem(id);

      return res.data;
    },
    cacheTime: 0,
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={classes.wrapper}>
      <div className={classes.inputWrapper}>
        <label for="id">id : </label>
        <input
          id="id"
          value={id}
          onChagne={() => {}}
          disabled
          className={classes.input}
        />
      </div>
      <div className={classes.inputWrapper}>
        <label for="title">일정명 : </label>
        <input id="title" onChange={(e) => {}} className={classes.input} />
      </div>
      <div className={classes.inputWrapper}>
        <label for="completed">완료여부 : </label>
        <input
          id="completed"
          type="checkbox"
          checked={data.completed}
          onChange={(e) => {}}
          className={classes.checkbox}
        />
      </div>
    </div>
  );
};

export default TodoEditModal;
