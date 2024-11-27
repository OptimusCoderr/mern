import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import axios from "axios"
import getBaseUrl from '../utils/baseUrl';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        console.log(data);
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data,{
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            const auth = response.data;
            if(auth.token){
                localStorage.setItem("token", auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has expired', "Please login again");
                    navigate("/admin")
                },3600 * 1000)
            }
            alert("Welcome Admin");
            navigate("/dashboard");
        } catch (error) {
            setMessage("Please Provide Valid username and Password");
            console.error(error);
        }
        
    }

    return (
        <div className='login-container'>
            <div className='login-form'>
                <h2 className='login-title'>Admin Login</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/**EMAIL */}
                    <div className='form-group'>
                        <label className='form-label' htmlFor="username">
                            Username
                        </label>
                        <input
                            {...register("username", { required: true })}
                            type="text"
                            name="username"
                            id="username"
                            placeholder='Username'
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
              
                

                <p className='footer-text'>2025 Book Store. All rights reserved</p>
            </div>
        </div>
    );
}

export default AdminLogin