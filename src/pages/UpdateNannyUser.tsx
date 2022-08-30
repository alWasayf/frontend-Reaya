/* eslint-disable no-restricted-globals */
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  API_URL,
  setCurrentUser,
  UserStateInterface,
} from "../app/redux/userSlice";
import NavbarInfo from "../components/NavbarInfo";
import "../styles/UpdateNannyUser.css";

interface IForm {
  firstName?: string;
  hourlyPrice?: number;
  lastName?: string;
  nationality?: string;
  phoneNumber?: string;
  skills?: string;
  experience?: number;
  age?: number;
  avatar?: string;
}

const UpdateNannyUser = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, isIndividual } =
    allState as unknown as UserStateInterface;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<IForm>({
    firstName: currentUser?.firstName,
    hourlyPrice: currentUser?.hourlyPrice,
    lastName: currentUser?.lastName,
    nationality: currentUser?.nationality,
    phoneNumber: currentUser?.phoneNumber,
    skills: currentUser?.skills,
    experience: currentUser?.experience,
    age: currentUser?.age,
    avatar: currentUser?.avatar,
  });

  const onChange = (e: { target: { name: any; value: any } }) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res: any = await axios.put(`${API_URL}/babysitter/update/`, {
        id: currentUser?.id,
        firstName: formData.firstName,
        hourlyPrice: formData.hourlyPrice,
        lastName: formData.lastName,
        nationality: formData.nationality,
        phoneNumber: formData.phoneNumber,
        skills: formData.skills,
        experience: formData.experience,
        age: formData.age,
        avatar: formData.avatar,
      });

      dispatch(setCurrentUser(res?.data?.user));
      console.log("🚀 ~ res", res.data);

      return res.data;
    } catch (error: any) {
      console.log("🚀 ~ error", error);
    }

    // navigate to profile for nani
    // navigate("/nanny/profile");
  };

  return (
    <div className="updateNannyUser">
      <NavbarInfo nanny />
      <div className="updateNannyUser__content">
        <h2>Update information</h2>
        <form onSubmit={handleSubmit} className="updateNannyUser__form">
          <div className="updateNannyUser__inputs">
            <div className="updateNannyUser__left">
              <input
                name="firstName"
                onChange={onChange}
                value={formData.firstName}
                className="updateNannyUser__input"
                type="text"
                placeholder="First name"
              />
              <input
                name="lastName"
                onChange={onChange}
                value={formData.lastName}
                className="updateNannyUser__input"
                type="text"
                placeholder="Last name"
              />
              <input
                name="hourlyPrice"
                onChange={onChange}
                value={formData.hourlyPrice}
                className="updateNannyUser__input"
                type="number"
                placeholder="hourly Price"
              />
              <input
                name="nationality"
                onChange={onChange}
                value={formData.nationality}
                className="updateNannyUser__input"
                type="text"
                placeholder="Nationality"
              />
            </div>
            <div className="updateNannyUser__right">
              <input
                name="skills"
                onChange={onChange}
                className="updateNannyUser__input"
                value={formData.skills}
                type="text"
                placeholder="Skills"
              />
              <input
                name="experience"
                onChange={onChange}
                className="updateNannyUser__input"
                value={formData.experience}
                type="number"
                placeholder="Hourly price"
              />
              <input
                name="phoneNumber"
                onChange={onChange}
                value={formData.phoneNumber}
                className="updateNannyUser__input"
                type="tel"
                placeholder="Phone number"
              />
              <input
                name="age"
                onChange={onChange}
                value={formData.age}
                className="updateNannyUser__input"
                type="number"
                placeholder="your age"
              />
            </div>
          </div>
          <input
            name="avatar"
            onChange={onChange}
            value={formData.avatar}
            className="updateNannyUser__input"
            type="usl"
            placeholder="Put an avatar url"
          />
          <button
            style={{
              cursor: "pointer",
            }}
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateNannyUser;
