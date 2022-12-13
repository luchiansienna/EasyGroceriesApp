
import "./style.css";
import { useContext } from "react";
import { Context } from "../../App";
import { giftCardIcon } from "../../assets";

const GiftCardButton = () => {
    const { orderItems, setOrderItems } = useContext(Context);
    const { order } = useContext(Context);

    const doesOrderContainLoyaltyMembership = !orderItems?.every(
      (x) => !x.isLoyaltyMembershipItem
    );
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

      return (!doesOrderContainLoyaltyMembership ? (
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
      ));
    
}

export default GiftCardButton;