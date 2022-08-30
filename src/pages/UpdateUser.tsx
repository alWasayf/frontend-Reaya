import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  API_URL,
  setCurrentUser,
  UserStateInterface,
} from "../app/redux/userSlice";
import "../styles/UpdateUser.css";
import NavbarInfo from "./../components/NavbarInfo";

interface IForm {
  firstName?: string;
  lastName?: string;
  numOfChild?: number;
  phoneNumber?: string;
  address?: string;
}

const UpdateUser = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser } = allState as unknown as UserStateInterface;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<IForm>({
    firstName: currentUser?.firstName,
    lastName: currentUser?.lastName,
    numOfChild: currentUser?.numOfChild,
    phoneNumber: currentUser?.phoneNumber,
    address: currentUser?.address,
  });

  console.log(formData);

  // useEffect(() => {
  // if (!user) {
  //   navigate("/");
  // }
  // }, [navigate, user]);

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res: any = await axios.put(`${API_URL}/individual/update/`, {
        id: currentUser?.id,
        firstName: formData.firstName,
        lastName: formData.lastName,
        numOfChild: formData.numOfChild,
        phoneNumber: formData.phoneNumber,
        address: formData.address,
      });

      dispatch(setCurrentUser(res.data.user));
    } catch (error) {
      console.log("🚀 ~ error", error);
    }
  };

  return (
    <div className="updateUser">
      <NavbarInfo />
      <div className="updateUser__content">
        <form onSubmit={handleSubmit} className="updateUser__form">
          <h1>Edit your profile</h1>
          <div className="updateUser__input">
            <p>First name</p>
            <input
              placeholder={currentUser?.firstName}
              name="firstName"
              onChange={onChange}
              value={formData.firstName}
              type="text"
            />
          </div>
          <div className="updateUser__input">
            <p>Last name</p>
            <input
              placeholder={currentUser?.lastName}
              name="lastName"
              onChange={onChange}
              value={formData.lastName}
              type="text"
            />
          </div>
          <div className="updateUser__input">
            <p>Number of child</p>
            <input
              placeholder="Enter number of child"
              name="numOfChild"
              onChange={onChange}
              value={formData.numOfChild}
              type="number"
            />
          </div>
          <div className="updateUser__input">
            <p>Phone number</p>
            <input
              placeholder={currentUser?.phoneNumber}
              name="phoneNumber"
              onChange={onChange}
              value={formData.phoneNumber}
              type="tel"
            />
          </div>
          <div className="updateUser__input">
            <p>Address</p>
            <input
              placeholder="Enter address"
              name="address"
              value={formData.address}
              onChange={onChange}
              type="text"
            />
          </div>
        
          <button
            style={{
              cursor: "pointer",
            }}
            type="submit"
          >
            <Link id="save_btn" to={"/home/explore"}> Save</Link>
           
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
