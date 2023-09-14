import { render, screen } from "@testing-library/react";
import GamePage from "../components/GamePage";

//check if Reset renders
test("See if GamePage renders", () => {
  render(<GamePage />);
  const linkElement = screen.getByText(/Place Order/i);
  expect(linkElement).toBeInTheDocument();
});
