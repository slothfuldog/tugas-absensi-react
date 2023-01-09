import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Toolbar,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Drawers from "../components/Drawers";
import Times from "../components/Time";
import UserTableAtt from "../components/UserTableAttendance";

const Attendance = (props) => {
  const URL = "http://localhost:3200/user";
  const {id_user, nis} = useSelector(state => {
    return{
      id_user: state.userReducer.id_user,
    nis: state.userReducer.nis}})
  const [currentDate, setDate] = useState(new Date().toLocaleDateString());
  const [hours, setHours] = useState(
    parseInt(new Date().toLocaleTimeString().substring(0, 2))
  );
  const [minutes, setMinutes] = useState(
    parseInt(new Date().toLocaleTimeString().substring(3, 5))
  );
  const [statuses, setStatus] = useState("");
  const [attData, setData] = useState([]);
  const checkInHandler = () => {
    const hour = parseInt(new Date().toLocaleTimeString().substring(0, 2));
    const minute = parseInt(new Date().toLocaleTimeString().substring(3, 5));
    let status = "";
    let dates = [];
    attData.forEach((val) => {
      dates.push(val.date);
    });

    if (hour < 7 || hour == 7 && minute < 5) {
      status = "On-Time (Check-in)";
    } else {
      status = "Late (Check-in)";
    }
    let text = "You want to check in now?";
    if (dates.includes(new Date().toLocaleDateString())) {
      alert("You have checked in today");
    } else {
      if (window.confirm(text) == true && status != "") {
        axios
          .post(URL + `/students-attendance/${id_user}`, {
            date: currentDate,
            check_in: new Date().toLocaleTimeString(),
            check_out: `-`,
            status,
          })
          .then((res) => {
            alert("You have successfully checked-in!");
            getAttendance();
          })
          .catch();
      } else {
        alert("sheesh");
      }
    }
  };
  const checkOutHandler = () => {
    let dates = new Date().toLocaleDateString();
    let currentData = attData.filter((val) => val.date == dates);
    if (currentData[0].check_out == `-`) {
      const hour = parseInt(new Date().toLocaleTimeString().substring(0, 2));
      const minute = parseInt(new Date().toLocaleTimeString().substring(3, 5));
      let status = "";
      if (hour > 16 && currentData[0].status == "On-Time (Check-in)") {
        status = "On-Time";
      } else if (hour < 16 && currentData[0].status == "On-Time (Check-in)") {
        status = "Early";
      } else if (hour > 16 && currentData[0].status == "Late (Check-in)") {
        status = "Late";
      } else {
        status = "Late Early";
      }
      const text = window.confirm("Are you sure that you want to check out now?");
      if (text == true && status != "") {
        axios
          .patch(URL + `/students-attendance/${id_user}`, {
            check_out: new Date().toLocaleTimeString(),
            status,
          })
          .then((res) => {
            alert("You have successfully checked-out!");
            getAttendance();
          })
          .catch(err => alert(err));
      } else {
        alert("You are not checking out!");
      }
    } else {
      alert("You already checked out today!");
    }
  };
  const getAttendance = async () => {
    try {
      const res = await axios.get(URL + `/students-attendance/${id_user}`);
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const renderTable = () => {
    if (attData != null) {
      return attData.map((val) => {
        return <UserTableAtt data={val} key={val.check_in_id} />;
      });
    }
  };
  useEffect(() => {
    getAttendance();
  }, []);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawers data="Attendance List" />
        <Box
          component="main"
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 300,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Times />
                  <Stack spacing={21} direction="row">
                    <Button
                      variant="contained"
                      style={{ padding: "5px 25px", fontWeight: "700" }}
                      onClick={checkInHandler}
                    >
                      Check in
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      style={{ fontWeight: "700" }}
                      onClick={checkOutHandler}
                    >
                      Check Out
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 340,
                  }}
                >
                  <h5 className="fw-bold">Your Attendance</h5>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">Check In</th>
                        <th scope="col">Check Out</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>{renderTable()}</tbody>
                  </table>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};
export default Attendance;
