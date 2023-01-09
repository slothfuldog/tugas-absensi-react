import { Box } from "@mui/material"
import Drawers from "../components/Drawers";

const LoggedInNotFound = () =>{
    return(
        <div>
            <Box sx={{display: "flex"}}>
                <Drawers />
                <Box
          component="main"
          sx={{
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
            <h1>404 Not Found</h1>
        </Box>
            </Box>
        </div>
    )
}

export default LoggedInNotFound;