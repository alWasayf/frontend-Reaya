import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { API_URL, UserStateInterface } from "../app/redux/userSlice";
import NannyItem from "../components/NannyItem";
import NavbarInfo from "../components/NavbarInfo";
import NoAppointment from "../components/NoAppointment";
import "../styles/PrevAppointments.css";

const PrevAppointments = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, appointments, isLoading } =
    allState as unknown as UserStateInterface;

  const [localAppointments, setLocalAppointments] = React.useState<any>([]);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const fetchData = async () => {
    const res: any = await axios.get(`${API_URL}/appointment/all/`);
    setLocalAppointments(res.data);
  };
  useEffect(() => {
    // bootstrap data
    fetchData();
  }, []);

  return (
    <div className="prevAppointments">
      <NavbarInfo />
      <div className="prevAppointments__content">
        <h1>Previous Appointments</h1>
        {localAppointments &&
          localAppointments
            ?.filter(
              (appointment: any) =>
                appointment?.individual?.id === currentUser?.id &&
                (appointment.status === "completed" ||
                  appointment.status === "rejected" ||
                  appointment.status === "cancelled")
            )
            ?.map((appointment: any) => {
              // get all appointments of current user
              // filter only the appointments that are status is "done" and "cancelled" and "rejected"

              return (
                <NannyItem
                  key={appointment?.id}
                  appointmentId={appointment?.id}
                  appointmentsNanniesId={appointment?.babysitter?.id}
                  appointmentsIndividualId={appointment?.individual?.id}
                  firstName={appointment?.babysitter?.firstName}
                  lastName={appointment?.babysitter?.lastName}
                  age={appointment?.babysitter?.age}
                  nationality={appointment?.babysitter?.nationality}
                  phoneNumber={appointment?.babysitter?.phoneNumber}
                  skills={appointment?.babysitter?.skills}
                  experience={appointment?.babysitter?.experience}
                  noOfRates={appointment?.babysitter?.noOfRates}
                  totalRates={appointment?.rates}
                  hourlyPrice={appointment?.babysitter?.hourlyPrice}
                  // for prev appointments
                  isReadOnly={false}
                  isRated={appointment?.isRated}
                  status={appointment?.status}
                  avatar={appointment?.babysitter?.avatar}
                  isDeleted={appointment?.babysitter?.isDeleted}
                />
              );
            })}
        {localAppointments?.filter(
          (appointment: any) =>
            appointment?.individual?.id === currentUser?.id &&
            (appointment.status === "completed" ||
              appointment.status === "rejected" ||
              appointment.status === "cancelled")
        ).length === 0 && <NoAppointment />}
      </div>
    </div>
  );
};

export default PrevAppointments;

/*
<NannyItem
          key={currentUser?.id}
          id={currentUser?.id}
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
          isReadOnly={false}
        />
*/
