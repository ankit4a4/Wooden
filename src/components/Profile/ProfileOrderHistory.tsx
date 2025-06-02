import React, { useState, useEffect } from "react";
import { useGetOrderHistoryQuery } from "../../store/Features/ProfileOrderHistory/OrderHistory";
import styles from "../../Style/Profile/ProfileOrderHistory.module.css";
import AddReviewPopUp from "./AddReviewPopUp";
import ReturnPopUp from "./ReturnPopUp";
import Loader from "../../utils/Loader";
import OrderViewPopUp from "./OrderViewPopUp";

const ProfileOrderHistory: React.FC = () => {
  // State for popups and pagination
  const [openAddReview, setOpenAddReview] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);
  const [openViewModal, setOpenViewModal] = useState({
    isOpen: false,
    orderId: "",
    status: "",
  });
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    if (openAddReview || openReturn) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [openAddReview, openReturn]);

  // Fetch order history with pagination
  const { data, error, isLoading } = useGetOrderHistoryQuery({
    page: currentPage,
    perPage: itemsPerPage,
  });

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error fetching order history</div>;
  }

  const totalPages = data?.totalPages || 1;

  const handleReturn = (orderId: string) => {
    setSelectedOrderId(orderId);
    setOpenReturn(true);
  };

  const handleViewOrder = (id: string, status: string) => {
    setOpenViewModal({
      isOpen: true,
      orderId: id,
      status,
    });
    setOrderId(id);
  };

  // Utility function to check if 3 days have passed since a given date
  const isWithinThreeDays = (deliveryDate: string) => {
    const currentDate = new Date();
    const deliveredDate = new Date(deliveryDate);
    const differenceInTime = currentDate.getTime() - deliveredDate.getTime();
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);
    return differenceInDays <= 7;
  };

  // formate the date
  function formatToIndianDate(isoDate: string) {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  return (
    <>
      <div className={styles.SelectedPage1}>
        <h1>Your Order History</h1>
        {data?.productOrders?.map((order: any) => (
          <div key={order._id} className={styles.dataDiv_allAddress}>
            <button
              onClick={() => handleViewOrder(order?._id, "view")}
              className={styles.historyViewButton}
            >
              View Order
            </button>

            <button
              className={styles.historyUpperBtn}
              onClick={() => handleViewOrder(order?._id, "review")}
            >
              Add Review
            </button>

            {order?.orderStatus === "delivered" &&
              !isWithinThreeDays(order.deliveryDate) && (
                <button
                  className={styles.historyLowerBtn}
                  onClick={() => handleReturn(order?._id)}
                >
                  Return
                </button>
              )}

            <p>
              <span>Order Id:</span> {order?.OrderId}
            </p>
            <p>
              <span>Order Date:</span> {order?.date}
            </p>
            <p>
              <span>Total Price:</span> {order?.totalPrice.toFixed(2)}
            </p>
            <p>
              <span>Remaining Price:</span> {order?.amountRemaining.toFixed(2)}
            </p>
            <p>
              <span>Amount Paid:</span> {order?.amountPaid.toFixed(2)}
            </p>

            <p>
              <span>Payment Mode:</span> {order?.paymentMode}
            </p>
            <p>
              <span>Order status:</span> {order?.orderStatus}
            </p>
            <p>
              <span>Delivered Date:</span>{" "}
              {formatToIndianDate(order?.deliveredData)}
            </p>
          </div>
        ))}

        {openReturn && selectedOrderId && (
          <ReturnPopUp
            orderId={selectedOrderId}
            close={() => {
              setOpenReturn(false);
              setSelectedOrderId(null);
            }}
          />
        )}

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
      </div>
      {openViewModal.isOpen && (
        <OrderViewPopUp
          onClose={() =>
            setOpenViewModal({ isOpen: false, orderId: "", status: "" })
          }
          id={orderId}
          status={openViewModal.status}
        />
      )}

      {openAddReview && (
        <AddReviewPopUp
          productId={selectedOrderId}
          closepopup={() => setOpenAddReview(false)}
        />
      )}
    </>
  );
};

export default ProfileOrderHistory;
