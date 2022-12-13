import "./style.css";
import { shoppingCart, logo } from "../../assets/";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../../App";

const Navbar = () => {
  const { orderItems } = useContext(Context);
  const doesOrderContainLoyaltyMembership = !orderItems.every(
    (x) => !x.isLoyaltyMembershipItem
  );
  const totalAmountDue: number = +orderItems
    .reduce(
      (sum, item) =>
        (sum +=
          doesOrderContainLoyaltyMembership && !item.isLoyaltyMembershipItem
            ? (item.totalPrice * 80) / 100
            : item.totalPrice),
      0
    )
    .toFixed(2);
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
        No. of products: {orderItems.length ?? ""} | Total price: £
        {totalAmountDue}
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
