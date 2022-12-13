import "./style.css";
import React, { ChangeEvent, useContext } from "react";
import { Context } from "../../App";
import { trashBinIcon } from "../../assets";
import {  OrderItem, Product } from "../../models/";

const OrderItemRow = ({ orderItem }: { orderItem: OrderItem }) => {
  const { setOrderItems } = useContext(Context);
  const { products } = useContext(Context);

  const onQuantityChange = (
    event: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
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

  const onClickRemoveItemButton = (orderItemId: number) => {
    setOrderItems((orderItems) =>
      orderItems.filter((item) => item.orderItemId !== orderItemId)
    );
  };

  const product =
    orderItem.productId !== -1
      ? products.find((product) => product.productId === orderItem.productId)
      : { productId: -1, name: "Loyalty Membership" };
  return (
    <React.Fragment key={orderItem.orderItemId}>
      <div className="item">
        <img
          src={`/products/img-${orderItem.productId}.jpg`}
          className="ProductImage"
          alt={product?.name}
        />
      </div>
      <div className="item">{product?.name}</div>
      <div className="item">
        {orderItem.isLoyaltyMembershipItem ? (
          orderItem.quantity
        ) : (
          <input
            type="number"
            name="quantity"
            min="0"
            value={orderItem.quantity}
            onChange={(e) => onQuantityChange(e, orderItem.productId)}
          />
        )}
      </div>
      <div className="item">{orderItem.unitPrice}</div>
      <div className="item">{orderItem.totalPrice}</div>
      <div className="item">
        <img
          src={trashBinIcon}
          className="RemoveItem"
          alt="Remove Item"
          onClick={() => onClickRemoveItemButton(orderItem.orderItemId)}
        />
      </div>
    </React.Fragment>
  );
};

export default OrderItemRow;