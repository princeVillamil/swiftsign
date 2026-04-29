import { render, screen } from "@testing-library/react";
import { Button } from "./Button";
import { describe, it, expect } from "vitest";

describe("Button component", () => {
  it("renders children correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("shows loader when loading is true", () => {
    const { container } = render(<Button loading>Submit</Button>);
    expect(container.querySelector(".animate-spin")).toBeInTheDocument();
  });

  it("is disabled when loading is true", () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("is disabled when disabled prop is true", () => {
    render(<Button disabled>Submit</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});