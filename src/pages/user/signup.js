import { useDispatch } from 'react-redux'
import { useState } from 'react'
import constants from '../../constants';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import GenieLogo from '../../components/images/genieLogo';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignup(e) {
    e.preventDefault();
    fetch(`${constants.backend.API}${constants.backend.SIGNUP}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(async response => {
      if (response.ok) {
        setError("");
        return response.json();
      } else {
        const err = await response.json();
        throw err;
      }
    }).then((data) => {
      dispatch({ type: 'SET_PROFILE', payload: data });
      navigate('/');
    }).catch((error) => {
      setError(error.error);
    });
  }

  return (
    <div className="flex justify-center items-center min-h-dvh bg-primary-light dark:bg-neutral-900">
      <div className='dark:!bg-neutral-700 bg-[#ffffff] lg:w-1/3 w-4/5 flex flex-col p-6 rounded-lg shadow-md gap-4'>
        <div className='w-full flex justify-center'>
          <GenieLogo />
        </div>
        <h2 className='sm:pt-4 pt-2 ml-0 font-semibold sm:text-2xl text-xl text-center'>Get Started</h2>
        {error && <p style={{ color: 'red', margin: 0, padding: 0, textAlign: 'center' }}>{error}</p>}
        <form className='flex flex-col gap-4' onSubmit={handleSignup}>
          <FormControl className='w-full'>
            <FormLabel className="dark:!text-white">Name</FormLabel>
            <Input
              placeholder="Enter your name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
              className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
            />
          </FormControl>
          <FormControl className='w-full'>
            <FormLabel className="dark:!text-white">Username *</FormLabel>
            <Input
              placeholder="Enter your username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
              className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
              required
            />
          </FormControl>
          <FormControl className='w-full'>
            <FormLabel className="dark:!text-white">Password *</FormLabel>
            <Input
              placeholder="Enter your password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
              required
            />
          </FormControl>
          <button
            className={`px-3 py-2 rounded-xl font-semibold text-center flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-black dark:!text-white !bg-primary`}
            type="submit"
          >
            <span className='w-full text-center text-white'>Sign Up</span>
          </button>
        </form>
        <p className='!m-0 !p-0'>Already have an account? <a href="/login" className="!text-primary">Login</a></p>
      </div>
    </div>
  )
}
