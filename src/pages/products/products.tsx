import "./style.css";
import { ChangeEvent, useEffect, useContext } from "react";
import { Quantities, Product, Customer, Order } from "../../models";
import { Context } from "../../App";

const Products = () => {
  const { products, setProducts } = useContext(Context);
  const { quantities, setQuantities } = useContext(Context);
  const { orderItems, setOrderItems } = useContext(Context);
  const { order, setOrder } = useContext(Context);

  const prepareOrder = (): Order =>
    ({
      orderId: Math.floor(Math.random() * 100000),
      createdDate: new Date(),
      customer: {
        customerId: Math.floor(Math.random() * 100000),
        firstName: "Alex",
        lastName: "Jhonson",
        email: "alex@company.com",
        hasLoyaltyMembership: false,
      } as Customer,
      totalPrice: 0,
      hasOrderLoyaltyDiscountApplied: false,
    } as Order);

  const fetchData = () => {
    return fetch(`${process.env.REACT_APP_API_URL}/products` ?? "")
      .then((response) => response.json())
      .then((data) =>
        setProducts(data.filter((x: Product) => x.productId >= 0))
      )
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
    setOrder(prepareOrder());
  }, []);

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
    const product: Product | undefined = products.find(
      (p) => p.productId === productId
    );
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
    <div className="wrapper">
      {products.length ? (
        <ul className="productsList">
          {products.map((product) => (
            <li key={product.productId}>
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
            </li>
          ))}
        </ul>
      ) : (
        <p>No groceries available</p>
      )}
    </div>
  );
};

export default Products;
