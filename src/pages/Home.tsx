import React from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { UserStateInterface } from "../app/redux/userSlice";
import Navbar from "../components/Navbar";
import "../styles/Home.css";

const Home = () => {
  const allState = useAppSelector((state) => state);
  const { currentUser } = allState as unknown as UserStateInterface;

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (user) {
  //     navigate("/home/explore");
  //   }
  // }, [navigate, user]);

  return (
    <div className="home">
      <Navbar />
      <div className="home__content">
      <motion.div initial="hidden" animate="visible" variants={{
  hidden: {
    scale: .8,
    opacity: 0
  },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: .6
    }
  },
}}>
        <div className="home__box">
          <p>
            Are you looking for a nanny..!
            <br />
            We offer a child care service
          </p>
        </div>
        </motion.div>
        
        <span>Total peace of mind 💜</span>
      </div>
    </div>
  );
};

export default Home;
