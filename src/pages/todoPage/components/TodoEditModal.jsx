import React, {useEffect, useState} from "react";
import classes from "./TodoEditModal.module.scss";
import {UiStore} from "../../../store/UiStore";
import {useTodoItemQuery, useUpdateTodoMutation} from "../../../query/useTodoQuery";

const TodoEditModal = ({id}) => {
    const modalClose = UiStore(state => state.actions.modalClose);
    const [inputValue, setInputValue] = useState({
        id: id,
        userId: 0,
        title: '',
        completed: false,
    });

    const {isLoading, error, data} = useTodoItemQuery(id);
    const updateData = useUpdateTodoMutation(handleCloseClick);
    /* updateData.mutate : updateData.mutate() => mutationFn을 실행한다.
       updateData.mutateAsync : .mutate와 같으나 promise를 반환한다. */
    async function handleUpdateClick() {
        updateData.mutate({
            id: id,
            userId: data.data.userId,
            title: inputValue.title,
            completed: inputValue.completed,
        });
    }
    function handleCloseClick() {
        modalClose();
    }

    useEffect(() => {
        if (data?.data) {
            setInputValue({
                id: id,
                userId: data.data.userId,
                title: data.data.title,
                completed: data.data.completed,
            })
        }
    }, [data]);

    if (isLoading) return "Loading...";

    if (error) return "An error has occurred: " + error.message;

    return (
        <div className={classes.wrapper}>
            <div className={classes.inputWrapper}>
                <label htmlFor="id">id : </label>
                <input
                    id="id"
                    value={id}
                    onChange={() => {
                    }}
                    disabled
                    className={classes.input}
                />
            </div>
            <div className={classes.inputWrapper}>
                <label htmlFor="title">일정명 : </label>
                <input
                    id="title"
                    value={inputValue.title}
                    onChange={(e) => {
                        setInputValue(prev => ({
                            ...prev,
                            title: e.target.value,
                        }))
                    }}
                    className={classes.input}/>
            </div>
            <div className={classes.inputWrapper}>
                <label htmlFor={'completed'}>완료여부 : </label>
                <input
                    id="completed"
                    type="checkbox"
                    checked={inputValue.completed}
                    onChange={(e) => {
                        console.log(e.target.checked)
                        setInputValue(prev => ({
                            ...prev,
                            completed: e.target.checked
                        }))
                    }}
                    className={classes.checkbox}
                />
            </div>
            <button className={classes.button} onClick={handleUpdateClick}>수정하기</button>
            <button className={classes.button} onClick={handleCloseClick}>닫기</button>
        </div>
    );
};

export default TodoEditModal;
