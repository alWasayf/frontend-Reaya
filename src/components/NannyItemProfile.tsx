import Icon from "@uiw/react-icon";
import Rate from "@uiw/react-rate";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  API_URL,
  setCurrentNanny,
  UserStateInterface,
} from "../app/redux/userSlice";

import "../styles/NannyItemProfile.css";
import Avatar from "./Avatar";

interface Props {
  age?: number;
  firstName?: string;
  hourlyPrice?: number;
  lastName?: string;
  nationality?: string;
  phoneNumber?: string;
  skills?: string;
  experience?: number;
  isPhoneVerified?: boolean;
  noOfRates?: number;
  totalRates?: number;

  // for home explore
  nanniesId?: string;
  avatar?: string;
  // for prev
  isReadOnly?: boolean;
  isRated?: boolean;
  status: string;
  appointmentId?: string;
  appointmentsNanniesId?: string;
  appointmentsIndividualId?: string;

  // for nanny profile
  isLink?: boolean;
}

const NannyItem = ({
  appointmentId,
  age,
  nanniesId,
  appointmentsNanniesId,
  firstName,
  lastName,
  nationality,
  phoneNumber,
  skills,
  experience,
  noOfRates,
  totalRates = 0,
  hourlyPrice,
  isReadOnly = true,
  isRated,
  status,
  avatar,
  isLink = true,
}: Props) => {
  const allState = useAppSelector((state) => state);
  const { currentUser } = allState as unknown as UserStateInterface;

  const [rate, setRate] = React.useState(totalRates);

  const dispatch = useAppDispatch();

  const handleNannyClick = () => {
    dispatch(
      setCurrentNanny({
        id: nanniesId,
        age,
        firstName,
        hourlyPrice,
        lastName,
        nationality,
        phoneNumber,
        skills,
        experience,
        noOfRates,
        totalRates,
      })
    );
  };

  const handleNannyRate = async (rate: any) => {
    setRate(rate);
    const data = Object.assign(
      {},
      {
        appointmentId: String(appointmentId),
        nannyId: String(appointmentsNanniesId),
        rate: rate,
      }
    );
    console.log("🚀 ~ data", data);

    try {
      const res = await axios.post(`${API_URL}/babysitter/rate/`, data);
      console.log("🚀 ~ res", res.data);
    } catch (error: any) {
      console.log("🚀 ~ error", error.response.data);
    }
  };

  const color = status === "completed" ? "#73a873" : "#ff6b6b";

  const isRatable = status === "completed" && !isRated;

  return (
    <>
      {isLink ? (
        <>
          {isReadOnly ? (
            <Link
              to="/bookAppointment"
              className="nannyItem"
              onClick={handleNannyClick}
            >
              <Avatar link={avatar} large={false} />
              <div className="nannyItem__info">
                <h1>
                  {firstName} {lastName}
                </h1>
                <p>Nationality: {nationality}</p>
                {<p>Age: {age}</p>}
                <p>Skills: {skills}</p>
                <p>experience: {experience} Year</p>
                <p>Hourly price: {hourlyPrice} SAR</p>
              </div>

              <Rate
                character={<Icon type="star-on" />}
                style={{
                  color: "#f5a623",
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                value={totalRates}
                readOnly={isReadOnly}
              />
            </Link>
          ) : (
            <div className="nannyItem">
              <Avatar link={avatar} large={false} />
              <div className="nannyItem__info">
                <h1>
                  {firstName} {lastName}
                </h1>
                <p>Nationality: {nationality}</p>
                {/* <p>Age: {age}</p> */}
                <p>Hourly price: {hourlyPrice}$</p>
                <p>experience: {experience} Year</p>
              </div>
              <div className="appointmentCard__btns">
                <Rate
                  character={<Icon type="star-on" />}
                  style={{
                    color: "#f5a623",
                    fontSize: "1.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={rate}
                  onChange={handleNannyRate}
                  readOnly={!isRatable}
                />
                <div
                  className="appointmentCard__status"
                  style={{
                    backgroundColor: color,
                    color: "white",
                  }}
                >
                  status: {status}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <>
          {isReadOnly ? (
            <div className="nannyItem" onClick={handleNannyClick}>
              <Avatar link={avatar} large={false} />
              <div className="nannyItem__info">
                <h1>
                  {firstName} {lastName}
                </h1>
                <p>Nationality: {nationality}</p>
                {<p>Age: {age}</p>}
                <p>Skills: {skills}</p>
                <p>experience: {experience} Year</p>
                <p>Hourly price: {hourlyPrice} SAR</p>
              </div>

              <Rate
                character={<Icon type="star-on" />}
                style={{
                  color: "#f5a623",
                  fontSize: "1.5rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                value={totalRates}
                readOnly={isReadOnly}
              />
            </div>
          ) : (
            <div className="nannyItem">
              <Avatar link={avatar} large={false} />
              <div className="nannyItem__info">
                <h1>
                  {firstName} {lastName}
                </h1>
                <p>Nationality: {nationality}</p>
                {/* <p>Age: {age}</p> */}
                <p>Hourly price: {hourlyPrice}$</p>
                <p>experience: {experience} Year</p>
              </div>
              <div className="appointmentCard__btns">
                <Rate
                  character={<Icon type="star-on" />}
                  style={{
                    color: "#f5a623",
                    fontSize: "1.5rem",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  value={rate}
                  readOnly={!isRatable}
                />
                <div
                  className="appointmentCard__status"
                  style={{
                    backgroundColor: color,
                    color: "white",
                  }}
                >
                  status: {status}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default NannyItem;
