import React from "react";
import { Link } from "react-router-dom";

/**
 * Render Login Component
 * @param {*} props
 * @returns {HTMLElement} Login Component
 */

const Login = (props) => {
  return (
    <div className="col-md-12">
      <div className="card card-container">
        <h4 className="text-center"> Log In as:</h4>

        <Link to="/LoginStudent" className="text-center">
          <button className="btn btn-warning btn-lg m-2">Student</button>
        </Link>

        <Link to="/LoginInstructor" className="text-center">
          <button className="btn btn-warning btn-lg m-2">Instructor</button>
        </Link>
      </div>
    </div>
  );
};
export default Login;
