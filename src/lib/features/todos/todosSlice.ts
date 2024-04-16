import { createAppSlice } from "@/lib/createAppSlice";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getData, createData, updateData, deleteData } from "./todosAPI";

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodosSliceState {
  todos: Todo[];
  status: "idle" | "loading" | "failed";
}

const initialState: TodosSliceState = {
  todos: [],
  status: "idle",
};

export const todosSlice = createAppSlice({
  name: "todos",
  initialState,
  reducers: (create) => ({
    setTodos: create.reducer((state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
      localStorage.setItem("todos", JSON.stringify(state.todos));
    }),
    getTodosData: create.asyncThunk(
      async () => {
        const response = await getData();
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          state.todos = action.payload;
          localStorage.setItem("todos", JSON.stringify(state.todos));
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    createTodo: create.asyncThunk(
      async (todo: Todo) => {
        const response = await createData(todo);
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          console.log("createTodo fulfilled");
          console.log(action.payload);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    updateTodo: create.asyncThunk(
      async (todo: Todo) => {
        const response = await updateData(todo);
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          console.log("updateTodo fulfilled");
          console.log(action.payload);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
    deleteTodo: create.asyncThunk(
      async (id: number) => {
        const response = await deleteData(id);
        return response;
      },
      {
        pending: (state) => {
          state.status = "loading";
        },
        fulfilled: (state, action) => {
          state.status = "idle";
          console.log("deleteTodo fulfilled");
          console.log(action.payload);
        },
        rejected: (state) => {
          state.status = "failed";
        },
      }
    ),
  }),
  selectors: {
    selectTodos: (todos) => todos.todos,
    selectStatus: (todos) => todos.status,
  },
});

export const { setTodos, getTodosData, createTodo, updateTodo, deleteTodo } = todosSlice.actions;

export const { selectTodos, selectStatus } = todosSlice.selectors;
