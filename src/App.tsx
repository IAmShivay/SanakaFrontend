import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { restoreSession } from "./app/auth/authSlice";
import { getSessionToken, getSessionUser } from "./utility/token";
import LoadingComponent from "./components/Loading/Loading";
import NotificationBar from "./components/Notification/Notification";

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
      message="This is a continuous notification message!"
      link="www.google.com"
    />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="contactUs" element={<ContactUs />} />
      <Route path="aboutUs" element={<AboutUs />} />
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
  console.log("PrivateRoute check - token:", token, "user:", user);
  console.log(user?.isAuthenticated);
  if (token && user && user?.user.role === "admin") {
    return (
      <Routes>
        <Route path="dashboard" element={<Main />} />
      </Routes>
    );
  } else {
    console.log("Access denied - Not authenticated or not admin");
    return <AdminAcessRequest />;
  }
};

export default App;
