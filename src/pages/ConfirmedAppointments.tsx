import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { API_URL, UserStateInterface } from "../app/redux/userSlice";
import Avatar from "../components/Avatar";
import NavbarInfo from "../components/NavbarInfo";
import NoAppointment from "../components/NoAppointment";
import "../styles/ConfirmedAppointments.css";

interface Props {
  name?: string;
  age?: number;
  numOfChildren?: number;
  appointmentId?: string;
  status?: string;
  avatar?: string;
  date?: string;
  address?: string;
}

const CustomerCard = ({
  name,
  age,
  numOfChildren,
  appointmentId,
  status,
  address,
  date,
}: Props) => {
  return (
    <div className="ConfirmedCard">
      <Avatar large={false} />
      <div className="ConfirmedCard__info">
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
      <div className="ConfirmedCard__btns">
        <div className="ConfirmedCard__accept">Accepted</div>
      </div>
    </div>
  );
};

const ConfirmedAppointments = () => {
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
    <div className="confirmedAppointments">
      <NavbarInfo nanny />
      <div className="confirmedAppointments__content">
        <h2>Confirmed Appointments</h2>
        {localAppointments &&
          localAppointments
            .filter(
              (appointment: any) =>
                appointment?.babysitter?.id === currentUser?.id &&
                appointment.status === "active"
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
                  appointmentId={appointment?.id}
                  status={appointment?.status}
                  address={appointment?.address}
                  date={appointment?.date}
                />
              );
            })}
        {localAppointments.filter(
          (appointment: any) =>
            appointment?.babysitter?.id === currentUser?.id &&
            appointment?.status === "active"
        ).length === 0 && (
          <NoAppointment message="You have no confirmed appointments" />
        )}
      </div>
    </div>
  );
};

export default ConfirmedAppointments;
