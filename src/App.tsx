import { onAuthStateChanged } from "firebase/auth";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { auth } from "./app/firebase";

// -------
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { logout, UserStateInterface } from "./app/redux/userSlice";
import AddNanny from "./pages/AddNanny";
import Appointments from "./pages/Appointments";
import ConfirmedAppointments from "./pages/ConfirmedAppointments";
import Home from "./pages/Home";
import HomeExplore from "./pages/HomeExplore";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Nanny from "./pages/Nanny";
import NannyAppointments from "./pages/NannyAppointments";
import PrevAppointments from "./pages/PrevAppointments";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import SignupNanny from "./pages/SignupNanny";
import UpdateNannyUser from "./pages/UpdateNannyUser";
import UpdateUser from "./pages/UpdateUser";

function App() {
  const dispatch = useAppDispatch();
  const allState = useAppSelector((state) => state);
  const { isLoading } = allState as unknown as UserStateInterface;

  React.useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if (userAuth) {
        // user is logged in, send the user's details to redux, store the current user in the state
        // dispatch(
        //   login({
        //     email: userAuth.email,
        //     uid: userAuth.uid,
        //     displayName: userAuth.displayName,
        //     photoUrl: userAuth.photoURL,
        //   })
        console.log("🚀 ~ userAuth", userAuth);

        // );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  return (
    <div className="app">
      <BrowserRouter>
        {isLoading ? (
          <Loading />
        ) : (
          <Routes>
            {/* Auth */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signup/nanny" element={<SignupNanny />} />

            {/* Individual */}
            <Route path="/home/explore" element={<HomeExplore />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/user/profile/edit" element={<UpdateUser />} />
            <Route path="/settings/appointments" element={<Appointments />} />
            <Route
              path="/settings/prevAppointments"
              element={<PrevAppointments />}
            />

            {/* Nanny */}
            <Route path="/bookAppointment" element={<AddNanny />} />
            <Route path="/nanny/profile" element={<Nanny />} />
            <Route path="/nanny/profile/edit" element={<UpdateNannyUser />} />
            <Route path="/nanny/appointments" element={<NannyAppointments />} />

            <Route
              path="/nanny/confirmedAppointments"
              element={<ConfirmedAppointments />}
            />
          </Routes>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
