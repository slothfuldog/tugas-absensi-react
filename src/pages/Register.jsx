import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import Drawers from "../components/Drawers";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "./Register.css";
import { useDispatch } from "react-redux";
import axios from "axios";

const Register = (props) => {
  const URL = "http://localhost:3200";
  const dispatch = useDispatch();
  const [hide, setHide] = useState("password");
  const hideHandler = () => {
    hide === "password" ? setHide("text") : setHide("password");
    console.log(hide);
  };
  const [studentNis, setNis] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [gender, setGender] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState('');
  const [classes, setClass] = useState('');
  const [randomPass, setPass] = useState('');
  const [heights, setHeight] = useState("0px");
  const [pad, setPad] = useState("0px");
  const [indicators, setInd] = useState(false);
  const [bgColor, setBgColor] = useState("red");
  const [data, setData] = useState(null);
  // const checkHandler = () =>{
  //   setHeight("40px")
  //   setInd(true);
  //   setBgColor('green');
  //   setPad("10px");
  // }
  const addStudentHandler = () => {
    if(studentNis.length > 0 && randomPass.length > 6){
      if(window.confirm("Do you want to register new student?") == true){
        axios
        .post(URL + "/user/students", {
          nis: studentNis,
          fullname,
          email,
          password: randomPass,
          tempat_lahir: birthPlace,
          tanggal_lahir: birthDate,
          address,
          gender,
          class: classes,
          nomor_hp: phoneNumber,
          role: "student",
        })
        .then((res) => {
          setInd(true);
          setHeight("40px");
          setBgColor("green");
          setPad("10px");
        })
        .catch((err) => {
          setHeight("40px");
          setPad("10px");
        });
      }
      else{
        alert("You are not registering any student")
      }
      }
    else{
      setHeight("40px");
      setPad("10px");
    }
  };
  const passwordHandler = () => {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const charsCaps = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "1234567890";
    const mixed = chars + nums + charsCaps;
    const random = Math.round(Math.random() * 8 + 6);
    let str = "";
    for (let i = 0; i < random; i++) {
      str += mixed[Math.round(Math.random() * (mixed.length - 1))];
    }
    setPass(str);
  };
  const getData = async () => {
    try {
      const res = await axios.get(URL + "/user/students");
      setData(res.data.result);
    } catch (err) {}
  };
  const nisHandler = () => {
    
    if (data != null) {
      let studentId = data.length + 1;
    if(studentId < 10){
      studentId = `00${studentId}`;
    }else if(studentId >= 10 && studentId < 100){
      studentId = `0${studentId}`;
    }else if(studentId >= 100){
      studentId = `${studentId}`;
    }
      const currentBirthDateIds =
        birthDate.substring(2, 4)  + birthDate.substring(5, 7);
      let currentNis =
        birthDate !== ""
          ? birthDate.substring(2, 4)  + birthDate.substring(5, 7)
          : "";
      currentNis = currentNis  + `${studentId}`
      currentNis =
        classes != data.class && classes != "Other"
          ? currentNis  + classes
          : currentNis + "";
      setNis(currentNis);
    }
  };
  useEffect(() => {
    getData();
    nisHandler();
  }, [birthDate, classes]);
  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Drawers data="Regis Student" />
        <Box
          component="main"
          sx={{ flexGrow: 1, height: "100vh", overflow: "auto" }}
        >
          <div style={{ height: "65px" }}></div>
          <div
            className="text-white fw-bold d-flex flex-column justify-content-center"
            style={{
              paddingLeft: "20px",
              paddingTop: pad,
              height: heights,
              backgroundColor: bgColor,
              transition:
                "height 0.5s ease-in-out, padding-top 0.5s ease-in-out",
            }}
          >
            {indicators == true ? (
              <p>Student has been added</p>
            ) : (
              <p>Something went wrong</p>
            )}
          </div>
          <div
            className="row shadow bg-light"
            style={{ margin: "50px 40px", height: "700px" }}
          >
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12"
              style={{ padding: "20px" }}
            >
              <div>
                <p>NIS</p>
                <input
                  disabled
                  className="mb-3"
                  type="text"
                  style={{ width: "100%" }}
                  value={studentNis}
                />
              </div>
              <div>
                <p>Fullname</p>
                <input
                  required
                  className="mb-3"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
              <div>
                <p>Email</p>
                <input
                  required
                  className="mb-3"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <p>Phone Number</p>
                <input
                  required
                  className="mb-3"
                  type="text"
                  style={{ width: "100%" }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="d-flex flex-row ">
                <div>
                  <p>Birth Place</p>
                  <input
                    required
                    className="mb-3"
                    type="text"
                    onChange={(e) => setBirthPlace(e.target.value)}
                  />
                </div>
                <div style={{ marginLeft: "20px" }}>
                  <p>Birth Date</p>
                  <input
                    required
                    className="mb-3"
                    type="date"
                    onChange={(e) => setBirthDate(e.target.value)}
                  />
                </div>
              </div>
              <div className="mb-3">
                <p>Gender</p>
                <input
                  required
                  className="mb-3"
                  name="gender"
                  type="radio"
                  value="Male"
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Male
                <input
                  className="mb-3"
                  name="gender"
                  type="radio"
                  value="Female"
                  style={{ marginLeft: "10px" }}
                  onChange={(e) => setGender(e.target.value)}
                />{" "}
                Female
              </div>
              <div>
                <p>Password</p>
                <div className="input-group mb-3">
                  <input
                    required
                    type={hide}
                    style={{ width: "80%" }}
                    onChange={(e) => setPass(e.target.value)}
                    value={randomPass}
                  />
                  <span className="input-group-text bg-light border-top-0 border-left-0">
                    {hide === "text" ? (
                      <AiFillEye
                        onClick={hideHandler}
                        style={{ cursor: "pointer" }}
                      />
                    ) : (
                      <AiFillEyeInvisible
                        onClick={hideHandler}
                        style={{ cursor: "pointer" }}
                      />
                    )}
                  </span>
                </div>
                <Button
                  variant="outlined"
                  sx={{
                    color: "black",
                    border: "black solid 1px",
                    fontWeight: "600",
                  }}
                  id="btn-generate"
                  onClick={passwordHandler}
                >
                  Generate
                </Button>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6 col-sm-12 col-12"
              style={{ padding: "20px" }}
            >
              <div>
                <div>
                  <p>Address</p>
                  <input
                    required
                    className="mb-3"
                    type="text"
                    style={{ width: "100%" }}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div>
                  <p>Class</p>
                  <select
                    className="form-select"
                    style={{ width: "60%" }}
                    onClick={(e) => setClass(e.target.value)}
                  >
                    <option value="Other">Please choose the class</option>
                    <option value="SOCIAL">Social</option>
                    <option value="SCIENCE">Science</option>
                  </select>
                </div>
              </div>
              <div style={{ marginTop: "45px" }}>
                <Button
                  className="fw-bold"
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={addStudentHandler}
                >
                  Register
                </Button>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </div>
  );
};

export default Register;
