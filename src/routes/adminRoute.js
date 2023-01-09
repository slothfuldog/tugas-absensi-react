import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = (props) =>{
    const {auth, loading, role} = useSelector(state => 
        {return{
            auth :state.userReducer.auth,
            loading: state.userReducer.loading,
            role: state.userReducer.role
        }})
    console.log(auth)
        if(!loading){
            if(role != 'admin') {
                return(<Navigate to='/' />)
            }
            else{
                return props.children;
            }
        }
}
export default AdminRoute;