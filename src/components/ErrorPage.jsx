import React from "react";
import "./ErrorPage.css";
const ErrorPage = (props) => {
  return (
    <div className="error-page">
      <h1 className="error-code">404</h1>
      <p className="error-disc">Page You Are Looking for Doesnot Exist</p>
      <button
        className="btn btn-danger"
        onClick={() => props.history.push("/login")}
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
