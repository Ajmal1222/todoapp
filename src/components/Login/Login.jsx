import { useState } from "react";
import Input from "../Input";
import { useForm } from "react-hook-form";
import Button from "../Button";
import {data, Link, useNavigate } from "react-router-dom";
import authService from "../../../src/appwrite/auth";
import {login as authLogin} from "../../store/authSlice"
import { useDispatch } from "react-redux";

const Login = ()=>{
  const[error,setError] = useState("");
  const {register, handleSubmit} = useForm()
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const login = async (data)=>{
    try {
      const session = await authService.login(data);
        if(session) {
          const userData = await authService.getcurrentUser();
          if(userData) {
            dispatch(authLogin(data));
            console.log("user is avigatig to home")
            navigate("/")
          }
        }
      
    } catch (error) {
      setError(error.message); 
    }
  }

  return <>

 

<div className="flex item-center justify-center w-full ">
  <div className={`max-auto w-full max-w-lg bg-gray-100 rounded-100 rounded-xl p-10 border-black/10 `}>
  <div>
  <span className=" inline-block w-full max-w-[100px] text-center">
          
        </span>
    </div>
    
    <h2 className="text-center text-2xl font-bold">Logo</h2>
      <h2 className="text-center text-2xl font-bold">Sign in to your Account</h2>
      <p className="mt-2 text-center text-base text-black/60">
              Don&apos:t have any Account?&nbsp;
              <a className="font-medium text-primary transition-all duration-200 hover:underline cursor:pointer"
              to="/signup">
                Sign Up
              </a>
      </p>
      {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

      <form onSubmit={handleSubmit(login)} className="mt-8 space-y-5">
      <Input
          label="Email:"
          placeholder="Enter Your email"
          type="email"
          {...register("email", {
            required:true,
            matchPatern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/.test(value) || 
            "Email Address Must be a Valid"
          })}
          >
          
          </Input>
        <Input
        label="Password:"
        placeholder="Enter Your Password"
        type="password"
        {...register("password", {
          required: true,
        })}
        ></Input>
        <Button 
        type="submit"
        className="w-full text-white"
        >Sign In</Button>
      </form>
  </div>
  
  </div>
  </>
}
export default Login;