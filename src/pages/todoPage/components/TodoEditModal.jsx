import React, {useEffect, useState} from "react";
import classes from "./TodoEditModal.module.scss";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {TodoApi} from "../../../api/TodoApi";
import {UiStore} from "../../../store/UiStore";

const TodoEditModal = ({id}) => {
    const modalClose = UiStore(state => state.actions.modalClose);

    const queryClient = useQueryClient();

    const [inputValue, setInputValue] = useState({
        id: id,
        userId: 0,
        title: '',
        completed: false,
    });

    const {isLoading, isSuccess, error, data, isFetching} = useQuery({
        queryKey: ["fetchTodoItem"],
        queryFn: async () => {
            const res = await TodoApi.getTodoItem(id);
            return res.data;
        },
        cacheTime: 0,
    });

    const updateData = useMutation({
        mutationFn: (params) => {
            TodoApi.updateTodoItem(params)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['fetchAllTodoList']
            });
            modalClose();
        },
        onError: () => {
        },
        onSettled: () => {
        },
        onMutate: () => {
        }
    });

    const handleUpdateClick = async () => {
        updateData.mutate({
            id: id,
            userId: data.userId,
            title: inputValue.title,
            completed: inputValue.completed,
        });
    };

    const handleCloseClick = () => {
        modalClose();
    };

    useEffect(() => {
        if (data) {
            setInputValue({
                id: id,
                userId: data.userId,
                title: data.title,
                completed: data.completed,
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
