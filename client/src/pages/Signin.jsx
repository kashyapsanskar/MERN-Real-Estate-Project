// import { useState } from 'react'
// import { Link,useNavigate} from 'react-router-dom'
 

// export default function Signup() {
//   const [formData,setFormData]=useState({})
//   const[error,setError]=useState(null);
//   const[loading,setLoading]=useState(false);
//   const navigate=useNavigate();
//   const handleChange=(e)=>{
//     setFormData(
//       {
//         ...formData, //spread operaator it is showing in conesole
//         [e.target.id]:e.target.value,
//       }
//     )
    
//   }
//   const handleSubmit=async(e)=>{
//     e.preventDefault();
//     try {setLoading(true);
//       const res=await fetch('/api/auth/signup',{
//         method:'POST',
//         headers:{
//           'Content-Type':'application/json',
//         },
//         body:JSON.stringify(formData),
//       });
//       const data=await res.json();
//       console.log(data); 
//       if(data.success===false){
//         setLoading(false);
//         setError(data.message);
        
//         return;
//       }
//       setLoading(false);
//       setError(null); 
//       navigate('/sign-in');
      
//     } catch (error) {
//       setLoading(false);
//       setError(error.message);
      
      
//     }
    
//     // setLoading(false);
    
//     // console.log(data);
    
//      //if we dont make this function then refresh hoga
//   }
//   // console.log(formData);
//   return (
//     <div className='p-3 max-w-lg mx-auto'>
//       <h1 className='text-3xl text-center
//       font font-semibold my-7'>Signup</h1>
//       <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
//         <input type="text" placeholder='username'
//         className='border p-3 rounded-lg'id = 'username' onChange={handleChange}/>
//         <input type="email" placeholder='email'
//         className='border p-3 rounded-lg'id = 'email'onChange={handleChange}/>
//         <input type="password" placeholder='password'
//         className='border p-3 rounded-lg'id = 'password'onChange={handleChange}/>
//         <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 
//         disabled:opacity-80'>
//           {loading?'LOADING...': 'Sign up'}
//           </button>
//       </form>
//       <div className='flex gap-2 mt-5'>
//         <p>Have an account?</p>
//         <Link to ={"/sign-in"}>
//           <span className='text-blue-700'>Sign in</span>
//         </Link>
//       </div> 
//       {error && <p className='text-red-500 mt-5'>{error}</p> }
//     </div>
//   )
// }
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useDispatch,useSelector } from 'react-redux';
// import OAuth from '../components/OAuth';
import { signInStart } from '../redux/user/userSlice';
import { signInSuccess } from '../redux/user/userSlice';
import { signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';


export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
      dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/');
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        
        <input
          type='email'
          placeholder='email'
          className='border p-3 rounded-lg'
          id='email'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          className='border p-3 rounded-lg'
          id='password'
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <OAuth/>
        
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont Have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  );
}