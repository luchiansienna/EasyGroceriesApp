import React, { useState } from "react";

import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar } from "./components/";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Products, Checkout } from "./pages/";

import { Address, Order, Product, OrderItem, Quantities } from "./models";
import ShippingSlip from "./pages/shippingslip/shippingslip";

const useValue = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Quantities[]>([]);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [order, setOrder] = useState<Order>({} as Order);
  const [address, setAddress] = useState<Address>({} as Address);
  return {
    products,
    setProducts,
    quantities,
    setQuantities,
    orderItems,
    setOrderItems,
    order,
    setOrder,
    address,
    setAddress,
    clearAllState: () => {
      setProducts([]);
      setQuantities([]);
      setOrderItems([]);
      setOrder({} as Order);
      setAddress({} as Address);
    },
  };
};

export const Context = React.createContext({} as ReturnType<typeof useValue>);

function App() {
  return (
    <div className="App">
      <Context.Provider value={useValue()}>
        <Router>
          <Routes>
            <Route
              path="/"
              index
              element={
                <>
                  <Navbar />
                  <Products />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                  <Navbar />
                  <Checkout />
                </>
              }
            />
            <Route path="/shippingslip" element={<ShippingSlip />} />
          </Routes>
        </Router>
      </Context.Provider>
    </div>
  );
}

export default App;
