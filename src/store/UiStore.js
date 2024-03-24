import { create } from "zustand";
import { devtools } from "zustand/middleware";

/*
immer를 쓰면 setState((prev) => {...prev, todoList: newList} 처럼 하지 않아도 된다.
*/
import { immer } from "zustand/middleware/immer";

const uiStore = (set, get) => ({
  isModalOpen: false,
  modalContents: <div></div>,

  actions: {
    modalClose: () =>
      set((state) => {
        state.isModalOpen = false;
      }),
    setModalInfoAndOpen: (newModalContents) =>
      set((state) => {
        state.isModalOpen = true;
        state.modalContents = newModalContents;
      }),
  },
});

const store = immer((set, get) => uiStore(set, get));

export const useUIStore = create(devtools(store, { name: "uiStore" }));
