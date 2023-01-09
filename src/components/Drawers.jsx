import { Avatar, IconButton, Toolbar } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import Person2Icon from "@mui/icons-material/Person2";
import HomeIcon from "@mui/icons-material/Home";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import { loginStatusFalse, logoutAction } from "../action/userAction";
import { useSelector } from "react-redux";

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const drawerWidth = 240;
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const Drawers = (props) => {
  const [open, setOpen] = React.useState(true);
  const {role} = useSelector(state => {
    return{
      role: state.userReducer.role
    }
  })
  const navigate = useNavigate();
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const logOutHandler = () =>{
    localStorage.removeItem('absen_login');
    logoutAction();
    loginStatusFalse();
    navigate('/login', {replace: true})
  }
  return (
    <div>
      <AppBar position="absolute" open={open} color="inherit">
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            {props.data}
          </Typography>

          
            <div className="dropdown">
              <button
                className="btn"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <Avatar />
              </button>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/profile">
                    Profile
                  </Link>
                </li>
                <li>
                  <a className="dropdown-item" onClick={logOutHandler}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
   
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <div className="d-flex flex-column m-4">
          <div style={{ cursor: "pointer" }}>
            <Link to="/">
              <IconButton
                style={{
                  color: "black",
                  borderRadius: "0%",
                  marginLeft: "-10px",
                }}
              >
                <HomeIcon />
                <span
                  style={{
                    marginLeft: "25px",
                    fontWeight: "600",
                    fontSize: "16px",
                    paddingRight: "90px",
                  }}
                >
                  {" "}
                  Home{" "}
                </span>
              </IconButton>
            </Link>
          </div>

          <div style={{ cursor: "pointer", marginTop: "10px" }}>
            <Link to="/attendance">
              <IconButton
                style={{
                  color: "black",
                  borderRadius: "0%",
                  marginLeft: "-10px",
                }}
              >
                <AccessTimeIcon />
                <span
                  style={{
                    marginLeft: "25px",
                    fontWeight: "600",
                    fontSize: "16px",
                    paddingRight: "20px",
                  }}
                >
                  {" "}
                  Attendance List{" "}
                </span>
              </IconButton>
            </Link>
          </div>
          {(role == 'admin') ? <>
          <div style={{ cursor: "pointer", marginTop: "10px" }}>
            <Link to="/student-attendance">
              <IconButton
                style={{
                  color: "black",
                  borderRadius: "0%",
                  marginLeft: "-10px",
                }}
              >
                <Person2Icon />
                <span
                  style={{
                    marginLeft: "25px",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {" "}
                  Students Attendance{" "}
                </span>
              </IconButton>
            </Link>
          </div>
          <div style={{ cursor: "pointer", marginTop: "10px" }}>
            <Link to="/student-registration">
              <IconButton
                style={{
                  color: "black",
                  borderRadius: "0%",
                  marginLeft: "-10px",
                }}
              >
                <PersonAddAltIcon />
                <span
                  style={{
                    marginLeft: "25px",
                    fontWeight: "600",
                    fontSize: "16px",
                  }}
                >
                  {" "}
                  Regis Student{" "}
                </span>
              </IconButton>
            </Link>
          </div>
          </> : ''}
          
        </div>
      </Drawer>
    </div>
  );
};
export default Drawers;
