import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { restoreSession } from "./app/auth/authSlice";
import { getSessionToken, getSessionUser } from "./utility/token";
import LoadingComponent from "./components/Loading/Loading";
import NotificationBar from "./components/Notification/Notification";
import MBBSPage from "./components/Section/Programs/MBBS";
import BPharmacyPage from "./components/Section/Programs/B_PHARMA";
import BScNursingPage from "./components/Section/Programs/BSC_NURSING";
import PGMDMSPage from "./components/Section/Programs/PGMD";
import GNMPage from "./components/Section/Programs/GNM";
import ProgramsPage from "./components/Section/Programs";
import FAQPage from "./components/Section/Faq/Faq";
import Lead from "./components/Leads/Lead";

const Footer = React.lazy(() => import("./components/Section/Footer/Footer"));
const Header = React.lazy(() => import("./components/Section/Header/Header"));
const RegisterPage = React.lazy(
  () => import("./components/Section/Register/Register")
);
const LoginPage = React.lazy(() => import("./components/Section/Login/Login"));
const Home = React.lazy(() => import("./components/Home/Home"));
const Main = React.lazy(() => import("./components/Admin/Main"));
const AdminAcessRequest = React.lazy(
  () => import("./components/Admin/AdminAcessRequest")
);
const AboutUs = React.lazy(
  () => import("./components/Section/AboutUs/AboutUs")
);
const ContactUs = React.lazy(
  () => import("./components/Section/ContactUs/ContactUS")
);
const UserDashboard = React.lazy(() => import("./components/User/Main"));

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = getSessionToken();
    const user = getSessionUser();
    if (token && user) {
      // Dispatch an action to restore the user session
      dispatch(
        restoreSession({
          user: user.user,
          token: token,
          isLoading: false,
          error: "",
          isAuthenticated: true,
        })
      );
    }
  }, [dispatch]);

  return (
    <Router>
      <React.Suspense fallback={<LoadingComponent />}>
        <Routes>
          <Route path="/*" element={<GeneralRoute />} />
          <Route path="/user/*" element={<PublicRoute />} />
          <Route path="/admin/*" element={<PrivateRoute />} />
        </Routes>
      </React.Suspense>
    </Router>
  );
};

const GeneralRoute: React.FC = () => (
  <React.Fragment>
    <Header />
    <NotificationBar
      message="Applications for starting of New PG Medical courses and Increase of seats in PG Medical 
courses for Academic Year: 2024-25!"
      link="https://www.nmc.org.in/MCIRest/open/getDocument?path=/Documents/Public/Portal/LatestNews/Colleges%20concerned-%20Regarding-2.pdf"
    />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="mbbs" element={<MBBSPage />} />
      <Route path="bpharmacy" element={<BPharmacyPage />} />
      <Route path="bscnursing" element={<BScNursingPage />} />
      <Route path="pgmdms" element={<PGMDMSPage />} />
      <Route path="programs" element={<ProgramsPage />} />
      <Route path="gnm" element={<GNMPage />} />
      <Route path="contactUs" element={<ContactUs />} />
      <Route path="aboutUs" element={<AboutUs />} />
      <Route path="faq" element={<FAQPage />} />
    </Routes>
    <Footer />
  </React.Fragment>
);

const PublicRoute: React.FC = () => (
  <React.Fragment>
    <Header />
    <Routes>
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="dashboard" element={<UserDashboard />} />
    </Routes>
    <Footer />
  </React.Fragment>
);
const PrivateRoute: React.FC = () => {
  const token = getSessionToken();
  const user = getSessionUser();
  if (token && user && user?.user.role === "admin") {
    return (
      <React.Fragment>
        <Routes>
          <Route path="/dashboard" element={<Main />} />
          <Route path="/leads" element={<Lead />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    console.log("Access denied - Not authenticated or not admin");
    return <AdminAcessRequest />;
  }
};

export default App;
