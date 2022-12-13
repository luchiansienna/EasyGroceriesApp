import "./style.css";
import React, { ChangeEvent, useContext } from "react";
import { Context } from "../../App";
import { trashBinIcon, buyButtonIcon, giftCardIcon } from "../../assets";
import { Order, OrderItem, Product } from "../../models/";
import { AddressForm } from "../../components";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { orderItems, setOrderItems } = useContext(Context);
  const { products } = useContext(Context);
  const { order } = useContext(Context);
  const { address } = useContext(Context);
  let navigate = useNavigate();
  const doesOrderContainLoyaltyMembership = !orderItems?.every(
    (x) => !x.isLoyaltyMembershipItem
  );
  const onQuantityChange = (
    event: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    const orderItem: OrderItem =
      orderItems.find((x) => x.productId === productId) ?? ({} as OrderItem);
    const product: Product =
      products.find((x) => x.productId === productId) ?? ({} as Product);
    const quantity: number = +event.target.value;
    setOrderItems((orderItems: OrderItem[]) =>
      orderItems.map((item) =>
        item.productId !== productId
          ? item
          : {
              ...orderItem,
              quantity,
              unitPrice: product.price,
              totalPrice: product ? product.price * quantity : 0,
            }
      )
    );
  };
  const onClickGiftCardButton = () => {
    setOrderItems((orderItems) => [
      ...orderItems,
      {
        orderItemId:
          orderItems.length > 0
            ? orderItems[orderItems.length - 1].orderItemId + 1
            : 0,
        productId: -1,
        orderId: order.orderId,
        isLoyaltyMembershipItem: true,
        quantity: 1,
        unitPrice: 5,
        totalPrice: 5,
      },
    ]);
  };
  const onClickRemoveItemButton = (orderItemId: number) => {
    setOrderItems((orderItems) =>
      orderItems.filter((item) => item.orderItemId !== orderItemId)
    );
  };
  const totalAmountDue: number = +orderItems
    ?.reduce(
      (sum, item) =>
        (sum +=
          doesOrderContainLoyaltyMembership && !item.isLoyaltyMembershipItem
            ? (item.totalPrice * 80) / 100
            : item.totalPrice),
      0
    )
    .toFixed(2);

  const orderIsValid = (): boolean => {
    if (orderItems.filter((item) => item.quantity <= 0).length > 0) {
      alert("Each quantity must be greater than 0");
      return false;
    }
    if (!address.street) {
      alert("Specify a street at shipping details section");
      return false;
    }
    if (!address.city) {
      alert("Specify a city at shipping details section");
      return false;
    }
    if (!address.postCode) {
      alert("Specify a post code at shipping details section");
      return false;
    }
    if (!address.countryCode) {
      alert("Select a country at shipping details section");
      return false;
    }

    return true;
  };
  const onClickBuyButton = () => {
    if (!orderIsValid()) return;
    fetch(`${process.env.REACT_APP_API_URL}/orders` ?? "", {
      method: "POST",
      headers: { "Content-Type": "application/json", accept: "text/plain" },
      body: JSON.stringify({
        ...order,
        items: orderItems,
        address: { ...address, addressId: Math.floor(Math.random() * 100000) },
        totalPrice: totalAmountDue,
        hasOrderLoyaltyDiscountApplied: doesOrderContainLoyaltyMembership,
      } as Order),
    })
      .then(() => {
        navigate("/shippingslip");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="wrapper">
      <h3>Your Shopping Basket</h3>
      {orderItems?.length ? (
        <>
          <div className="wrapperGrid">
            <div className="item"></div>
            <div className="item">Name</div>
            <div className="item">Quantity</div>
            <div className="item">Unit Price</div>
            <div className="item">Total Price</div>
            <div className="item">Remove item</div>
            {orderItems.map((item) => {
              const product =
                item.productId !== -1
                  ? products.find(
                      (product) => product.productId === item.productId
                    )
                  : { productId: -1, name: "Loyalty Membership" };
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
                  <div className="item">
                    {item.isLoyaltyMembershipItem ? (
                      item.quantity
                    ) : (
                      <input
                        type="number"
                        name="quantity"
                        min="0"
                        value={item.quantity}
                        onChange={(e) => onQuantityChange(e, item.productId)}
                      />
                    )}
                  </div>
                  <div className="item">{item.unitPrice}</div>
                  <div className="item">{item.totalPrice}</div>
                  <div className="item">
                    <img
                      src={trashBinIcon}
                      className="RemoveItem"
                      alt="Remove Item"
                      onClick={() => onClickRemoveItemButton(item.orderItemId)}
                    />
                  </div>
                </React.Fragment>
              );
            })}
          </div>
          <p className="totalCalculation">
            Total Amount Due: £{totalAmountDue}
          </p>
          {!doesOrderContainLoyaltyMembership ? (
            <div>
              <img
                src={giftCardIcon}
                className="Gift-Card"
                alt="Buy Loyalty Membership"
                onClick={onClickGiftCardButton}
              />
              <button
                onClick={onClickGiftCardButton}
                className="Gift-Card-Button"
              >
                Add Loyalty Membership to the order
              </button>
            </div>
          ) : (
            <></>
          )}
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
      )}
    </div>
  );
};

export default Checkout;
