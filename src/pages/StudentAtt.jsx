import { Box, Container, Grid, Paper, Toolbar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import Drawers from "../components/Drawers";
import StudentTable from "../components/StudentTable";

const StudentAtt = (props) => {
  const URL = 'http://localhost:3200';
  const [data, setData] = useState([]);
  const getData = async () => {
    try{
      const res = await axios.get(URL + '/user/students-attendance');
      setData(res.data.result);
    }
    catch(err){

    }
  };
  const sortAttHandler = (e) =>{
    if(e.target.value != 'Sort'){
      const values = e.target.value;
      const splittedVal = values.split(' ');
      const row = splittedVal[0];
      const first = splittedVal[1];
      axios.get(URL + `/user/sort`, {params: {
        row: row,
        first: first
      }}).then(res => setData(res.data.result)).catch()
    }
    }
  const renderTable = () =>{
    return data.map(val => {
      return <StudentTable student={val} key="check" />
    })
  }
  useEffect(() =>{
    getData();
  },[])
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawers data="Students Attendance"/>
        <Box component="main"
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}>
            <Toolbar />
          <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
            <Grid container spacing={3}>
              <Grid item xs={12} lg={12} md={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <table className="table" >
                    <thead>
                      <tr>
                        <th scope="col">Date</th>
                        <th scope="col">NIS</th>
                        <th scope="col">Fullname</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Check In</th>
                        <th scope="col">Check Out</th>
                        <th scope="col">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {renderTable()}
                    </tbody>
                  </table>
                  <div>
                    <select className="form-select" style={{width: "20%"}} onChange={sortAttHandler}>
                      <option value="Sort"> SORT</option>
                      <option value="nis asc"> NIS ASC</option>
                      <option value="nis desc"> NIS DESC</option>
                      <option value="fullname asc"> NAME ASC</option>
                      <option value="fullname desc"> NAME DESC</option>
                      <option value="date asc"> DATE ASC</option>
                      <option value="date desc"> DATE DESC</option>
                    </select>
                  </div>
                </Paper> 
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </div>
  );
};
export default StudentAtt;
