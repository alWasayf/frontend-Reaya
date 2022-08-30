import React from "react";

function NoAppointment({ message = "You have no appointments." }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <h3
        style={{
          color: "gray",
          fontSize: "1.5rem",
        }}
      >
        <br />
        {message}
        <br />
      </h3>
    </div>
  );
}

export default NoAppointment;
