import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import {
  useGetAddressesQuery,
  useDeleteAllAddressesMutation,
  useUpdateAddressMutation,
} from "../../store/Features/profile/AllAddressSlice";
import styles from "../../Style/Profile/ProfileAdress.module.css";
import AddressEditPopUp from "./AddressEditPopUp";
import Loader from "../../utils/Loader";
import { toast } from "react-toastify";

const ProfileAdress: React.FC = () => {
  const [openAddress, setOpenAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // functionality for stop scrolling when edit popup is open
  useEffect(() => {
    if (openAddress) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openAddress]);

  const { data, error, isLoading } = useGetAddressesQuery({
    page: currentPage,
    perPage: itemsPerPage,
  });

  const [updateAddress] = useUpdateAddressMutation();
  const [deleteAddress, { isLoading: isDeleting }] =
    useDeleteAllAddressesMutation();

  if (isLoading) {
    return (
      <p>
        {" "}
        <Loader />
      </p>
    );
  }

  if (error) return <p>Error loading addresses</p>;

  const addresses = data?.data || [];
  const totalAddresses = data?.totalAddresses || 0;
  const totalPages = Math.ceil(totalAddresses / itemsPerPage); // Calculate total pages

  const handleDelete = async (id: string) => {
    try {
      await deleteAddress(id).unwrap();
      toast.success("Address deleted successfully");
    } catch (err) {
      toast.error("Failed to delete address");
      console.error("Error occurred during address deletion", err);
    }
  };

  const handleEditAddress = (address: any) => {
    setSelectedAddress(address);
    setOpenAddress(true);
  };

  const handleUpdateAddress = async (updatedData: any) => {
    if (selectedAddress) {
      try {
        await updateAddress({
          id: selectedAddress._id,
          data: updatedData,
        }).unwrap();
        setOpenAddress(false);
      } catch (err) {
        console.error("Error occurred during address update", err);
      }
    }
  };

  return (
    <div className={styles.SelectedPage}>
      <h1>Addresses</h1>
      {addresses.map((item: any, index: number) => (
        <div key={item._id || index} className={styles.dataDiv_allAddress}>
          <div className={styles.icons_div}>
            <MdEdit
              onClick={() => handleEditAddress(item)}
              className={styles.update_icon}
            />
            <MdDeleteForever
              onClick={() => handleDelete(item._id)}
              className={styles.delete_icon}
            />
          </div>
          <p>
            <strong>Full Name:</strong> {item.firstName} {item.lastName}
          </p>
          <p>
            <strong>Address:</strong> {item.address || "N/A"}
          </p>
          <p>
            <strong>City:</strong> {item.city || "N/A"}
          </p>
          <p>
            <strong>State:</strong> {item.state || "N/A"}
          </p>
          <p>
            <strong>Country:</strong> {item.country || "N/A"}
          </p>
          <p>
            <strong>Phone:</strong> {item.phone || "N/A"}
          </p>
          <p>
            <strong>Pin Code:</strong> {item.pinCode || "N/A"}
          </p>
          <hr />
        </div>
      ))}

      {isDeleting && <div className={styles.loaderContainer}></div>}

      {/* Pagination Controls */}
      <div className={styles.pagination}>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {openAddress && (
        <AddressEditPopUp
          close={() => setOpenAddress(false)}
          handleSave={handleUpdateAddress}
          address={selectedAddress}
        />
      )}
    </div>
  );
};

export default ProfileAdress;
