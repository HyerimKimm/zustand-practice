import React from 'react';
import classes from './TodoEditModal.module.scss';

const TodoEditModal = ({ id }) => {
    return (
        <div className={classes.wrapper}>
            나는 모달 : {id}
        </div>
    );
};

export default TodoEditModal;