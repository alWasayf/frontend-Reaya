import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { API_URL, UserStateInterface } from "../app/redux/userSlice";
import Avatar from "../components/Avatar";
import NavbarInfo from "../components/NavbarInfo";
import NoAppointment from "../components/NoAppointment";
import "../styles/NannyAppointments.css";

interface Props {
  name: string;
  age: number;
  numOfChildren: number;
  address: string;
  appointmentId: string;
  status: string;
  avatar?: string;
  date?: string;
}

const CustomerCard = ({
  name,
  numOfChildren,
  address,
  appointmentId,
  status,
  avatar,
  date,
}: Props) => {
  const acceptHandler = async () => {
    try {
      const data = Object.assign(
        {},
        {
          appointmentId,
          status: "active",
        }
      );

      const res: any = await axios.put(`${API_URL}/appointment/update/`, data);
      console.log("res", res.data);

      // eslint-disable-next-line no-restricted-globals
      location.reload();

      return res.data;
    } catch (error: any) {
      console.log(" error.message", error);
    }
  };

  const rejectHandler = async () => {
    try {
      const data = Object.assign(
        {},
        {
          appointmentId,
          status: "rejected",
        }
      );

      const res: any = await axios.put(`${API_URL}/appointment/update/`, data);
      console.log("res", res.data);

      // eslint-disable-next-line no-restricted-globals
      location.reload();

      return res.data;
    } catch (error: any) {
      console.log(" error.message", error);
    }
  };

  return (
    <div className="CustomerCard">
      <Avatar link={avatar} large={false} />
      <div className="CustomerCard__info">
        <h1>{name}</h1>
        <p>
          <strong>Address: </strong>
          {address}
        </p>
        <p>
          <strong>Number Of Children: </strong>
          {numOfChildren}
        </p>
        <p>
          <strong>Date: </strong>
          {date}
        </p>
      </div>
      <div className="CustomerCard__btns">
        <div onClick={acceptHandler} className="CustomerCard__accept">
          accept
        </div>
        <div onClick={rejectHandler} className="CustomerCard__reject">
          reject
        </div>
      </div>
    </div>
  );
};

const NannyAppointments = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, appointments, isLoading } =
    allState as unknown as UserStateInterface;
  const navigate = useNavigate();

  const [localAppointments, setLocalAppointments] = React.useState<any>([]);

  const fetchData = async () => {
    const res: any = await axios.get(`${API_URL}/appointment/all/`);
    setLocalAppointments(res.data);
  };
  useEffect(() => {
    // bootstrap data
    fetchData();
  }, []);

  return (
    <div className="nannyAppointments">
      <NavbarInfo nanny />
      <div className="nannyAppointments__content">
        <h2>Pending Requests</h2>

        {localAppointments &&
          localAppointments
            .filter(
              (appointment: any) =>
                appointment?.babysitter?.id === currentUser?.id &&
                appointment.status === "pending"
            )
            .map((appointment: any) => {
              return (
                <CustomerCard
                  name={
                    appointment?.individual?.firstName +
                    " " +
                    appointment?.individual?.lastName
                  }
                  age={appointment?.babysitter?.age}
                  numOfChildren={appointment?.numOfChildren}
                  address={appointment?.address}
                  appointmentId={appointment?.id}
                  status={appointment?.status}
                  avatar={appointment?.individual?.avatar}
                  date={appointment?.date}
                />
              );
            })}

        {localAppointments.filter(
          (appointment: any) =>
            appointment?.babysitter?.id === currentUser?.id &&
            appointment.status === "pending"
        ).length === 0 && (
          <div className="nannyAppointments__no-appointments">
            <NoAppointment message="No pending requests" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NannyAppointments;
