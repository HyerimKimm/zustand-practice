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
        queryKey: ["fetchTodoItem",id],
        queryFn: async () => {
            const res = await TodoApi.getTodoItem(id);
            return res;
        },
        cacheTime: 0,
    });

    const updateData = useMutation({
        mutationFn: (params) => TodoApi.updateTodoItem(params),
        onSuccess: () => {
            // Mutation 에 성공한 뒤 실행됨
            queryClient.invalidateQueries({
                queryKey: ['fetchAllTodoList'] // fetchAllTodoList 의 데이터를 무효화 시킴.
            });
            modalClose();
        },
        onError: () => {
            // mutation이 Error를 만나면 실행됨, try-catch-finally의 catch 역할임
        },
        onSettled: () => {
            // mutation이 성공해서 성공한 데이터 또는 Error가 전달될 때 try-catch-finally의 finally 역할임
        },
        onMutate: () => {
            // mutationFn이 실행되기 전에 실행되고, mutation 함수가 받을 동일한 변수가 전달된다.
            // optimistic update 사용 시 유용한 함수이다. (백앤드에 API를 요청하고 나서, 기다리지 않고 response를 업데이트 하는 것)
        }
    });
    /* updateData.mutate : updateData.mutate() => mutationFn을 실행한다.
       updateData.mutateAsync : .mutate와 같으나 promise를 반환한다. */

    const handleUpdateClick = async () => {
        updateData.mutate({
            id: id,
            userId: data.data.userId,
            title: inputValue.title,
            completed: inputValue.completed,
        });
    };

    const handleCloseClick = () => {
        modalClose();
    };

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
