import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from './axiosConfig'

const Users = () => {
    const [users, setUsers] = useState([])


const getDetails  = async () =>{
    axiosInstance.
    get('/')
    .then((data) => {
        setUsers(data.data);
        
    }).catch((err) => console.log(err)
    )
}

const deleteDetail = async (_id) => {
    await axiosInstance.
    delete(`/delete`, {data: {_id}})
    .then(() => {
        getDetails();
    }).catch((err) => console.log(err)
    )
};

useEffect(() => {
    getDetails();
}, []);

  return (
    <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
     <div className='w-50 bg-white rounded p-3'>
        <Link to='/create' className='btn btn-success'>Add +</Link>
        <Link to={`/logout`} className='btn btn-danger ms-2'>Logout</Link>
        <table className='table'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user) => {
                   return     <tr key={user._id}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.age}</td>
                            <td>
                            <Link to={`/update/${user._id}`} className='btn btn-success'>Update</Link><button className='btn btn-danger' onClick={()=>deleteDetail(user._id)}>Delete</button>
                                </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
     </div>
    </div>
  )
}

export default Users;