import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  createIndividualAsync,
  UserStateInterface,
} from "../app/redux/userSlice";
import Logo from "../images/logo.png";
import "../styles/Signup.css";

interface IForm {
  firstName: string;
  lastName: string;
  numOfChild: string;
  phoneNumber: string;
  address: string;
}

const Signup = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, isIndividual, isLoggedIn } =
    allState as unknown as UserStateInterface;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState<IForm>({
    firstName: "",
    lastName: "",
    numOfChild: "",
    phoneNumber: "",
    address: "",
  });

  React.useEffect(() => {
    if (currentUser?.firstName === undefined && isLoggedIn) {
      // if type is nanny and not full data
      // navigate("/nanny/profile/edit");
      // if type is user and not full data
      // navigate("/user/profile/edit");
      if (isIndividual) {
        navigate("/user/profile/edit");
      } else {
        navigate("/nanny/profile/edit");
      }
    } else if (isLoggedIn) {
      // if type is nanny and full data
      // navigate("/nanny/profile");
      // if type is user and full data
      // navigate("/home/explore");

      if (isIndividual) {
        navigate("/home/explore");
      } else {
        navigate("/nanny/profile");
      }
    }
  }, []);

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    dispatch(createIndividualAsync(formData));
    console.table(formData);
    navigate("/login");
  };

  return (
    <div className="signin">
      <div className="signin__box">
        <Link to="/">
          <button className="backButton" type="submit">
            back home
          </button>
        </Link>
        <div className="signin__logo">
          <img src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit} className="signin__form">
          <div className="signin__input">
            <p>First name</p>
            <input name="firstName" onChange={onChange} required type="text" />
          </div>
          <div className="signin__input">
            <p>Last name</p>
            <input name="lastName" onChange={onChange} required type="text" />
          </div>
          <div className="signin__input">
            <p>Number of child</p>
            <input name="numOfChild" onChange={onChange} required type="text" />
          </div>
          <div className="signin__input">
            <p>Phone number</p>
            <input
              name="phoneNumber"
              onChange={onChange}
              required
              type="text"
            />
          </div>
          <div className="signin__input">
            <p>Address</p>
            <input name="address" onChange={onChange} required type="text" />
          </div>
          <p className="passwordError">{error}</p>
          <button type="submit">Sign up</button>
          <div className="signin__more">
            <p>
              You have account? <Link to="/login">Login</Link>
            </p>
            <p>
              Looking for a nanny job?{" "}
              <Link to="/Signup/nanny">Sign-up as nanny</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
