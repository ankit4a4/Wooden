import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home.tsx";
import About from "./pages/AboutUs.tsx";
import Header from "./components/Layout/Header.tsx";
import Footer from "./components/Layout/Footer.tsx";
import ContactUs from "./pages/ContactUs.tsx";
import TermsAndCondition from "./pages/TermsAndCondition.tsx";
import Product from "./pages/Product.tsx";
import SingleProduct from "./pages/SingleProduct.tsx";
import Cart from "./pages/Cart.tsx";
import WishList from "./pages/WishList.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CheckOut from "./pages/CheckOut.tsx";
import Successfully from "./components/Successfully/Successfully.tsx";
import { ToastContainer } from "react-toastify";
import Address from "./components/Profile/Address.tsx";
import ResetPassword from "./components/Profile/ResetPassword.tsx";
import Gallery from "./pages/Gallery.tsx";
import Profile from "./pages/Profile.tsx";
import Search from "./components/searchData/Search.tsx";
import PrivacyPolicyPage from "./pages/PrivacyPolicyPage.tsx";
import ReturnPolicyPage from "./pages/ReturnPolicyPage.tsx";
import SelectedSubCategory from "./components/product/SelectedSubCategory.tsx";
import HomeAllCollection from "./components/Home/HomeAllCollection.tsx";
import ProtectedRoute from "./utils/ProtectedRoute.tsx";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<About />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/termsandcondition" element={<TermsAndCondition />} />
          <Route path="/product" element={<Product />} />
          <Route path="/singleproduct/:id" element={<SingleProduct />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<WishList />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/successfully" element={<Successfully />} />
          <Route path="/address" element={<Address />} />
          <Route path="/resetPassword" element={<ResetPassword />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/profile-router" element={<ProtectedRoute> <Profile />  </ProtectedRoute>} />
          <Route path="/search" element={<Search />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicyPage />} />
          <Route path="/returnPolicy" element={<ReturnPolicyPage />} />
          <Route path="/subCategory" element={<SelectedSubCategory />} />
          <Route path="/AllCollection" element={<HomeAllCollection />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
