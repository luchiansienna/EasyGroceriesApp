import { render, screen } from "@testing-library/react";
import CheckoutComponent from "../checkout";
import { createContext} from "react";
import { Address, Order, OrderItem } from "../../../models";

const mockSetOrderItems = jest.fn().mockImplementation((orderItems) => {
  return [...orderItems];
});
const mockUseContext = jest.fn().mockImplementation(() => ({
  products: [],
  quantities: [],
  orderItems: [] as OrderItem[],
  setOrderItems: mockSetOrderItems,
  order: [] as Order[],
  address: {} as Address,
}));
const AppContext = createContext(mockUseContext);

const mockedUsedNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedUsedNavigate,
}));

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: () => mockUseContext,
}));

describe("Check Out Component", () => {
  it("should render basker is empty", () => {
    render(
        <AppContext.Provider value={mockUseContext}>
          <CheckoutComponent />
        </AppContext.Provider>
    );
    const emptyTextElement = screen.getByText(/Your shopping basket is empty/i);
    expect(emptyTextElement).toBeInTheDocument();
  });
});
