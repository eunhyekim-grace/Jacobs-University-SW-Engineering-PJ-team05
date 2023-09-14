import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Home from "../components/About";

let container = null;

beforeEach(() => {
  // Setup a DOM element as target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // Clean up on exit
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

describe("Renders about content", () => {
  it("Renders text", () => {
    act(() => {
      render(<Home />, container);
    });
    expect(container.textContent).toBe(
      "About PageThis is a Beer Game web app developed by Jacobs University Bremen's students for Software Engineering project under professor Peter Baumann"
    );
  });
});
