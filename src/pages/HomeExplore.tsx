import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  API_URL,
  Babysitter,
  UserStateInterface,
} from "../app/redux/userSlice";
import NannyItem from "../components/NannyItem";
import NavbarInfo from "../components/NavbarInfo";
import NoAppointment from "../components/NoAppointment";
import "../styles/HomeExplore.css";

const HomeExplore = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser, babysitters, isLoading } =
    allState as unknown as UserStateInterface;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [nannies, setNannies] = React.useState([]) as any;

  // filter nannies by nationality
  const [searchVal, setSearchVal] = React.useState("");
  const [filteredNannies, setFilteredNannies] = React.useState([]) as any;

  useEffect(() => {
    let fetchNannies = async () => {
      const res: any = await axios.get(`${API_URL}/babysitter/all/`);
      setNannies(res.data);
      setFilteredNannies(res.data);
    };

    fetchNannies();
  }, []);

  useEffect(() => {
    // filter comming nannies by nationality
    const filteredArray = nannies.filter((nanny: any) => {
      return nanny.nationality.toLowerCase().includes(searchVal);
    });

    setFilteredNannies(filteredArray);
  }, [searchVal]);

  return (
    <div className="homeExplore">
      <NavbarInfo
        mode="Search"
        searchVal={searchVal}
        setSearchVal={setSearchVal}
      />
      <div className="homeExplore__content">
        {!isLoading && filteredNannies && filteredNannies.length > 0 ? (
          filteredNannies.map((nanny: Babysitter) => {
            console.log("🚀 ~ nanny", nanny);

            return (
              <NannyItem
                key={nanny?.id}
                nanniesId={nanny?.id}
                age={nanny?.age}
                firstName={nanny?.firstName}
                lastName={nanny?.lastName}
                nationality={nanny?.nationality}
                phoneNumber={nanny?.phoneNumber}
                skills={nanny?.skills}
                experience={nanny?.experience}
                noOfRates={nanny?.noOfRates}
                totalRates={nanny?.totalRates}
                hourlyPrice={nanny?.hourlyPrice}
                status={""}
                avatar={nanny?.avatar}
              />
            );
          })
        ) : (
          <NoAppointment message="No nannies found" />
        )}
      </div>
    </div>
  );
};

export default HomeExplore;
