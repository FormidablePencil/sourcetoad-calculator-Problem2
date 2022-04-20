import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('test calculator', () => {
  const clickBtn = (item: string) => fireEvent.click(screen.getByTestId(`button-${item}`))

  test("simple operation", () => {
    render(<App />);

    const str = "1+1="

    str.split("").forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })

  test("complete operation", () => {
    render(<App />);

    const str = "1*(22)+1="

    str.split("").forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })

  test("don't allow multiple operations in a row", () => {
    render(<App />);

    const str = "1+/1="

    str.split("").forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })

  test("disallow parentheses from starting with ')' without '(' before ift", () => {
    render(<App />);

    const str = "1+)2/22*2)+1="

    str.split("").forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("2");
  })

  test("disallow calculation when last value is a operator. eg 1+1+", () => {
    render(<App />);

    const str = "1+1+="

    str.split("").forEach((item: string) => clickBtn(item))
    expect(screen.getByTestId("calculated-result")).toHaveTextContent("");
  })

  // todo - disallow parentheses with nothing in it. Eg (())
  // todo - disallow calculation with open parentheses. Eg 5*(1
  // todo - fails 1/(2/23*2)+1=
});
