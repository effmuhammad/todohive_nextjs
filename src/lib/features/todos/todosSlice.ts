import { createAppSlice } from "@/lib/createAppSlice";
import type { AppThunk } from "@/lib/store";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getData } from "./todosAPI";

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
  name: "counter",
  initialState,
  reducers: (create) => ({
    setTodos: create.reducer(
      (state, action: PayloadAction<Todo[]>) => {
        state.todos = action.payload;
      },
    ),
    getTodosData: create.asyncThunk(
      async (arg) => {
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
      },
    ),
  }),
  selectors: {
    selectTodos: (todos) => todos.todos,
    selectStatus: (todos) => todos.status,
  },
});

// Action creators are generated for each case reducer function.
export const { setTodos, getTodosData } =
  todosSlice.actions;

export const { selectTodos, selectStatus } = todosSlice.selectors;