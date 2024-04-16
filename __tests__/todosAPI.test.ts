import { updateData } from "@/lib/features/todos/todosAPI";

describe("updateData", () => {
  it("should update data successfully", async () => {
    // Arrange
    const data = {
      userId:1,
      id: 1,
      title: "Update Todo",
      completed: false,
    };

    // Act
    const result = await updateData(data);

    // Assert
    expect(result).toEqual(data);
  });

  it("should handle errors gracefully", async () => {
    // Arrange
    const data = {
      userId: 1,
      id: 1,
      title: "Update Todo",
      completed: false,
    };

    // Act
    const result = await updateData(data);

    // Assert
    expect(result).toBeInstanceOf(Error);
  });
});