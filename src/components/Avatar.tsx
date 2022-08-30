import React from "react";
import "../styles/Avatar.css";

interface Props {
  large?: boolean;
  link?: string;
}

const Avatar = ({ large, link }: Props) => {
  return (
    <>
      {link ? (
        <img
          alt="avatar"
          src={link}
          className="avatar"
          style={
            large
              ? { width: "80px", height: "80px" }
              : { width: "50px", height: "50px" }
          }
        />
      ) : (
        <div
          className="avatar"
          style={
            large
              ? { width: "80px", height: "80px" }
              : { width: "50px", height: "50px" }
          }
        ></div>
      )}
    </>
  );
};

export default Avatar;
