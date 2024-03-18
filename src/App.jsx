import React from 'react';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import TodoPage from "./pages/todoPage/TodoPage";
import {UiStore} from "./store/UiStore";
import Modal from "./components/ui/Modal";


const queryClient = new QueryClient();

const App = () => {
    const isModalOpen = UiStore(state=>state.isModalOpen);

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right"/>
            {isModalOpen && <Modal />}
            <TodoPage />
        </QueryClientProvider>
    );
};

export default App;