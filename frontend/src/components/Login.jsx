import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import './Login.css'; // Import the CSS file

const Login = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => console.log(data);

    const handleGoogleSignin = () => {
        window.location.href = "http://localhost:5000/api/auth/google";
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2 className='login-title'>Please Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/**EMAIL */}
                    <div className='form-group'>
                        <label className='form-label' htmlFor="email">
                            Email
                        </label>
                        <input
                            {...register("email", { required: true })}
                            type="email"
                            name="email"
                            id="email"
                            placeholder='Email Address'
                            className='form-input'
                        />
                    </div>

                    {/**PASSWORD */}
                    <div className='form-group'>
                        <label className='form-label' htmlFor="password">
                            Password
                        </label>
                        <input
                            {...register("password", { required: true })}
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            className='form-input'
                        />
                    </div>

                    {message && <p className='error-message'>{message}</p>}

                    {/**Login Button */}
                    <div>
                        <button className='login-button'>Login</button>
                    </div>
                </form>
                <p className='register-link'>
                    Haven't an account? Please <Link to='/register' className='register-text'>Register</Link>
                </p>

                {/**GOOGLE SIGN IN BUTTON */}
                <div className='google-signin'>
                    <button
                        onClick={handleGoogleSignin}
                        className='google-button'
                    >
                        <FaGoogle className='google-icon' />
                        Sign in with Google
                    </button>
                </div>

                <p className='footer-text'>2025 Book Store. All rights reserved</p>
            </div>
        </div>
    );
};

export default Login;