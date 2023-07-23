import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppContext, url } from "../utils/Context";
import { Icon } from "@iconify/react";
import { useDocumentTitle } from "../utils";

const Popup = ({ isSuccessful, text }) => {
  return (
    <div className="fixed inset-0 flex items-start justify-center bg-gray-900 bg-opacity-50 pt-8">
      <div className="bg-white rounded-lg flex space-x-4 p-8 items-center justify-center">
        <Icon
          icon={
            isSuccessful ? "carbon:checkmark-filled" : "carbon:close-filled"
          }
          color={isSuccessful ? "green" : "red"}
          className="text-3xl"
        />
        <h2 className="text-lg">{text}</h2>
      </div>
    </div>
  );
};

export const Register = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSuccessful, setIsSuccessful] = useState({
    show: null,
    text: "",
  });
  const [correct, setCorrect] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const Authenticate = async (user, show) => {
    showPopup(() => {
      if (show) {
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      }
    });
  };

  const showPopup = (callback) => {
    setIsSuccessful((prev) => ({
      ...prev,
      show: true,
    }));

    setTimeout(() => {
      setIsSuccessful((prev) => ({
        ...prev,
        show: null,
      }));
      callback(); // Execute the callback function
    }, 3500);
  };

  async function postUser() {
    try {
      const response = await axios.post(`${url}/register`, user);
      setIsSuccessful((prev) => ({
        ...prev,
        show: response.data.status, // Update the value directly
        text: response.data.message,
      }));
      await Authenticate(response.data.user, response.data.status);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // `isValid` doesn't need to be a state,
  // you should use `useMemo` just like you do for the `menu`
  useEffect(() => {
    const isValid =
      user.firstName !== "" &&
      user.lastName !== "" &&
      user.gender !== "" &&
      user.email !== "" &&
      user.password !== "" &&
      user.phoneNumber !== "" &&
      confirmPassword !== "" &&
      isChecked;
    setIsValid(isValid);
  }, [user, confirmPassword, isChecked]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (user.password !== confirmPassword) {
      setCorrect(true);
      setIsSuccessful((prev) => ({
        ...prev,
        show: false,
        text: "Passwords do not match",
      }));
      showPopup();
    } else {
      postUser();
    }
  };

  return (
    <div className="p-6 lg:p-10 xl:p-20 w-full">
      {useDocumentTitle('Register')}
      <h1 className="font-bold title-font text-4xl pb-4">
        Create your account <span className="text-orange">!</span>
      </h1>
      {isSuccessful.show !== null ? (
        <Popup isSuccessful={isSuccessful.show} text={isSuccessful.text} />
      ) : (
        ""
      )}
      <form onSubmit={handleSubmit} method="post">
        <div className="flex max-xl:flex-col 2xl:space-x-6">
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="firstName">First Name:</label>
            <input
              type="text"
              name="firstName"
              className="p-3 border border-gray-300 rounded flex-grow"
              value={user.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="lastName">Last Name:</label>
            <input
              type="text"
              className="p-3 border border-gray-300 rounded flex-grow"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex max-xl:flex-col 2xl:space-x-6">
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="gender">Gender:</label>
            <select
              name="gender"
              className="p-3 border border-gray-300 rounded flex-grow"
              value={user.gender}
              onChange={handleChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="email">E-mail Address:</label>
            <input
              type="email"
              className="p-3 border border-gray-300 rounded flex-grow"
              name="email"
              value={user.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="flex flex-col py-3 w-full">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="phone"
            className="p-3 border border-gray-300 rounded flex-grow"
            name="phoneNumber"
            value={user.phoneNumber}
            onChange={handleChange}
            minLength={11}
            maxLength={11}
            required
          />
        </div>
        <div className="flex max-xl:flex-col 2xl:space-x-6">
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="pwd">Password:</label>
            <input
              className={`p-3 border ${
                correct ? "border-red-600 outline-red-600" : "border-gray-300"
              } rounded flex-grow`}
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col py-3 w-full">
            <label htmlFor="cpwd">Confirm Password:</label>
            <input
              className={`p-3 border ${
                correct ? "border-red-600 outline-red-600" : "border-gray-300"
              } rounded flex-grow`}
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </div>
        </div>
        <div className="py-3">
          <input
            type="checkbox"
            name="isChecked"
            id=""
            placeholder=""
            onChange={(e) => setIsChecked(e.target.checked)}
            value={isChecked}
            className="text-orange"
          />{" "}
          By checking this box, you agree to the terms and conditions.
        </div>
        <button
          type="submit"
          className={`bg-orange ${
            isValid
              ? "active:cursor-pointer"
              : "disabled:bg-orange-lighter cursor-not-allowed"
          } w-full text-white uppercase 
          my-6 p-6 font-bold text-3xl rounded-lg`}
          disabled={!isValid}
        >
          Register
        </button>
      </form>
      <div className="text-xl font-bold">
        Have an account?
        <Link to={`/user/login`}>
          <span className="text-orange pl-1">Log in now</span>
        </Link>
      </div>
    </div>
  );
};

export const Login = () => {
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSuccessful, setIsSuccessful] = useState({
    show: null,
    text: "",
  });
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const Authenticate = async (user, show) => {
    showPopup(() => {
      if (show) {
        dispatch({ type: "LOGIN", payload: user });
        navigate("/");
      }
    });
  };

  const showPopup = (callback) => {
    setIsSuccessful((prev) => ({
      ...prev,
      show: true,
    }));

    setTimeout(() => {
      setIsSuccessful((prev) => ({
        ...prev,
        show: null,
      }));
      callback(); // Execute the callback function
    }, 3500);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function getUser() {
    try {
      const response = await axios.post(`${url}/login`, { email, password });
      setIsSuccessful((prev) => ({
        ...prev,
        show: response.data.status,
        text: response.data.message,
      }));
      await Authenticate(response.data.user, response.data.status);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    getUser();
  };

  return (
    <div className="p-6 xl:p-20 w-full">
      {useDocumentTitle('Login')}
      {isSuccessful.show !== null ? (
        <Popup isSuccessful={isSuccessful.show} text={isSuccessful.text} />
      ) : (
        ""
      )}
      <h1 className="font-bold title-font text-4xl">
        Welcome<span className="text-orange">!</span>
      </h1>
      <div className="text-xl font-bold pb-4">
        Don't have an account?
        <Link to={`/user/register`}>
          <span className="text-orange pl-1">Sign up now</span>
        </Link>
      </div>
      <p>Enter details to login.</p>
      <form onSubmit={handleSubmit} action="/users" method="post">
        <div className="py-3 w-full">
          <input
            type="email"
            className="p-3 border border-gray-300 rounded w-full"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-wrap items-stretch py-3">
          <input
            type={showPassword ? "text" : "password"}
            className="p-3 border border-r-0 border-gray-300 rounded-l flex-grow"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span
            className="font-bold uppercase cursor-pointer text-orange border border-l-0 border-gray-300 flex rounded-r items-center px-6"
            onClick={togglePasswordVisibility}
          >
            <div className="text-orange text-2xl">
              <Icon icon={showPassword ? "ion:eye-outline" : "ion:eye-off-outline"} />
            </div>
          </span>
        </div>

        <p
          className="py-5 font-bold flex cursor-pointer text-orange justify-end uppercase"
          onClick={() =>
            alert(
              "For test purposes, the email is ukojoshy@gmail.com and the password is P@$$w0rd@12345"
            )
          }
        >
          Forgot Password?
        </p>
        <button
          type="submit"
          className="bg-orange w-full text-white uppercase p-6 font-bold text-3xl rounded-lg"
        >
          Log In
        </button>
      </form>
    </div>
  );
};