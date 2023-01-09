import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap';
import 'bootstrap/dist/js/bootstrap.bundle';
import 'bootstrap/dist/js/bootstrap.esm';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Routes, Route, Navigate} from 'react-router-dom'
import Copyright from './components/Copyright';
import Drawers from './components/Drawers';
import Attendance from './pages/Attendance';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import StudentAtt from './pages/StudentAtt';
import axios from 'axios';
import { doneLoading, isLoading, loginAction, loginStatus } from './action/userAction';
import ProtectedRoute from './routes/protectedRoute';
import Loading from './pages/Loading';
import AdminRoute from './routes/adminRoute';
import LoggedInNotFound from './pages/LoggedInNotFound';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const URL = 'http://localhost:3200';
  const dispatch = useDispatch();
  const {auth , nis, password, loading, role} = useSelector(state =>{
    return{
      auth: state.userReducer.auth,
      nis : state.userReducer.nis,
      password: state.userReducer.nis,
      loading: state.userReducer.loading,
      role: state.userReducer.role
    }})
    const keepLogin = () =>{
      let getLocalStorage = JSON.parse(localStorage.getItem("absen_login"))
      if(getLocalStorage){
        dispatch(loginStatus());
      axios.get(URL + `/user`, {params: {
        nis: getLocalStorage.nis, password: getLocalStorage.password
      }})
      .then(res => {
        dispatch(loginAction(res.data.result[0]));
        localStorage.setItem("absen_login", JSON.stringify(res.data.result[0]))
        dispatch(doneLoading());
      }).catch(e => doneLoading())
      }
    else{
      dispatch(doneLoading());
    }}
    useEffect(() => {
      keepLogin()
    }, [])
  return (
    <div>
      {console.log(role)}
        {(loading) ?  <Loading /> : <Routes >
        <Route path='/login' element={<Login />}/> 
        <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>}/>
        <Route path='/attendance' element={<ProtectedRoute><Attendance /></ProtectedRoute>}/>
        <Route path='/student-attendance' element={<ProtectedRoute><AdminRoute><StudentAtt /></AdminRoute></ProtectedRoute>}/>
        <Route path='/student-registration' element={<ProtectedRoute><AdminRoute><Register /></AdminRoute></ProtectedRoute>}/>
        <Route path='/profile' element={<ProtectedRoute><Profile /></ProtectedRoute>}/>
        {(auth) ? <Route path='/*' element={<LoggedInNotFound />}></Route> :<Route path='/*' element={<ProtectedRoute />}></Route>}
        </Routes>}
      
      <Copyright />
    </div>
  );
}

export default App;
