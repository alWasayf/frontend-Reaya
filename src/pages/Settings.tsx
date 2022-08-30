import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { logout } from "../app/redux/userSlice";
import NavbarInfo from "../components/NavbarInfo";
import "../styles/Settings.css";

const Settings = () => {
  const state = useAppSelector((state) => state);
  const user = {
    firstName: "string",
    lastName: "string",
    numOfChild: "string",
    phoneNumber: "string",
    password: "string",
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("user");
  };

  return (
    <div className="settings">
      <NavbarInfo />
      <div className="settings__content">
        <Link className="settings__option" to="/settings/prevAppointments">
          previous appointments
        </Link>
        <Link className="settings__option" to="/settings/appointments">
          appointments
        </Link>
        <Link className="settings__option" to="/user/profile/edit">
          update information
        </Link>
        <span onClick={handleLogout} className="settings__option">
          delete account
        </span>
      </div>
    </div>
  );
};

export default Settings;
