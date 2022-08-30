import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { UserStateInterface } from "../app/redux/userSlice";
import NannyItem from "../components/NannyItem";
import NavbarInfo from "../components/NavbarInfo";
import "../styles/Nanny.css";

const Nanny = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, babysitters, isLoading } =
    allState as unknown as UserStateInterface;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [navigate, user]);

  return (
    <div className="nanny">
      <NavbarInfo nanny />
      <div className="nanny__content">
        <h2>profile</h2>
        <NannyItem
          isLink={false}
          key={currentUser?.id}
          nanniesId={currentUser?.id}
          age={currentUser?.age}
          firstName={currentUser?.firstName}
          lastName={currentUser?.lastName}
          nationality={currentUser?.nationality}
          phoneNumber={currentUser?.phoneNumber}
          skills={currentUser?.skills}
          experience={currentUser?.experience}
          noOfRates={currentUser?.noOfRates}
          totalRates={currentUser?.totalRates}
          hourlyPrice={currentUser?.hourlyPrice}
          avatar={currentUser?.avatar}
          status={""}
        />
        <div className="nanny__btnContainer">
          <Link className="nanny__btn" to="/nanny/profile/edit">
            Edit profile
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Nanny;
