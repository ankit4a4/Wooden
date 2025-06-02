import { useEffect, useState } from "react";
import { useGetAddressesQuery } from "../../store/Features/profile/AllAddressSlice";
import style from "../../Style/CheckOut/address.module.css";
import { setAddress, setIsOpen } from "../../store/Features/Shared/Utils";
import { useDispatch } from "react-redux";
import { Address } from "../../store/Features/profile/AllAddressSlice";
import Loader from "../../utils/Loader";
import { RxCross1 } from "react-icons/rx";
interface AddressOfUserProps {
  onClose: () => void;
}

const AddressOfUser: React.FC<AddressOfUserProps> = ({ onClose }) => {
  const dispatch = useDispatch();
  const { data, isSuccess, isError, isLoading } = useGetAddressesQuery({
    page: 1,
    perPage: 15,
  });
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [isAddress, setIsAddress] = useState<Address | null>(null);

  if (isLoading) return <Loader />;
  if (isError) return <p>Failed to load addresses</p>;

  const handleSelect = (value: Address) => {
    setSelectedAddress(value._id);
    setIsAddress(value);
  };

  const handleSubmit = () => {
    if (isAddress) {
      dispatch(setAddress(isAddress));
      dispatch(setIsOpen(true));
      onClose();
    }
  };

  // for not scroll the background
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={style.popupOverlay}>
      <div className={style.popupContent}>
        <button className={style.closePopupButton} onClick={onClose}>
          <RxCross1 size={18}/>
        </button>
        {isSuccess && data?.data?.length > 0 ? (
          <div className={style.addressContainer}>
            {data?.data?.map((address) => (
              <div
                key={address._id}
                className={`${style.address_card} ${
                  selectedAddress === address._id ? style.selected : ""
                }`}
              >
                <div className={style.left_field}>
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress === address._id}
                    onChange={() => handleSelect(address)}
                  />
                </div>
                <div className={style.right_field}>
                  <p>
                    <strong>First Name:</strong> {address.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {address.lastName}
                  </p>
                  <p>
                    <strong>Phone:</strong> {address.phone}
                  </p>
                  <p>
                    <strong>Address:</strong> {address.address}
                  </p>
                  <p>
                    <strong>City:</strong> {address.city}
                  </p>
                  <p>
                    <strong>State:</strong> {address.state}
                  </p>
                  <p>
                    <strong>Pin Code:</strong> {address.pinCode}
                  </p>
                  <p>
                    <strong>Country:</strong> {address.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No addresses found</p>
        )}
        <button onClick={handleSubmit} className={style.selectAddressButton}>
          select
        </button>
      </div>
    </div>
  );
};

export default AddressOfUser;
