import { Todo } from "./todosSlice";

export const getData = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos");
	const result: Todo[] = await response.json();

  return result;
};
