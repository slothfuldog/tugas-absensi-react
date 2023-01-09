import { Input, InputAdornment, IconButton, Button } from "@mui/material";
import { useState } from "react";
import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction, loginStatus } from "../action/userAction";

const Login = (props) => {
  const URL = 'http://localhost:3200';
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {auth} = useSelector(state => state.userReducer.auth)
  const [showPassword, setShowPassword] = useState(false);
  const [nis, setNis] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [heights, setHeight] = useState('0px')
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const getData = async () =>{
    try{
      const res = await axios.get(URL + '/user', {params: {
        nis: nis, password: password
      }});
      if(res.data.result.length > 0){
        console.log(res.data.result[0])
        dispatch(loginStatus())
        dispatch(loginAction(res.data.result[0]));
        console.log(res.data)
        localStorage.setItem('absen_login', JSON.stringify(res.data.result[0]));
        navigate('/', {replace: true})
      }else{
        setHeight('40px')
      }
    }
    catch(err){
      console.log(err)
    }
  }
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <div>
      
      <div
        className="w-50 shadow bg-light d-flex flex-column justify-content-center"
        style={{ margin: "40px auto" }}
      >
        <div style={{ margin: "70px" }}>
          <h1>Login</h1>
          <p id="login-notification" className="text-white d-flex flex-column justify-content-center" style={{paddingLeft: "10px",backgroundColor: "red", fontWeight: "600", height: heights, transition: "all 0.5s ease-in-out"}}>Username or password is wrong</p>
          <p className="mt-3">NIS</p>
          <Input
            autoComplete="NIS"
            margin="normal"
            required
            fullWidth
            autoFocus
            size="small"
            style={{ marginTop: "-5px" }}
            onChange= {e => setNis(e.target.value)}
          />
          <p className="mt-4">Password</p>
          <Input
            onChange={e => setPassword(e.target.value)}
            size="small"
            id="standard-adornment-password"
            fullWidth
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                >
                  {!showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
          <Button
            variant="contained"
            fullWidth
            style={{ margin: "40px 0 40px 0" }}
            onClick={getData}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
