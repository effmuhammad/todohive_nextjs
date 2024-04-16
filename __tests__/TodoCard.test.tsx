import { render, fireEvent } from "@testing-library/react";
import TodoCard from "../src/app/components/TodoCard";

test("renders the todo card", () => {
  const mockOnToggleCompleted = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const { getByText } = render(
    <TodoCard
      title="Test Todo"
      completed={false}
      onToggleCompleted={mockOnToggleCompleted}
      onEdit={mockOnEdit}
      onDelete={mockOnDelete}
    />
  );

  expect(getByText("Test Todo"));
});

test("calls onToggleCompleted when the todo card is clicked", () => {
  const mockOnToggleCompleted = jest.fn();
  const mockOnEdit = jest.fn();
  const mockOnDelete = jest.fn();

  const { getByText } = render(
    <TodoCard
      title="Test Todo"
      completed={false}
      onToggleCompleted={mockOnToggleCompleted}
      onEdit={mockOnEdit}
      onDelete={mockOnDelete}
    />
  );

  fireEvent.click(getByText("Test Todo"));
  expect(mockOnToggleCompleted).toHaveBeenCalled();
});
