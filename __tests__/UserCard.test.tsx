import { render } from "@testing-library/react";
import UserCard from "@/app/components/UserCard";

test("renders the user card with correct user ID", () => {
  const userId = 123;
  const { getByAltText, getByText } = render(<UserCard userId={userId} />);

  const userImage = getByAltText(`User ${userId}`);
  const userName = getByText(`User ${userId}`);

  expect(userImage).toBeDefined;
  expect(userName).toBeDefined();
});

test("renders the user card with correct image source", () => {
  const userId = 123;
  const { getByAltText } = render(<UserCard userId={userId} />);

  const userImage = getByAltText(`User ${userId}`);

  expect(userImage).toHaveProperty("src", `/profile-photos/${userId}.png`);
});
