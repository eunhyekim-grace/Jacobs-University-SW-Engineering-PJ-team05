import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";

// Retrieve validators
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

// Retrieve login action
import { login } from "../actions/auth";

/**
 * Show error on missing value
 * @param {*} value
 * @returns {HTMLElement} This field is required!
 */

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

/**
 * Render Login Component
 * @param {*} props
 * @returns {HTMLElement} Login Component
 */

const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gameid, setGameId] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);
  const { user: currentUser } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  // Update email on state
  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  // Update password on state
  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  //Update Game ID on state
  const onChangeGameID = (e) => {
    const gameid = e.target.value;
    setGameId(gameid);
  };

  const handleLogin = (e) => {
    /** Avoid refresh  */
    e.preventDefault();

    /** Set loading state to true */
    setLoading(true);

    /**  Validate forms input */
    form.current.validateAll();

    /** Check if no errors are present */
    if (checkBtn.current.context._errors.length === 0) {
      /**  Trigger state change with login*/
      dispatch(login(email, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  /** Redirect user to home on successful login */
  if (isLoggedIn) {
    return <Redirect to="/Role" />;
  }

  return (
    <div>
        {currentUser ? (
          <Redirect to="/Role" />

    ) : (
      <div className="col-md-12">
      <div className="card card-container">
        <Form className="form-login" onSubmit={handleLogin} ref={form}>
          <h3 className="text-center">Log In</h3>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input
              type="email"
              className="form-control"
              name="email"
              value={email}
              onChange={onChangeEmail}
              validations={[required]}
              placeholder="Enter email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
              placeholder="Enter password"
            />
          </div>

          {

          <div className="form-group">
            <label htmlFor="gameid">Game ID</label>
            <Input
              type="text"
              className="form-control"
              name="gameid"
              value={gameid}
              onChange={onChangeGameID}
              //validations={[required]}
              placeholder="Enter Game ID"
            />
          </div>

          }
          
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="form-group">
    
            <button
              className="btn btn-primary btn-block"
              disabled={loading}
              type="submit"
            >
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Log In
              </span>
            </button>
          </div>

          <div className="form-group">
            <p className="forgot-password text-right">
              Forgot <Link to="#">password?</Link>
            </p>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}

          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
    )}
   
    
   
    </div>
  );
};

export default Login;