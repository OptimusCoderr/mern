import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import './Login.css'; // Import the CSS file
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [message, setMessage] = useState("");

    const {registerUser,signInWithGoogle} = useAuth()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    // REGISTER USER
    const onSubmit =  async (data) => {
        console.log(data);
        try {
            await registerUser(data.email, data.password)
            alert("User registration successful")
            navigate('/login')
        } catch (error) {
            setMessage("Please Provide Valid Email and Password")
            console.error(error);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            navigate("/");
        } catch (error) {
            alert("Google Sign In Failed");
            console.error(error);
        }
    };

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2 className='login-title'>Please Register</h2>
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

                    {/**Register Button */}
                    <div>
                        <button className='login-button'>Register</button>
                    </div>
                </form>
                <p className='register-link'>
                    You have an account? Please <Link to='/login' className='register-text'>Login</Link>
                </p>

                {/**GOOGLE SIGN IN BUTTON */}
                <div className='google-signin'>
                    <button
                        onClick={handleGoogleSignIn}
                        className='google-button'
                    >
                        <FaGoogle className='google-icon' />
                        Sign up with Google
                    </button>
                </div>

                <p className='footer-text'>2025 Book Store. All rights reserved</p>
            </div>
        </div>
    );
}

export default Register;