import "./style.css";
import { useContext, useMemo, useState } from "react";
import { Context } from "../../App";
import { buyButtonIcon } from "../../assets";
import { Order } from "../../models/";
import {
  AddressForm,
  GiftCardButton,
  LoadingTruck,
  OrderItemRow,
} from "../../components";
import { useNavigate } from "react-router-dom";
import {
  calculateTotalAmountDue,
  doesOrderContainLoyaltyMembership,
} from "../../utils";
import { checkOrderIsValid } from "./validation";

const Checkout = () => {
  const { orderItems } = useContext(Context);
  const { order } = useContext(Context);
  const { address } = useContext(Context);
  const [loading, setLoading] = useState<Boolean>(false);
  let navigate = useNavigate();

  const totalAmountDue = useMemo(
    () => calculateTotalAmountDue(orderItems),
    [orderItems]
  );
  const orderContainsLoyaltyMembership = useMemo(
    () => doesOrderContainLoyaltyMembership(orderItems),
    [orderItems]
  );

  const onClickBuyButton = () => {
    if (!checkOrderIsValid(orderItems, address)) return;
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/orders` ?? "", {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "text/plain" },
      body: JSON.stringify({
        ...order,
        items: orderItems,
        address: {
          ...address,
          addressId: Math.floor(Math.random() * 100000),
        },
        totalPrice: totalAmountDue,
        hasOrderLoyaltyDiscountApplied: orderContainsLoyaltyMembership,
      } as Order),
    })
      .then((response) => {
        setLoading(false);
        if (response.ok) {
          navigate("/shippingslip");
        } else {
          alert("Error: " + response.statusText);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        alert("Error: " + err);
      });
  };

  return (
    <div className="wrapper">
      <h3>Your Shopping Basket</h3>
      {!loading ? (
        orderItems?.length ? (
          <>
            <div className="wrapperGrid">
              <div className="item"></div>
              <div className="item">Name</div>
              <div className="item">Quantity</div>
              <div className="item">Unit Price</div>
              <div className="item">Total Price</div>
              <div className="item">Remove item</div>
              {orderItems.map((item) => (
                <OrderItemRow orderItem={item} key={item.orderItemId} />
              ))}
            </div>
            <p className="totalCalculation">
              Total Amount Due: £{totalAmountDue}
            </p>
            <GiftCardButton />
            <AddressForm />
            <img
              src={buyButtonIcon}
              className="Buy-Button"
              alt="Buy"
              onClick={onClickBuyButton}
            />
          </>
        ) : (
          <span>Your shopping basket is empty</span>
        )
      ) : (
        <LoadingTruck />
      )}
    </div>
  );
};

export default Checkout;
