import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import axiosInstance from './axiosConfig';

const UserLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {setCurrentUser} = useContext(UserContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('')
        console.log('Login Data Submitted:', formData);
      await axiosInstance.post(`/user/login`, formData)
        .then((res) => {
            console.log(res.data)
            localStorage.setItem('token', res.data.token);
            setCurrentUser(res.data);
           navigate('/')
        }).catch((err) => {
            console.log(err)
            if(err){
                setError(err.response?.data?.message || 'An error occurred')
              }
        })
        // Add your registration logic here
    }

    return (
        <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>

            <h2>Login</h2>
            <div className="errorMessage">{error}</div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className='form-control'
                        required
                    />
                </div>
                <button type="submit" className='btn btn-success'>Login</button>
            </form>
            <p>Don't have an account? <Link to={`/register`}>Quick register</Link></p>
            </div>
        </div>
    );
}

export default UserLogin;