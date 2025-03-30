import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext';
import axiosInstance from './axiosConfig';



const CreateUser = () => {
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


  const handleInputChange = (e) =>{
    setUserCred(prev =>{
      return {...prev, [e.target.name]: e.target.value}
    })
  }


const createCredentials = async (e) => {
e.preventDefault();
setError('');
   await axiosInstance
    .post(`/create`, userCred)
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
};


  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
     <div className='w-50 bg-white rounded p-3'>
        <form>
            <h2>Add User</h2>
            <div className="errorMessage">{error}</div>
            <div className='mb-3'>
                <label htmlFor="">Name:</label>
                <input type="text" placeholder='Enter Name' name='name' value={userCred.name} onChange={handleInputChange} className='form-control' />
            </div>
            <div className='mb-3'>
                <label htmlFor="">Email:</label>
                <input type="text" placeholder='Enter Email' name='email' className='form-control' value={userCred.email} onChange={handleInputChange} />
            </div>
            <div className='mb-3'>
                <label htmlFor="">Age:</label>
                <input type="text" placeholder='Enter Age' name='age' className='form-control' value={userCred.age} onChange={handleInputChange}/>
            </div>
            <button className='btn btn-success' onClick={createCredentials}>Submit</button>
        </form>
     </div>

     
    </div>
  )
}

export default CreateUser;