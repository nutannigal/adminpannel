import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [email,setEmail]=useState('admin@gmail.com');
  const[password,setPassword]=useState('admin123');
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();

  const { login }=useContext(AuthContext);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    setLoading(true);
    setError('');
      try{
        const res =await axios.post('http://localhost:5000/api/auth/login',{
          email,
          password
        });
        login(res.data.token);
        navigate('/admin');
      }catch (err){
        setError(err.response?.data?.msg || 'Login faild');

      }finally{
        setLoading(false);
      }
      };
    
  

  return (
    <div className='row justify-content-center'>
      <div className='col-md-4'>
        <div className='card mt-4'>
          <div className='card-header'>Admin login</div>
          <div className='card-body'>
            {error && <div className='alert alert-danger'>{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label>Email</label>
                <input type="email" className='form-control' autoComplete='username' value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

               <div className='mb-3'>
                <label>Password</label>
                <input type="password" className='form-control' id='password' autoComplete='current-password' value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <button type='submit' className='btn btn-primary w-100 disabled={loading}'>{loading ? 'Logging in ...':'Login'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login