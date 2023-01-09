import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright(props) {
   
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <a color="inherit" href="https://www.youtube.com/watch?v=BBJa32lCaaY" target="_blank">
          Pegel Linu.inc
        </a>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  export default Copyright;