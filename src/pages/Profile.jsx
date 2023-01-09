import { Avatar, Box, Button, ButtonGroup } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Drawers from "../components/Drawers";
import {BsFillCalendar2WeekFill} from "react-icons/bs";
import axios from "axios";
import { loginAction, loginStatus } from "../action/userAction";
import { useNavigate } from "react-router-dom";

const Profile = (props) => {
    const URL = 'http://localhost:3200/user';
    const dispatch = useDispatch();
    const navigate = useNavigate();
  const [temporaryPass, setPassword] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const {
    id_user,
    nis,
    fullname,
    email,
    nomor_hp,
    tempat_lahir,
    tanggal_lahir,
    password,
    role,
    address,
    classes,
    gender,
  } = useSelector((state) => {
    return {
        id_user: state.userReducer.id_user,
      nis: state.userReducer.nis,
      fullname: state.userReducer.fullname,
      email: state.userReducer.email,
      nomor_hp: state.userReducer.nomor_hp,
      tempat_lahir: state.userReducer.tempat_lahir,
      tanggal_lahir: state.userReducer.tanggal_lahir,
      password: state.userReducer.password,
      role: state.userReducer.role,
      address: state.userReducer.address,
      classes: state.userReducer.class,
      gender: state.userReducer.gender,
    };
  });
  const [editProfile, setEditProfile] = useState(false);
  const [hidePassword, setShowPassword] = useState("password");
  const [addressVal, setAddress] = useState(address);
  const [birthPlace, setBirthPlace] = useState(tempat_lahir);
  const [birthDate, setBirthDate] = useState(tanggal_lahir);
  const [editPhone, setPhone] = useState(nomor_hp);
  const [editEmail, setEmail] = useState(email);
  const updatePasswordHandler = () =>{
    if(password == temporaryPass && temporaryPass != newPass){
        if(newPass == confirmPass){
            if(window.confirm("Do you want to change your password?") == true){
                axios.patch(URL + `/${id_user}`, {
                    password: newPass
                })
                .then(res => {
                    getData();
                    alert("Password Updated!")
                    window.location.reload();
            })
            .catch(error => {
                    console.log(id_user)
                    alert("something went wrong")
                })
            }else{
                alert('You are not updating your password');
                window.location.reload();
            }
        }else{
            alert("New Password and Confirmation Password are not matched")
        }
    }else if(temporaryPass == password){
        alert("The Password has been used before");
    }else{
        console.log(password)
        alert("Wrong password")
    }
  };
  const getData = async () =>{
    try{
      const res = await axios.get(URL + '/user', {params: {
        nis: nis, password: newPass
      }});
      if(res.data.result.length > 0){
        console.log(res.data.result[0])
        dispatch(loginStatus())
        dispatch(loginAction(res.data.result[0]));
        console.log(res.data)
        localStorage.setItem('absen_login', JSON.stringify(res.data.result[0]));
      }
    }
    catch(err){
      console.log(err)
    }
  };
  const hidePasswordHandler = () => {
    hidePassword == "password"
      ? setShowPassword("text")
      : setShowPassword("password");
  };
  const editProfileHandler = () => {
    editProfile ? setEditProfile(false) : setEditProfile(true);
  };
  const updateProfileHandler = () =>{
    if(window.confirm("Do you want to update your profile?") == true){
        axios.patch(URL + `/profile/${id_user}`, {
            address: addressVal,
            tempat_lahir: birthPlace,
            tanggal_lahir: birthDate,
            class: classes,
            gender: gender,
            nomor_hp: editPhone,
            email: editEmail
        }).then(res => {
            getData()
            setEditProfile(false)
            alert("Data Updated!")
            window.location.reload();
        }).catch()
    }else{
        alert("You are not updating your profile")
    }
  }
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawers />
        <Box
          component="main"
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
        >
          <div style={{ marginTop: "90px" }}></div>
          <div
            className="bg-light shadow"
            style={{
              margin: "auto 200px 30px 200px",
              paddingBottom: "50px",
            }}
          >
            <div className="d-flex flex-column" style={{ marginTop: "40px" }}>
              <div
                className="shadow d-flex flex-column justify-content-center align-items-center"
                style={{ margin: "50px 30px" }}
              >
                <Avatar
                  sx={{
                    width: "162px",
                    height: "162px",
                    marginLeft: "30px",
                    marginTop: "20px",
                  }}
                />
                <div
                  className="d-flex flex-column align-items-center"
                  style={{ margin: "30px 0" }}
                >
                  <h3 className="">{fullname}</h3>
                  <h5>
                    {nis} / {role}
                  </h5>
                </div>
              </div>
              <div>
                <fieldset style={{ marginLeft: "30px" }}>
                  <legend style={{ marginBottom: "30px" }}>
                    Change Password
                  </legend>
                  <div
                    className="d-flex flex-row justify-content-around"
                    style={{ margin: "10px 40px 10px -4px" }}
                  >
                    <div>
                      <p>Old password:</p>
                      <input type={hidePassword} onChange={e => setPassword(e.target.value)}/>
                      <p className="mt-2">New password:</p>
                      <input type={hidePassword} onChange={e => setNewPass(e.target.value)}/>
                    </div>
                    <div style={{ marginLeft: "20%" }}>
                      <p>Confirm password:</p>
                      <input type={hidePassword} onChange={e => setConfirmPass(e.target.value)} />
                      <br />
                      <div className="d-flex flex-row">
                        {hidePassword == "password" ? (
                          <Button
                            variant="outlined"
                            sx={{ marginTop: "45px", fontSize: "11px" }}
                            onClick={hidePasswordHandler}
                          >
                            Show Password
                          </Button>
                        ) : (
                          <Button
                            variant="outlined"
                            sx={{ marginTop: "45px", fontSize: "11px" }}
                            onClick={hidePasswordHandler}
                          >
                            Hide Password
                          </Button>
                        )}
                        <Button
                          variant="contained"
                          sx={{
                            marginTop: "45px",
                            marginLeft: "20px",
                            fontSize: "11px",
                          }} onClick={updatePasswordHandler}
                        >
                          Change Password
                        </Button>
                      </div>
                    </div>
                  </div>
                </fieldset>
                <fieldset style={{ marginLeft: "30px", marginTop: "20px" }}>
                  <legend>Profile Information</legend>
                  {!editProfile ? (
                    <div
                      className="d-flex flex-row justify-content-around"
                      style={{ margin: "50px 10% 0 -10%" }}
                    >
                      <div className="d-flex flex-column">
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Adress:
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            marginTop: "-10px",
                          }}
                        >
                          {address}
                        </p>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Birth Place:
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            marginTop: "-10px",
                          }}
                        >
                          {tempat_lahir}
                        </p>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Birth Date:
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            marginTop: "-10px",
                          }}
                        >
                          {tanggal_lahir}
                        </p>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Class:
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            marginTop: "-10px",
                          }}
                        >
                          {classes}
                        </p>
                      </div>
                      <div className="d-flex flex-column">
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Gender:
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            marginTop: "-10px",
                          }}
                        >
                          {gender}
                        </p>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Phone Number:
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            marginTop: "-10px",
                          }}
                        >
                          {nomor_hp}
                        </p>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          email:
                        </p>
                        <p
                          style={{
                            fontWeight: "500",
                            fontSize: "18px",
                            marginTop: "-10px",
                          }}
                        >
                          {email}
                        </p>
                        {(role == 'admin') ? '' : <Button
                          variant="contained"
                          sx={{ marginTop: "20px" }}
                          onClick={editProfileHandler}
                        >
                          Edit Profile
                        </Button>}
                        
                      </div>
                    </div>
                  ) : (
                    <div
                      className="d-flex flex-row justify-content-around"
                      style={{ margin: "50px 10% 0 -7%" }}
                    >
                      <div className="d-flex flex-column">
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Adress:
                        </p>
                        <input
                          value={addressVal}
                          onChange={(e) => setAddress(e.target.value)}
                        ></input>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Birth Place:
                        </p>
                        <input value={birthPlace} onChange={e => setBirthPlace(e.target.value)}></input>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Birth Date:
                        </p>
                        <input type="date" value={birthDate.split('/').join('-')} onChange={e => {setBirthDate(e.target.value)
                        console.log(e.target.value)}}></input>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Class:
                        </p>
                        <input value={classes} disabled></input>
                      </div>
                      <div className="d-flex flex-column">
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Gender:
                        </p>
                        <input value={gender} disabled></input>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          Phone Number:
                        </p>
                        <input value={editPhone} onChange={e => setPhone(e.target.value)}></input>
                        <p style={{ fontWeight: "600", fontSize: "18px" }}>
                          email:
                        </p>
                        <input value={editEmail} onChange={e=> setEmail(e.target.value)}></input>
                        <div className="d-flex flex-row">
                          <Button
                            variant="outlined"
                            onClick={editProfileHandler}
                            sx={{
                              fontSize: "14px",
                              height: "43px",
                              marginTop: "20px",
                            }}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="contained"
                            sx={{ marginTop: "20px", marginLeft: "10px" }}
                            onClick={updateProfileHandler}
                          >
                            Save Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </fieldset>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Profile;
