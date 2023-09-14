import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Form from 'react-validation/build/form';
import Input from 'react-validation/build/input';
import Select from 'react-validation/build/select';
import CheckButton from 'react-validation/build/button';
import { isEmail } from 'validator';

import { signup } from '../actions/auth';
import { useHistory } from "react-router-dom";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const valid_email = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                This is not a valid email!
            </div>
        );
    }
};

/**
 * Check whether the username is valid
 * @param {*} value 
 * @returns {HTMLElement} Username must be between 8 and 32 characters. 
 */
const valid_username = (value) => {
    if (value.length < 8 || value.length > 32) {
        return (
            <div className="alert alert-danger" role="alert">
                The username must be between 8 and 32 characters.
            </div>
        );
    }
};



const valid_password = (value) => {
    if (value.length < 8 || value.length > 64) {
        return (
            <div className="alert alert-danger" role="alert">
                The password must be between 8 and 64 characters.
            </div>
        );
    }
};


const SignUp = () => {
    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState(3);
    const [successful, setSuccessful] = useState(false);

    const { message } = useSelector(state => state.message);
    const dispatch = useDispatch();

    const history = useHistory();
  
    // const handleRoute = () =>{ 
    //     history.push("/Role");
    // }

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const onChangeRole = (e) => {
        const role = e.target.value;
        setRole(role);
    }


    const handleSignUp = (e) => {
        e.preventDefault();

        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            dispatch(signup(username, email, password, role))
                .then(() => {
                    setSuccessful(true);
                })
                .catch((error) => {
                    setSuccessful(false);
                });
        }

    };

    return (
        <div className="col-md-12">
            <div className="card card-container">
                <Form className="form-signup" onSubmit={handleSignUp} ref={form}>
                    <h3 className="text-center">Sign Up</h3>
                    {!successful && (
                        <div>

                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="username"
                                    value={username}
                                    onChange={onChangeUsername}
                                    validations={[required, valid_username]}
                                    placeholder="Enter username"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={email}
                                    onChange={onChangeEmail}
                                    validations={[required, valid_email]}
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
                                    validations={[required, valid_password]}
                                    placeholder="Enter password"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="role">Role</label>
                                <Select name="role" validations={[required]} value={role} className="form-control" onChange={onChangeRole}>
                                    <option value={2}>Instructor</option>
                                    <option value={3}>Student</option>
                                </Select>
                            </div>

                            <div className="form-group">
                                <button 
                                className="btn btn-primary btn-block" 

                                >
                                    Sign Up
                                </button>
                            </div>

                            <div className="form-group">
                                <p className="forgot-password text-right">
                                    Already registered <Link to="/login">sign in?</Link>
                                </p>
                            </div>
                        </div>
                    )}

                    {message && (
                        <div className="form-group">
                            <div className={successful ? "alert alert-success" : "alert alert-danger"} role="alert">
                                {message} 
                            </div>
                        </div>
                    )}
                    <CheckButton style={{ display: "none" }} ref={checkBtn} />
                </Form>
            </div>
        </div>
    );
};

export default SignUp;