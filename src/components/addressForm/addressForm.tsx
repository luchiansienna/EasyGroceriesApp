import "./style.css";
import React, { useContext } from "react";
import { Context } from "../../App";
import { deliveryTruckIcon } from "../../assets";
import { Address } from "../../models";
import CountrySelector from "../countrySelector/countrySelector";

const AddressForm = ({ readonly }: { readonly?: boolean }) => {
  const { address, setAddress } = useContext(Context);

  return (
    <React.Fragment>
      <div>
        <img
          src={deliveryTruckIcon}
          className="Delivery-Truck"
          alt="Shipment"
        />
        <span className="ShippingTitle">Shipping Details:</span>
      </div>
      <div className="wrapperAddressForm">
        <div className="item">Street :</div>
        <div className="item">
          {readonly ? (
            address.street
          ) : (
            <input
              type="text"
              name="street"
              min="0"
              value={address.street || ""}
              onChange={(e) =>
                setAddress((address: Address) => ({
                  ...address,
                  street: e.target.value,
                }))
              }
            />
          )}
        </div>
        <div className="item">City :</div>

        <div className="item">
          {readonly ? (
            address.city
          ) : (
            <input
              type="text"
              name="city"
              min="0"
              value={address.city || ""}
              onChange={(e) =>
                setAddress((address: Address) => ({
                  ...address,
                  city: e.target.value,
                }))
              }
            />
          )}
        </div>

        <div className="item">Post Code :</div>

        <div className="item">
          {readonly ? (
            address.postCode
          ) : (
            <input
              type="text"
              name="postCode"
              min="0"
              value={address.postCode || ""}
              onChange={(e) =>
                setAddress((address: Address) => ({
                  ...address,
                  postCode: e.target.value,
                }))
              }
            />
          )}
        </div>

        <div className="item">Country :</div>

        <div className="item">
          {readonly ? address.countryCode : <CountrySelector />}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddressForm;
