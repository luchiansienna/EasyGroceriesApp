import Address from "./address";
import Customer from "./customer";
import OrderItem from "./orderitem";

type Order = {
  orderId: number;
  createdDate: Date;
  items: OrderItem[];
  customer: Customer;
  address: Address;
  totalPrice: number;
  hasOrderLoyaltyDiscountApplied: boolean;
};
export default Order;
