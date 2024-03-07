import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

/*
immer를 쓰면 setState((prev) => {...prev, todoList: newList} 처럼 하지 않아도 된다.
*/
import { immer } from 'zustand/middleware/immer'

const uiStore = (set, get) => ({
    isModalOpen: false,
    modalContents: <div></div>,

    actions: {
        modalClose: () => set({ isModalOpen: false, modalContents: <div></div>, }),
        setModalInfoAndOpen: (newModalContents) => set({ isModalOpen: true, modalContents: newModalContents }),
    }
})

const store = immer((set, get)=>uiStore(set, get));

export const UiStore = create(devtools(store, { name: 'uiStore' }));