import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { createNannyAsync, UserStateInterface } from "../app/redux/userSlice";
import Logo from "../images/logo.png";
import "../styles/SignupNanny.css";

interface IForm {
  age: number;
  firstName: string;
  hourlyPrice: number;
  lastName: string;
  nationality: string;
  phoneNumber: string;
  skills: string;
  experience: number;
}

const SignupNanny = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, isIndividual, isLoggedIn } =
    allState as unknown as UserStateInterface;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [formData, setFormData] = useState<IForm>({
    age: 0,
    experience: 0,
    firstName: "",
    hourlyPrice: 0,
    lastName: "",
    nationality: "",
    phoneNumber: "",
    skills: "",
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
    // const { password } = formData;
    e.preventDefault();

    dispatch(createNannyAsync(formData));
    console.table(formData);
    navigate("/login");
  };

  return (
    <div className="signinNanny">
      <div className="signinNanny__box">
        <Link to="/">
          <button className="backButton" type="submit">
            back home
          </button>
        </Link>

        <div className="signinNanny__logo">
          <img src={Logo} alt="logo" />
        </div>
        <form onSubmit={handleSubmit} className="signinNanny__form">
          <div className="signinNanny__inputs">
            <div className="signinNanny__left">
              <input
                name="firstName"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="text"
                placeholder="First name"
              />
              <input
                name="lastName"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="text"
                placeholder="Last name"
              />
              <input
                name="age"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="number"
                placeholder="Age"
              />
              <input
                name="nationality"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="text"
                placeholder="Nationality"
              />
            </div>
            <div className="signinNanny__right">
              <input
                name="skills"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="text"
                placeholder="Skills"
              />
              <input
                name="hourlyPrice"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="number"
                placeholder="Hourly price by SAR"
              />
              <input
                name="phoneNumber"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="tel"
                placeholder="Phone number"
              />
              <input
                name="experience"
                onChange={onChange}
                className="signinNanny__input"
                required
                type="number"
                placeholder="Years of experience"
              />
            </div>
          </div>
          <p className="passwordError">{error}</p>
          <button className="backButton" type="submit">
            Sign up
          </button>
          <div className="signinNanny__more">
            <p>
              You have account? <Link to="/login">Login</Link>
            </p>
            <p>
              Sign Up as a customer? <Link to="/Signup">Sign-up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupNanny;
