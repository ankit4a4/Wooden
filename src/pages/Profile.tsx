import React from "react";
import ProfileCard from "../components/Profile/ProfileCard";
// import OrderStatus from "../components/Profile/OrderStatus";
import HistoryTabs from "../components/Profile/HistoryTabs";

const Profile: React.FC = () => {
  return (
    <>
      <ProfileCard />
      <HistoryTabs />
    </>
  );
};

export default Profile;
