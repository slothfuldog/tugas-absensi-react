import { fontWeight } from "@mui/system";
import React, { useEffect } from "react";

const Times = (props) => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    const day = new Date().getDay();
    const dates = new Date().getDate();
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "Jule",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
  const [clock, setClock] = React.useState(new Date().toLocaleTimeString());
  const [date, setDate] = React.useState(
    `${days[day]}, ${months[month]} ${dates}, ${year}`
  );
  const [currentDates, setDates] = React.useState(
    new Date().toLocaleDateString()
  );
  useEffect(() => {
    setInterval(() => {
      updateDate();
      setDates(new Date().toLocaleDateString())
    }, 1000);
  }, []);
  const updateDate = () => {
    setClock(new Date().toLocaleTimeString());
    
    const currentDate = `${days[day]}, ${months[month]} ${dates}, ${year}`;
    setDate(currentDate);
  };
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
        <div
        style={{
          fontSize: "18px",
          fontWeight: "600",
          marginBottom: "-20px",
          textAlign: "center"
        }}
      >
        <p>{date}</p>
      </div>
      <div
        className="d-flex flex-row justify-content-center align-items-center"
        style={{ fontSize: "58px" , color: "lightgrey", fontWeight: "600"}}
      >
        <p>{clock}</p>
      </div>
      
    </div>
  );
};

export default Times;
