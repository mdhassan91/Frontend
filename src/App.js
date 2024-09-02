import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserHomePage from "./pages/UserHomePage";
import ManagerHomePage from "./pages/ManagerHomePage";
import MovieSellerHomePage from "./pages/MovieSellerHomePage";
import EventManagerHomePage from "./pages/EventManagerHomePage";
import SuperAdminHomePage from "./pages/SuperAdminHomePage";
import ViewAll from "./pages/ViewAll";
import Navbar from "./components/Navbar";
import AuthenticationPage from "./pages/AuthenticationPage";
import UserProfile from "./pages/UserProfile";
import NotFound from "./pages/NotFound";
import MovieDetails from "./pages/MovieDetail";
import SeatSelection from "./pages/SeatSelection";
import EventDetail from "./pages/EventDetail";
import BookingConfirmation from "./pages/BookingConfirmation";
import AddMovie from "./pages/movie-seller/AddMovie";
import UpdateMovie from "./pages/movie-seller/UpdateMovie";
import MovieDashboard from "./pages/movie-seller/MovieDashboard";
import UpdateInfo from "./pages/movie-seller/UpdateInfo";
import MovieSellerNavbar from "./pages/movie-seller/movie-components/MovieSellerNavbar";
import MovieSellerProfile from "./pages/movie-seller/MovieSellerProfile";
import EventManagerNavbar from "./pages/event-manager/EventManagerNavbar";
import EventManagerProfile from "./pages/event-manager/EventManagerProfile";
import UpdateEventUserInfo from "./pages/event-manager/UpdateEventUserInfo";
import AddEvent from "./pages/event-manager/AddEvent";
import UpdateEvent from "./pages/event-manager/UpdateEvent";
import EventDashboard from "./pages/event-manager/EventDashboard";
import ManagerNavbar from "./pages/manager/components/ManagerNavbar";
import ManagerDashboard from "./pages/manager/ManagerDashboard";
import ManagerProfile from "./pages/manager/ManagerProfile";
import AddUser from "./pages/manager/AddUser";
import UpdateUser from "./pages/manager/UpdateUser";
import SuperAdminNavbar from "./pages/super-admin/super-admin-component/SuperAdminNavbar";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import AddManager from "./pages/super-admin/AddManager";
import UpdateManager from "./pages/super-admin/UpdateManager";
import SuperAdminProfile from "./pages/super-admin/SuperAdminProfile";

import axios from "axios";
import SeatSelectionEvent from "./pages/SeatSelectionEvent";

const App = () => {
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [movies, setMovies] = useState([]);
  const [activities, setActivities] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (role && user) {
      axios
        .get("http://localhost:8000/event?all=true")
        .then((response) => {
          const data = response.data.data;
          const movies = data.filter((event) => event.eventType === "movie");
          const activities = data.filter(
            (event) => event.eventCategory === "activity"
          );
          const events = data.filter((event) => event.eventType === "event");

          setMovies(movies);
          setActivities(activities);
          setEvents(events);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [role, user]);

  const handleLogin = (userRole, userDetails) => {
    setRole(userRole);
    setUser(userDetails);
    localStorage.setItem("role", userRole);
    localStorage.setItem("user", JSON.stringify(userDetails));
  };

  const handleSignup = (userRole) => {
    setRole(userRole);
  };

  const handleLogout = () => {
    setRole("");
    setUser(null);
    localStorage.clear();
  };

  const PrivateRoute = ({ children, allowedRole }) => {
    if (!role) {
      return <Navigate to="/login" />;
    }
    return role === allowedRole ? children : <Navigate to="/login" />;
  };

  const renderRoutesForRole = (role) => {
    switch (role) {
      case "user":
        return (
          <>
            <Navbar handleLogout={handleLogout} />
            <Routes>
              <Route
                path="/user-home"
                element={
                  <UserHomePage
                    onLogout={handleLogout}
                    movies={movies}
                    setMovies={setMovies}
                    events={events}
                    setEvents={setEvents}
                  />
                }
              />
              <Route path="/view-all/:category" element={<ViewAll />} />
              <Route
                path="/profile"
                element={<UserProfile user={user} onLogout={handleLogout} />}
              />
              <Route path="/update-info" element={<UpdateInfo user={user} />} />
              <Route
                path="/event/:id"
                element={<EventDetail events={events} user={user} />}
              />
              <Route
                path="/movie/:id"
                element={<MovieDetails movies={movies} />}
              />
              <Route
                path="/booking/:id/:day/:time"
                element={<SeatSelection user={user} />}
              />
              <Route
                path="/booking-event/:id/:showtime"
                element={<SeatSelectionEvent user={user} />}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </>
        );
      case "movie-seller":
        return (
          <>
            <MovieSellerNavbar />
            <Routes>
              <Route
                path="/movie-seller-home"
                element={<MovieSellerHomePage onLogout={handleLogout} />}
              />
              <Route path="/add-movie" element={<AddMovie user={user} />} />
              <Route path="/update-movie/:id" element={<UpdateMovie />} />
              <Route path="/dashboard" element={<MovieDashboard />} />
              <Route
                path="/profile-seller"
                element={<MovieSellerProfile user={user} />}
              />
            </Routes>
          </>
        );
      case "event-manager":
        return (
          <>
            <EventManagerNavbar />
            <Routes>
              <Route
                path="/event-manager-home"
                element={<EventManagerHomePage onLogout={handleLogout} />}
              />
              <Route path="/add-event" element={<AddEvent user={user} />} />
              <Route path="/update-event/:id" element={<UpdateEvent />} />
              <Route path="/event-dashboard" element={<EventDashboard />} />
              <Route
                path="/profile-event-seller"
                element={<EventManagerProfile user={user} />}
              />
              <Route
                path="/update-info-event-user"
                element={<UpdateEventUserInfo user={user} />}
              />
            </Routes>
          </>
        );
      case "manager":
        return (
          <>
            <ManagerNavbar />
            <Routes>
              <Route
                path="/manager-home"
                element={
                  <ManagerHomePage onLogout={handleLogout} manager={user} />
                }
              />
              <Route path="/manager-dashboard" element={<ManagerDashboard />} />
              <Route
                path="/profile-manager"
                element={<ManagerProfile user={user} />}
              />
              <Route path="/add-user" element={<AddUser manager={user} />} />
              <Route path="/update-user/:id" element={<UpdateUser />} />
            </Routes>
          </>
        );
      case "super-admin":
        return (
          <>
            <SuperAdminNavbar />
            <Routes>
              <Route
                path="/super-admin-home"
                element={
                  <SuperAdminHomePage
                    onLogout={handleLogout}
                    superAdmin={user}
                  />
                }
              />
              <Route
                path="/event-dashboard"
                element={<SuperAdminDashboard />}
              />
              <Route
                path="/add-manager"
                element={<AddManager superAdmin={user} />}
              />
              <Route path="/update-manager/:id" element={<UpdateManager />} />
              <Route
                path="/admin-profile"
                element={<SuperAdminProfile user={user} />}
              />
            </Routes>
          </>
        );
      default:
        return <Navigate to="/authenticate" />;
    }
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} user={user} />}
        />
        <Route
          path="/signup"
          element={<SignupPage onSignup={handleSignup} user={user} />}
        />
        <Route
          path="/authenticate"
          element={
            <AuthenticationPage
              onLogin={handleLogin}
              user={user}
              onSignup={handleSignup}
            />
          }
        />
        <Route path="*" element={renderRoutesForRole(role)} />
      </Routes>
    </Router>
  );
};

export default App;
