import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";

const Header = ()=>{
  const authStatus = useSelector(state=> state.auth.status)


  return <>
  <header className='w-full p-4 bg-gray-800 text-white '>
    <div className='flex justify-between item-center'>
      <div className='pl-16 text-2xl font-bold'> <Link to="/">Luke </Link></div>
      <nav className='space-x-6'>
        <a href="#">Home</a>
        <a href="#">Services</a>
      </nav>
      <div className='flex space-x-6 pr-8'>
        
      {authStatus ? (
  <Link 
    to="/" 
    className="bg-blue-400 px-4 py-2 rounded-md text-center"
  >
    <LogoutBtn></LogoutBtn>
  </Link>
) : (
  <div className="flex space-x-4">
    <Link 
      to="login" 
      className="bg-blue-400 px-4 py-2 rounded-md text-center"
    >
      Login
    </Link>
    <Link 
      to="signup" 
      className="bg-blue-400 px-4 py-2 rounded-md text-center"
    >
      Register
    </Link>
  </div>
)}
      </div>
    </div>
  </header>
  </>
}
export default Header;