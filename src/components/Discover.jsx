import React, { useEffect, useState } from "react";
import Axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const Discover = (props) => {
  const [pageData, setPageData] = useState([]);
  const getUsersDB = async () => {
    const { data } = await Axios.get(
      `https://gec-backend.herokuapp.com/api/auth/users`
    );
    setPageData(data);
  };
  const [user, setUser] = useState(null);

  const getUser = async () => {
    if (!localStorage.getItem("token")) {
      props.history.push("/");
    } else {
      const res = await Axios.get("/api/auth", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setUser(res.data);
    }
  };
  useEffect(() => {
    getUser();
    getUsersDB();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    props.history.push("/");
  };

  const viewHandler = (id) => {
    // console.log("View " + id);
    props.history.push(`/signup/${id}`);
  };
  const deleteHandler = async (id) => {
    await Axios.delete(
      `https://gec-backend.herokuapp.com/api/auth/users/${id}`
    );
    // console.log("Del " + id);
    getUsersDB();
  };
  return (
    <div className="discover">
      <div className="row mt-3">
        <div className="col-8">
          <h1 className="text-primary">Users Page</h1>
        </div>
        <div className="col-4 justify-content-center">
          <button className="ml-auto btn btn-primary" onClick={logout}>
            LogOut
          </button>
        </div>
      </div>

      <div className="detail-table">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">ame</th>
              <th scope="col">Email</th>
              <th scope="col">Edit</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {console.log(pageData)}
            {pageData.map((el, index) => (
              <tr key={index}>
                <th scope="row">{index}</th>
                <td>{el.name}</td>
                <td>{el.email}</td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => viewHandler(el._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteHandler(el._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Discover;
