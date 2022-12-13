import "./style.css";
import { useEffect, useContext, useState } from "react";
import { Product, Customer, Order } from "../../models";
import { Context } from "../../App";
import { ProductCard, LoadingHeart } from "../../components";

const Products = () => {
  const { products, setProducts } = useContext(Context);
  const { setOrder } = useContext(Context);

  const [loading, setLoading] = useState<Boolean>(false);

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
    setLoading(true);
    return fetch(`${process.env.REACT_APP_API_URL}/products` ?? "")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.filter((x: Product) => x.productId >= 0));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
    setOrder(prepareOrder());
  }, []);

  return (
    <div className="wrapper">
      {!loading ? (
        products.length ? (
          <div className="productsList">
            {products.map((product) => (
              <ProductCard product={product} key={product.productId} />
            ))}
          </div>
        ) : (
          <p>No groceries available</p>
        )
      ) : (
        <LoadingHeart />
      )}
    </div>
  );
};

export default Products;
