import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "sassy-datepicker";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  bookAppointmentAsync,
  UserStateInterface,
} from "../app/redux/userSlice";
import NavbarInfo from "../components/NavbarInfo";
import "../styles/AddNanny.css";
interface Props {
  name?: string;
  national?: string;
  rate?: number;
  age?: number;
  hPrice?: number;
  id?: string;
  skills?: string;
}

const AddNanny = ({ name, national, rate, age, hPrice, id, skills }: Props) => {
  const allState = useAppSelector((state) => state);
  const { currentUser, currentNanny } =
    allState as unknown as UserStateInterface;

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [numOfChildren, setNumOfChildren] = useState<string>("");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [navigate, currentUser]);

  const onChange = (newDate: React.SetStateAction<Date>) => {
    console.log(`New date selected - ${newDate.toString()}`);
    setDate(newDate);
  };

  const handleBookAppointment = async () => {
    const toBeBooked = Object.assign(
      {},
      {
        date: date.toLocaleDateString(),
        individualId: currentUser.id,
        babysitterId: currentNanny.id,
        address: currentUser.address,
        numOfChildren,
      }
    );
    await dispatch(bookAppointmentAsync(toBeBooked));
  };

  return (
    <div className="addNanny">
      <NavbarInfo />
      <div className="addNanny__content">
        <div className="addNanny__info">
          <div className="addNanny__top">
            <div className="addNanny__top-left">
              <h1>{currentNanny.firstName + " " + currentNanny.lastName}</h1>
              <p>
                <strong>Nationality: </strong>
                {currentNanny.nationality}
              </p>
              <p>
                <strong>Age: </strong>
                {currentNanny.age}
              </p>
              <p>
                <strong>Hourly price: </strong>
                {currentNanny.hourlyPrice} SAR
              </p>
              <p>
                <strong>Skills: </strong>
                {currentNanny.skills}
              </p>
              <p>
                <strong>Experience: </strong>
                {currentNanny.experience} Years
              </p>
              <p>
                <strong>Number of rates: </strong>
                {currentNanny.noOfRates}
              </p>
              <p>
                <strong>Total rates: </strong>
                {currentNanny.totalRates}
              </p>

              <div className="yourOrder__container">
                <h1>You book info:</h1>
                <p>
                  <strong>Date: </strong>
                  {date.toLocaleDateString()}
                </p>

                <p>
                  <strong>Childs: </strong>
                  {numOfChildren}
                </p>
              </div>
            </div>

            <div className="addNanny__top-right">
              <h1>Avaliable in:</h1>
              <div className="addNanny__dates">
                <DatePicker onChange={onChange} selected={date} />{" "}
              </div>
              <div className="addNanny__children">
                <span>Number of children</span>
                <input
                  type="number"
                  onChange={(e) => setNumOfChildren(e.target.value)}
                  value={numOfChildren}
                />
              </div>
            </div>
          </div>  <button
            onClick={handleBookAppointment}
            disabled={!numOfChildren}
            className="addNanny__btn"
          >
           <Link id="add_btn" to={"/settings/appointments"}>    Add appointment</Link>
        
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default AddNanny;
