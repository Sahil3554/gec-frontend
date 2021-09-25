import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Register.css";
const Register = (props) => {
  // console.log(useParams());
  const params = useParams();
  const getUser = async () => {
    if (!localStorage.getItem("token")) {
      props.history.push("/");
    } else {
      const api_data = await axios.get(
        `https://gec-backend.herokuapp.com/api/auth/users/${params.id}`
      );
      console.log(api_data.data);
      setData({
        name: api_data.data.name,
        email: api_data.data.email,
        typ: api_data.data.typ,
      });
    }
  };

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    typ: "user",
    error: null,
  });

  const { name, email, password, typ, error } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateEmail(email)) {
      try {
        setData({ ...data, error: null });
        if (params.id) {
          await axios.patch(
            `https://gec-backend.herokuapp.com/api/auth/users/${params.id}`,
            { name, email, typ },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setData({ error: "Updated Successfully" });
        } else {
          if (password.split("").length > 8) {
            await axios.post(
              `https://gec-backend.herokuapp.com/api/auth/register`,
              { name, email, typ, password },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            setData({ error: "Registered Successfully" });
          } else {
            setData({
              ...data,
              error: "Password Must be greater then 8 characters",
            });
          }
        }
      } catch (err) {
        setData({ ...data, error: err.response.data.error });
      }
    } else {
      setData({ ...data, error: "Invalid Email" });
    }
  };
  useEffect(() => {
    if (params.id) {
      getUser();
    }
  }, []);
  return (
    <div className="register row">
      <div className="col-sm-2" />
      <div className="col-sm-8">
        <h4 className="text-muted text-center mb-5">Create an account</h4>

        <div className="m-5">
          <form>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                className="form-control"
                type="name"
                name="name"
                value={name}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {params.id ? (
                <select name="typ" value={typ} onChange={handleChange}>
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </select>
              ) : (
                <>
                  <label htmlFor="password">Password</label>
                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                  />
                </>
              )}
            </div>
            {error ? <p className="text-danger">{error}</p> : null}
            <div className="text-center">
              {params.id ? (
                <button className="btn btn-success" onClick={handleSubmit}>
                  Update
                </button>
              ) : (
                <button className="btn btn-primary" onClick={handleSubmit}>
                  Register
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      <div className="col-sm-2" />
    </div>
  );
};

export default Register;
