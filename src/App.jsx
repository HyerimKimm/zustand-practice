import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import TodoPage from "./pages/todoPage/TodoPage";
import Modal from "./components/ui/modal/Modal";
import Header from "./components/ui/header/Header";
import { useUIStore } from "./store/uiStore";

const queryClient = new QueryClient();

const App = () => {
  const isModalOpen = useUIStore((state) => state.isModalOpen);

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={true} buttonPosition="bottom-right" />
      {isModalOpen && <Modal />}
      <Header />
      <TodoPage />
    </QueryClientProvider>
  );
};

export default App;
