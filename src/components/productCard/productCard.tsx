import "./style.css";
import { ChangeEvent, useContext } from "react";
import { Context } from "../../App";
import { Product, Quantities } from "../../models";

const ProductCard = ({ product }: { product: Product }) => {
  const { quantities, setQuantities } = useContext(Context);
  const { orderItems, setOrderItems } = useContext(Context);
  const { order } = useContext(Context);

  const onAddToCart = (productId: number) => {
    let quantity: Quantities = quantities.find(
      (q) => q.productId === productId
    ) ?? { quantity: 1, productId };
    if (quantity.quantity < 0) {
      alert("Negative quantities are not allowed");
      return;
    }
    const orderItemProduct = orderItems.find((x) => x.productId === productId);
    quantity.quantity += orderItemProduct ? orderItemProduct.quantity : 0;

    setOrderItems((orderItems) => [
      ...orderItems.filter((x) => x.productId !== productId),
      {
        orderItemId:
          orderItems.length > 0
            ? orderItems[orderItems.length - 1].orderItemId + 1
            : 0,
        productId: productId,
        orderId: order.orderId,
        isLoyaltyMembershipItem: false,
        quantity: quantity.quantity,
        unitPrice: product ? product.price : 0,
        totalPrice: product ? product.price * quantity.quantity : 0,
      },
    ]);
  };

  const handleQuantityChange = (
    event: ChangeEvent<HTMLInputElement>,
    productId: number
  ) => {
    setQuantities((quantities) => [
      ...quantities.filter((x) => x.productId !== productId),
      { productId: productId, quantity: +event.target.value },
    ]);
  };

  return (
    <div key={product.productId}>
      <p>{product.name}</p>
      <p>
        <img
          src={`/products/img-${product.productId}.jpg`}
          alt={product.name}
        ></img>
      </p>
      <p>£{product.price}</p>
      <input
        type="number"
        name="quantity"
        min="0"
        defaultValue={1}
        onChange={(e) => handleQuantityChange(e, product.productId)}
      />
      <button
        onClick={() => onAddToCart(product.productId)}
        className="AddToCartButton"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
