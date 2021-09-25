import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";
import axios from "axios";
import swal from "sweetalert";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    error: "",
  });
  const { email, password, error } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("URL" + process.env.REACT_APP_SERVER_URL);
    try {
      const res = await axios.post(
        `https://gec-backend.herokuapp.com/api/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("token", res.data.token);
      props.history.push("/dashboard");
      // console.log(res);
    } catch (err) {
      // setData({ ...data, error: err.response.data.error });
      swal("Error!", "Invalid Credentials", "error");
    }
  };
  return (
    <div className="login">
      <div className="login-box">
        <div className="user-icon">
          <i className="fa fa-user-circle" aria-hidden="true"></i>
        </div>
        <form>
          <div className="inputs">
            <i className="fa fa-user" aria-hidden="true"></i>
            <input
              type="email"
              placeholder="example@example.com"
              name="email"
              id="email"
              value={email}
              onChange={handleChange}
            />
          </div>
          <div className="inputs">
            <i className="fa fa-key" aria-hidden="true"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="pass"
              value={password}
              onChange={handleChange}
            />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit}>
            Login
          </button>
        </form>
        <p>
          Not Have Account?{" "}
          <Link className="link" to="/signup">
            SignUp
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
