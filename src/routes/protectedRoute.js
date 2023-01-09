import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { userReducer } from "../redux/userReducer";

const ProtectedRoute = (props) =>{
    const {auth, loading,role} = useSelector(state => 
        {return{
            auth :state.userReducer.auth,
            loading: state.userReducer.loading,
        }})
        if(!loading){
            if(!auth) {
                return(<Navigate to='/login' />)
            }
            else{
                return props.children;
            }
        }
}
export default ProtectedRoute;