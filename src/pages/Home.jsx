import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Drawers from "../components/Drawers";
import Times from "../components/Time";
import { useSelector } from "react-redux";


function DashboardContent() {
  const [clock, setClock] = React.useState(new Date().toLocaleTimeString());
  const [date, setDate] = React.useState(
    new Date().toISOString().substring(0, 10)
  );
  const {fullname, auth} = useSelector(state => {
    return {
      fullname: state.userReducer.fullname,
      auth: state.userReducer.auth
    }
  })
  React.useEffect(() => {
    setInterval(() => {
      setClock(new Date().toLocaleTimeString());
      setDate(new Date().toISOString().substring(0, 10));
    }, 1000);
  }, []);

  return (
      <Box sx={{ display: "flex" }}>
      <Drawers data="Home"/>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h1>Welcome, {fullname}</h1>
                  <h4>How are you doing today?</h4>
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 240,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                ><Times /></Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
  );
}

export default function Home() {
  return <DashboardContent />;
}
