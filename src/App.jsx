import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Users from './Users';
import CreateUser from './CreateUser';
import UpdateUser from './UpdateUser';
import UserRegister from './UserRegister';
import UserLogin from './UserLogin';
import Logout from './Logout';

function App() {

  return (
   <div>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Users/>}></Route>
      <Route path='/create' element={<CreateUser/>}></Route>
      <Route path='/update/:id' element={<UpdateUser/>}></Route>
      <Route path='*' element={<h1>Not Found</h1>}></Route>
      <Route path='/register' element={<UserRegister/>}></Route>
      <Route path='/login' element={<UserLogin/>}></Route>
      <Route path='/logout' element={<Logout/>}></Route>
    </Routes>
    </BrowserRouter>
   </div>
  )
}

export default App;