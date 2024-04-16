import { Todo } from "./todosSlice";

export const getData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
	const result: Todo[] = await response.json();

  return result;
};

export const createData = async (data: Todo) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const result: Todo = await response.json();

  return result;
};

export const updateData = async (data: Todo) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${data.id}`,
    {
      method: "PUT",
      body: JSON.stringify(data),
    },
  );
  const result: Todo = await response.json();

  return result;
};

export const deleteData = async (id: number) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`,
    {
      method: "DELETE",
    },
  );
  const result = await response.json();

  return result;
};