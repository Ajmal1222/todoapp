import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";
import authService from "../../appwrite/auth";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const create = async (data) => {
    setError("");
    try {
      const session = await authService.createAccount(data);
      const userData = await authService.getcurrentUser();
      if (userData) {
        console.log(userData);
        dispatch(login(userData));
        navigate("/")
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="w-full mx-auto my-5 justify-center item-center">
      <div className="bg-gray-100 mx-auto w-full rounded-100 p-10 border-black space-y-6 max-w-lg">
        <div className="text-center my-6">
          <span className="text-center font-bold">Logo</span>
        </div>
        <h2 className="text-center text-2xl font-bold">Sign Up to Your Account</h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an Account?&nbsp;
          <Link
            className="font-medium text-primary transition-all duration-200 hover:underline"
            to="/login"
          >
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit(create)} className="max-w-600">
          <Input
            label="Full Name:"
            placeholder="Enter Your Name"
            {...register("name", { required: true })}
          ></Input>
          <Input
            label="Email:"
            placeholder="Enter Your Email"
            {...register("email", { required: true })}
          ></Input>
          <Input
            label="Password:"
            placeholder="Enter Your Password"
            {...register("password", { required: true })}
          ></Input>
          <Button type="submit" className="w-full text-white mt-8">
            Sign Up
          </Button>
        </form>

        {error && <p className="text-red-500 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default SignUp;
