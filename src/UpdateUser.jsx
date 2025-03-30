import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import axiosInstance from './axiosConfig';


const UpdateUser = () => {
const navigate = useNavigate();
  const {currentUser} = useContext(UserContext)
  let token = currentUser?.token

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  })

const [userCred, setUserCred] = useState({
    name: '',
    email: '',
    age: 0
  })
const [error, setError] = useState('');
const { id } = useParams();
const handleInputChange = (e) =>{
    setUserCred(prev =>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }

const updateCredentials = async (e) => {
    e.preventDefault();
    if (!id) {
        return setError('User ID is missing');
    }
    await axiosInstance.
    put(`/update/${id}`, userCred)
    .then((data) => {
        if(!data.data){
            return setError('Please fill in all fields')
        }else{
            setError('')
            console.log(data.data);
            navigate("/");
        }
    }).catch((err) => {
        console.log(err);
        if(err){
            setError(err.response.data.message)
        }
    }
    )
}

const fetchUserData = async () => {
    await axiosInstance.
    get(`/${id}`)
    .then((data) => {
        if(!data.data){
            return setError('User not found')
        }else{
            setError('')
            setUserCred(data.data);
        }
    }).catch((err) => {
        console.log(err);
        if(err){
            setError(err.response.data.message)
        }
    }
    )}

    useEffect(() => {
            fetchUserData();
    }, [])

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
       <form>
           <h2>Update User</h2>
              <div className="errorMessage">{error}</div>
           <div className='mb-3'>
               <label htmlFor="">Name:</label>
               <input type="text" placeholder='Enter Name' className='form-control' name='name' value={userCred.name} onChange={handleInputChange} />
           </div>
           <div className='mb-3'>
               <label htmlFor="">Email:</label>
               <input type="text" placeholder='Enter Email' className='form-control' name='email' value={userCred.email} onChange={handleInputChange} />
           </div>
           <div className='mb-3'>
               <label htmlFor="">Age:</label>
               <input type="text" placeholder='Enter Age' className='form-control' name='age' value={userCred.age} onChange={handleInputChange} />
           </div>
           <button className='btn btn-success' onClick={(e) => updateCredentials(e)} >Update</button>
       </form>
    </div>

    
   </div>
  )
}

export default UpdateUser