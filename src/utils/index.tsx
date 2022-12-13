import { OrderItem } from "../models";

const doesOrderContainLoyaltyMembership = (orderItems: OrderItem[]) =>
  !orderItems?.every((x) => !x.isLoyaltyMembershipItem);

const calculateTotalAmountDue = (orderItems: OrderItem[]): number =>
  +orderItems
    ?.reduce(
      (sum, item) =>
        (sum +=
          doesOrderContainLoyaltyMembership(orderItems) &&
          !item.isLoyaltyMembershipItem
            ? (item.totalPrice * 80) / 100
            : item.totalPrice),
      0
    )
    .toFixed(2);

export { doesOrderContainLoyaltyMembership, calculateTotalAmountDue };
