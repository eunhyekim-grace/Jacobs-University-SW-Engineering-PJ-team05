import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Home from "../components/Home";

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

describe("Renders text content", () => {
  it("Renders welcome text", () => {
    act(() => {
      render(<Home />, container);
    });
    expect(container.textContent).toBe("Welcome to Beer Game!");
  });

  it("Renders Beer Game logo", () => {
    act(() => {
      render(<Home />, container);
    });
    const displayedImage = document.querySelector("img");
    expect(displayedImage.src).toContain("beer.png");
  });
});
