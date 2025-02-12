import { useDispatch } from "react-redux";
import authService from "../../appwrite/auth";
import { logout as logoutAction }  from "../../store/authSlice"



const LogoutBtn = ()=>{

  const dispatch = useDispatch();
  const LogoutHandler = ()=>{
    authService.logout().then(()=>{
      dispatch(logoutAction())
    })
  }
  return <button className="inline-block px-6  py-2 duration-200 hover:bg-blue-100 rounded-full" onClick={LogoutHandler}>Logout</button>
} 
export default LogoutBtn;