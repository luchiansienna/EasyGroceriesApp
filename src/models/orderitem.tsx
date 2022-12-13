type OrderItem = {
  orderItemId: number;
  orderId: number;
  productId: number;
  isLoyaltyMembershipItem: boolean;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
};

export default OrderItem;
