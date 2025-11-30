import { useDispatch } from 'react-redux'
import { useState } from 'react'
import constants from '../../constants';
import Input from '@mui/joy/Input';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import GenieLogo from '../../components/images/genieLogo';
import { useNavigate } from 'react-router-dom';
import validateData from '../../utils/validateData';
import { loginLabels } from '../../lib/labels';
import { isEmptyObject } from '../../searchUtils';
import FormError from '../../components/FormError';
import { OutlinedButton } from '../../components/Button';

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();
    const errors = validateData(form, loginLabels);
    if (!isEmptyObject(errors)) {
      setError(errors);
      return;
    }
    fetch(`${constants.backend.API}${constants.backend.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    }).then(async response => {
      if (response.ok) {
        setError({});
        return response.json();
      } else {
        const err = await response.json();
        throw err;
      }
    }).then((data) => {
      dispatch({ type: 'SET_PROFILE', payload: data });
      navigate('/');
    }).catch((error) => {
      setError({ detail: error.error });
    });
  }

  return (
    <div className="flex justify-center items-center min-h-dvh bg-primary-light dark:bg-neutral-900">
      <div className='dark:!bg-neutral-700 bg-[#ffffff] lg:w-1/3 w-4/5 flex flex-col p-6 rounded-xl shadow-md gap-4'>
        <div className='w-full flex justify-center'>
          <GenieLogo />
        </div>
        <h2 className='sm:pt-4 pt-2 ml-0 font-semibold sm:text-2xl text-xl text-center'>Welcome Back</h2>
        {error.detail && <FormError message={error.detail} className="text-center" />}
        <form className='flex flex-col gap-4' onSubmit={handleLogin}>
          <FormControl className='w-full'>
            <FormLabel className="dark:!text-white">Username *</FormLabel>
            <Input
              placeholder="Enter your username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })}
              className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
              required error={error.username ? true : false}
            />
            {error.username && <FormError message={error.username} />}
          </FormControl>
          <FormControl className='w-full'>
            <FormLabel className="dark:!text-white">Password *</FormLabel>
            <Input
              placeholder="Enter your password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })}
              className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
              required error={error.password ? true : false}
            />
            {error.password && <FormError message={error.password} />}
          </FormControl>
          <button
            className={`px-3 py-2 rounded-xl font-semibold text-center flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-black dark:!text-white !bg-primary`}
            type="submit"
          >
            <span className='w-full text-center text-white'>Login</span>
          </button>
          <OutlinedButton
            onClick={() => navigate('/')}
            className="w-full !text-black dark:!text-white text-center items-center justify-center dark:bg-neutral-800"
          >
            <p className='m-0 p-0 w-full'>Use Genie without an account</p>
          </OutlinedButton>
        </form>
        <p className='!m-0 !p-0'>Don't have an account? <a href="/signup" className="!text-primary">Sign Up</a></p>
      </div>
    </div>
  )
}
