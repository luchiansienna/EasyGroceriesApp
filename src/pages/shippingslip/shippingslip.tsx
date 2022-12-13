import "./style.css";
import React, { useContext } from "react";
import { Context } from "../../App";
import { AddressForm } from "../../components";
import { useNavigate } from "react-router-dom";

const ShippingSlip = () => {
  const { orderItems } = useContext(Context);
  const { products } = useContext(Context);
  const { order } = useContext(Context);
  const { clearAllState } = useContext(Context);
  let navigate = useNavigate();
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

  const onClickNewOrder = () => {
    clearAllState();
    navigate("/");
  };
  return order ? (
    <div className="wrapperShippingSlip">
      <h3 className="shippingSlipTitle">Shipping Slip</h3>
      <p>Customer: {order.customer?.customerId}</p>
      <p>Order Number: {order.orderId}</p>

      {orderItems.length ? (
        <>
          <div className="wrapperShippingSlipGrid">
            <div className="item"></div>
            <div className="item">Name</div>
            <div className="item">Quantity</div>
            <div className="item">Unit Price</div>
            <div className="item">Total Price</div>
            {orderItems
              .filter((item) => item.productId !== -1)
              .map((item) => {
                const product = products.find(
                  (product) => product.productId === item.productId
                );
                return (
                  <React.Fragment key={item.orderItemId}>
                    <div className="item">
                      <img
                        src={`/products/img-${item.productId}.jpg`}
                        className="ProductImage"
                        alt={product?.name}
                      />
                    </div>
                    <div className="item">{product?.name}</div>
                    <div className="item">{item.quantity}</div>
                    <div className="item">{item.unitPrice}</div>
                    <div className="item">{item.totalPrice}</div>
                  </React.Fragment>
                );
              })}
          </div>
          <p className="totalCalculation">
            Total Amount Due: £{totalAmountDue}
          </p>

          <AddressForm readonly />

          <button onClick={onClickNewOrder} className="New-Order-Button">
            Make a New order
          </button>
        </>
      ) : (
        <span>Order not available</span>
      )}
    </div>
  ) : (
    <div>Order not available</div>
  );
};

export default ShippingSlip;
