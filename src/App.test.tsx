import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('test calculator', () => {
  const clickBtn = (item: string) => fireEvent.click(screen.getByTestId(`button-${item}`))

  test("simple operation", () => {
    render(<App />);

    const _ = ["1", "+", "1", "="].forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })

  test("complete operation", () => {
    render(<App />);

    const _ = ["1", "+", "(", "2", "/", "2", "2", "*", "2", ")", "+", "1", "="].forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })

  test("don't allow multiple operations in a row", () => {
    render(<App />);

    const _ = ["1", "+", "/", "1", "="].forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })

  test("restrict these '(' to a rule", () => {
    render(<App />);

    const _ = ["1", "+", "/", "1", "="].forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })
});
