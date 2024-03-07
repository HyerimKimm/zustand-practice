import React from 'react';
import classes from './TodoListItem.module.css';

const TodoListItem = ({item}) => {
    return (
        <div className={classes.wrapper}>
            <h3>일정명 : {item.title}</h3>
            <div>완료여부 : {item.completed? '완료' : '미완료'}</div>
        </div>
    );
};

export default TodoListItem;