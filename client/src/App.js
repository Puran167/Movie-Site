import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import MovieDetails from "./pages/MovieDetails";
import SeatBooking from "./pages/SeatBooking";
import DashboardPage from "./pages/DashboardPage";
import MyBookings from "./pages/MyBookings";
import Receipt from "./pages/Receipt";
import WelcomePage from "./pages/WelcomePage";
import Navbar from "./components/Navbar";

const Layout = () => {
  const location = useLocation();

  const hideNavbarRoutes = ["/", "/login", "/signup", "/register"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/movies" element={<HomePage />} />
        <Route path="/movies/:id" element={<MovieDetails />} />
        <Route path="/book/:movieId" element={<SeatBooking />} />
        <Route path="/book/:movieId/:showTime" element={<SeatBooking />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/receipt/:bookingId" element={<Receipt />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
