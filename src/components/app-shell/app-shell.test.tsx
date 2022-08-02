import React from "react";
import { render, screen } from "@testing-library/react";
import AppShell from "./app-shell";

describe("app-shell is invoked with no props", () => {
  test("app-shell renders", () => {
    render(<AppShell />);
    expect(screen.getByTestId("app-shell")).toBeInTheDocument();
  });
});
