import "./style.css";
import { shoppingCart, logo } from "../../assets/";
import { Link } from "react-router-dom";
import { useContext, useMemo } from "react";
import { Context } from "../../App";
import { calculateTotalAmountDue } from "../../utils";

const Navbar = () => {
  const { orderItems } = useContext(Context);
  const totalAmountDue = useMemo(
    () => calculateTotalAmountDue(orderItems),
    [orderItems]
  );
  return (
    <header className="navbar">
      <div>
        <Link to="/">
          <img src={logo} className="App-logo" alt="logo" />
        </Link>
        <Link to="/">
          <span>Easy Groceries</span>
        </Link>
      </div>
      <div className="topRightPanel">
        # {orderItems.length ?? ""} | Total: £{totalAmountDue}
        <Link to="./checkout">
          <img
            src={shoppingCart}
            className="Shopping-Cart"
            alt="shopping cart"
          />
          <span>CheckOut</span>
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
