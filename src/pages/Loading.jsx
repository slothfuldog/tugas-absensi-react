import { Box, CircularProgress } from "@mui/material";
import Drawers from "../components/Drawers";

const Loading = (props) => {
  return (
    <div>
      <Box sx={{ display: "flex", backgroundColor: "rgba(60,60,60,0.5)",flexDirection: "column", justifyContent: "center", alignItems: "center", height:"100vh" }}>
        <CircularProgress color="secondary"  sx={{opacity: "1"}}/>
      </Box>
    </div>
  );
};

export default Loading;
