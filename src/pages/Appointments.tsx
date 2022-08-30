import axios from "axios";
import React, { useEffect } from "react";
import { useAppSelector } from "../app/hooks";
import { API_URL, UserStateInterface } from "../app/redux/userSlice";
import Avatar from "../components/Avatar";
import NavbarInfo from "../components/NavbarInfo";
import NoAppointment from "../components/NoAppointment";
import "../styles/Appointments.css";

interface CardProps {
  name: string;
  national: string;
  age: number;
  hPrice: number;
  status: string;
  mode?: string;
  appointmentId?: string;
  avatar?: string;
  isDeletable?: boolean;
  date?: string;
}

const AppointmentCard = ({
  name,
  national,
  age,
  hPrice,
  status,
  mode = "normal",
  appointmentId,
  avatar,
  isDeletable = false,
  date,
}: CardProps) => {
  const cancelHandler = async () => {
    // all available states are:
    // "pending", "active", "rejected", "cancelled", "done"
    try {
      const data = Object.assign(
        {},
        {
          appointmentId,
          status: "cencelled",
        }
      );

      const res: any = await axios.put(`${API_URL}/appointment/update/`, data);
      console.log("res", res.data);

      // eslint-disable-next-line no-restricted-globals
      location.reload();

      return res.data;
    } catch (error: any) {
      console.log("error", error);
    }
  };

  const doneHandler = async () => {
    // all available states are:
    // "pending", "active", "rejected", "cancelled", "done"
    try {
      const data = Object.assign(
        {},
        {
          appointmentId,
          status: "completed",
        }
      );

      const res: any = await axios.put(`${API_URL}/appointment/update/`, data);
      console.log("res", res.data);

      // eslint-disable-next-line no-restricted-globals
      location.reload();

      return res.data;
    } catch (error: any) {
      console.log("error.message", error);
    }
  };

  const deleteHandler = async () => {
    // all available states are:
    // "pending", "active", "rejected", "cancelled", "done"
    try {
      const data = Object.assign(
        {},
        {
          appointmentId,
          status: "deleted",
        }
      );

      const res: any = await axios.put(`${API_URL}/appointment/update/`, data);
      console.log("res", res.data);

      // eslint-disable-next-line no-restricted-globals
      location.reload();

      return res.data;
    } catch (error: any) {
      console.log("error.message", error);
    }
  };

  const renderAppointment = () => {
    switch (status) {
      case "pending":
        return (
          <div className="appointmentCard">
            <Avatar link={avatar} large={false} />
            <div className="appointmentCard__info">
              <h1>{name}</h1>
              <p>
                <strong>Nationality: </strong>
                {national}
              </p>
              <p>
                <strong>Age: </strong>
                {age}
              </p>
              <p>
                <strong>Hourly price: </strong>
                {hPrice} SAR
              </p>
              <p>
                <strong>Date: </strong>
                {date}
              </p>
            </div>
            <div className="appointmentCard__btns">
              <div onClick={cancelHandler} className="appointmentCard__btn">
                Cancel
              </div>
              <div className="appointmentCard__status">status: {status}</div>
            </div>
          </div>
        );
      case "active":
        return (
          <div className="appointmentCard">
            <Avatar link={avatar} large={false} />
            <div className="appointmentCard__info">
              <h1>{name}</h1>
              <p>
                <strong>Nationality: </strong>
                {national}
              </p>
              <p>
                <strong>Age: </strong>
                {age}
              </p>
              <p>
                <strong>Hourly price: </strong>
                {hPrice} SAR
              </p>
              <p>
                <strong>Date: </strong>
                {date}
              </p>
            </div>
            <div className="appointmentCard__btns">
              <div
                onClick={doneHandler}
                style={{ backgroundColor: "#00b300" }}
                className="appointmentCard__btn green__hover"
              >
                Done
              </div>
              {isDeletable && (
                <div onClick={deleteHandler} className="appointmentCard__btn">
                  Delete
                </div>
              )}
              <div
                style={{
                  backgroundColor: "#8ec59c",
                }}
                className="appointmentCard__status"
              >
                status: {status}
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return <>{renderAppointment()}</>;
};

const Appointments = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser } = allState as unknown as UserStateInterface;

  const [localAppointments, setLocalAppointments] = React.useState<any>([]);

  const fetchData = async () => {
    const res: any = await axios.get(`${API_URL}/appointment/all/`);
    setLocalAppointments(res.data);
    console.log("Appointments", localAppointments);
  };

  useEffect(() => {
    // bootstrap data
    fetchData();
  }, []);

  return (
    <div className="appoinments">
      <NavbarInfo />
      <div className="appoinments__content">
        {/* <h1>Appointments</h1> */}

        {localAppointments &&
          localAppointments
            ?.filter(
              (appointment: any) =>
                appointment?.individual?.id === currentUser?.id &&
                ((appointment?.status === "pending" &&
                  !appointment?.babysitter?.isDeleted) ||
                  appointment.status === "active")
            )
            ?.map((appointment: any) => {
              // check if the appointment is active and the current user is the individual

              return (
                <AppointmentCard
                  key={appointment?.id}
                  name={
                    appointment?.babysitter?.firstName +
                    " " +
                    appointment?.babysitter?.lastName
                  }
                  national={appointment?.babysitter?.nationality}
                  age={appointment?.babysitter?.age}
                  hPrice={appointment?.babysitter?.hourlyPrice}
                  status={appointment?.status}
                  appointmentId={appointment?.id}
                  avatar={appointment?.babysitter?.avatar}
                  isDeletable={appointment?.babysitter?.isDeleted}
                  date={appointment?.date}
                />
              );
            })}
        {localAppointments?.filter(
          (appointment: any) =>
            appointment?.individual?.id === currentUser?.id &&
            (appointment.status === "pending" ||
              appointment.status === "active")
        ).length === 0 && <NoAppointment />}
      </div>
    </div>
  );
};

export default Appointments;

/*
individual: ""
isRated: false
numOfChildren: "2"

id: "0WI0wRZaumDNrGtG3jv9"
status: "pending"

babysitter: ""
  name
  date: "12/08/2022"
  Age
  Hourly price
*/
