/// <reference types="@testing-library/jest-dom" />
import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";

jest.mock("../hooks/useFinnHubSocket", () => ({
  useFinnhubSocket: jest.fn(),
}));

describe("App integration", () => {
  it("adds a stock and displays its card", () => {
    render(
      <div style={{ width: 1024, height: 768 }}>
        <App />
      </div>
    );

    const select = screen.getByLabelText(/stock symbol/i);
    fireEvent.change(select, { target: { value: "AAPL" } });

    const input = screen.getByLabelText(/alert price/i);
    fireEvent.change(input, { target: { value: "150" } });

    const button = screen.getByRole("button", { name: /add stock/i });
    fireEvent.click(button);

    expect(screen.getByRole("heading", { name: "AAPL" })).toBeInTheDocument();
    expect(screen.getByText("Alert Price: $150.00")).toBeInTheDocument();
  });
});
