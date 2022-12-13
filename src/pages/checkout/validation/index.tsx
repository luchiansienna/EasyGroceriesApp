import { Address, OrderItem } from "../../../models";

const checkOrderIsValid = (orderItems: OrderItem[], address: Address): boolean => {
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

  export { checkOrderIsValid };