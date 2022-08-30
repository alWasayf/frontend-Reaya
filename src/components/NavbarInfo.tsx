import axios from "axios";
import { deleteUser, getAuth } from "firebase/auth";
import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { API_URL, logout, UserStateInterface } from "../app/redux/userSlice";
import useDebounce from "../hooks/useDebounce";
import Logo from "../images/logo.png";
import "../styles/NavbarInfo.css";
import Avatar from "./Avatar";

const NavbarInfo = ({
  nanny,
  searchVal = "",
  setSearchVal,
  mode = "normal",
}: any) => {
  const allState = useAppSelector((state) => state);
  const { currentUser } = allState as unknown as UserStateInterface;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [localSearchVal, setLocalSearchVal] = useState("");
  const debouncedValue = useDebounce<string>(localSearchVal, 500);

  const isSearchMode = mode === "Search";

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleChangeSearch = (e: any) => {
    setLocalSearchVal(e.target.value.toLowerCase().trim());
  };

  const handleDeleteAccountBabysitter = async () => {
    const auth = getAuth();
    const user: any = auth.currentUser;

    console.log("🚀 ~ delete account", user);

    deleteUser(user)
      .then(() =>
        axios
          .post(`${API_URL}/babysitter/delete/`, {
            id: currentUser?.id,
          })
          .then(() => {
            console.log("🚀 ~ user deleted");
            dispatch(logout());
            navigate("/login");
          })
      )
      .catch((error) => {
        console.log("🚀 ~ error", error);
      });
  };

  React.useEffect(() => {
    isSearchMode && setSearchVal(debouncedValue);
  }, [debouncedValue, setSearchVal]);

  return (
    <div className="navbarInfo">
      <Link
        to={nanny ? "/signup" : "/home/explore"}
        className="navbarInfo__logo"
      >
        <img src={Logo} alt="logo" />
      </Link>
      {isSearchMode && (
        <div className="navbarInfo__search">
          <input
            onChange={handleChangeSearch}
            type="text"
            placeholder="Search.."
          />
        </div>
      )}
      <div className="navbarInfo__right">
        <Avatar link={currentUser?.avatar} large={false} />
        <p>Hi, {currentUser?.firstName}</p>
        <BsThreeDots onClick={() => setIsOpen(!isOpen)} />
        {isOpen &&
          (nanny ? (
            <div className="navbarInfo__drop">
              <p onClick={() => navigate("/nanny/appointments")}>
                Appointments
              </p>
              <p onClick={() => navigate("/nanny/confirmedAppointments")}>
                Confirmed Appointments
              </p>
              <p
                style={{
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={handleDeleteAccountBabysitter}
              >
                Delete Account
              </p>
              <p onClick={handleLogout}>Logout</p>
            </div>
          ) : (
            <div className="navbarInfo__drop">
              <p onClick={() => navigate("/settings")}>Settings</p>
              <p
                style={{
                  cursor: "pointer",
                  color: "red",
                }}
                onClick={handleLogout}
              >
                Delete Account
              </p>

              <p onClick={handleLogout}>Logout</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default NavbarInfo;
