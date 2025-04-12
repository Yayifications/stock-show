/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import Form from "../Form";

describe("Form component", () => {
  it("renders dropdown and input", () => {
    render(<Form symbols={["AAPL", "MSFT"]} onAdd={jest.fn()} />);
    expect(screen.getByLabelText(/stock symbol/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/alert price/i)).toBeInTheDocument();
  });

  it("does not submit if alert is invalid", () => {
    const mockAdd = jest.fn();
    render(<Form symbols={["AAPL"]} onAdd={mockAdd} />);
    fireEvent.click(screen.getByRole("button"));
    expect(mockAdd).not.toHaveBeenCalled();
  });

  it("submits when valid input is entered", () => {
    const mockAdd = jest.fn();
    render(<Form symbols={["AAPL"]} onAdd={mockAdd} />);
    const input = screen.getByLabelText(/alert price/i);
    fireEvent.change(input, { target: { value: "123.45" } });
    fireEvent.blur(input);
    fireEvent.click(screen.getByRole("button"));
    expect(mockAdd).toHaveBeenCalledWith("AAPL", 123.45);
  });
});
