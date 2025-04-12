/// <reference types="@testing-library/jest-dom" />
import { render, screen } from "@testing-library/react";
import StockCard from "../StockCard";

describe("StockCard", () => {
  it("renders symbol and price", () => {
    render(
      <StockCard
        symbol="AAPL"
        price={200}
        alertPrice={150}
        changePercent={10}
      />
    );
    expect(screen.getByText("AAPL")).toBeInTheDocument();
    expect(screen.getByText("Price: $200.00")).toBeInTheDocument();
    expect(screen.getByText("+10.00%")).toBeInTheDocument();
  });

  it("applies green background when price is above alert", () => {
    const { container } = render(
      <StockCard symbol="GOOGL" price={100} alertPrice={90} changePercent={5} />
    );
    expect(container.firstChild).toHaveClass("bg-green-500");
  });

  it("applies red background when price is below alert", () => {
    const { container } = render(
      <StockCard symbol="TSLA" price={80} alertPrice={100} changePercent={-3} />
    );
    expect(container.firstChild).toHaveClass("bg-red-500");
  });
});
