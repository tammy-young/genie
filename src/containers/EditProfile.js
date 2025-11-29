import { useDispatch } from "react-redux";
import ProfilePicture from "../components/profilePicture";
import { useState } from "react";
import { FormControl, FormLabel, Input, FormHelperText } from "@mui/joy";
import constants from "../constants";
import validateData from "../utils/validateData";
import { editProfileLabels } from "../lib/labels";
import { isEmptyObject } from "../searchUtils";
import FormError from "../components/FormError";

export default function EditProfileForm({ profile, setIsEditing }) {
  const [error, setError] = useState({});
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    ...profile,
    password: "",
    confirmPassword: ""
  });

  function handleEditProfile(e) {
    e.preventDefault();
    const errors = validateData(form, editProfileLabels);
    if (!isEmptyObject(errors)) {
      setError(errors);
      return;
    }

    fetch(`${constants.backend.API}${constants.backend.USERS}/${profile.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: form.name,
        username: form.username,
        ...(form.password !== "" && { password: form.password })
      })
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
      setForm({ ...data, password: "", confirmPassword: "" });
      setIsEditing(false);
    }).catch((error) => {
      setError({ detail: error.error });
    });
  }

  return (
    <form
      className="rounded-xl border-[1px] dark:border-neutral-700 p-6 flex flex-col items-center justify-between w-full gap-3 md:max-w-[75%]"
      onSubmit={handleEditProfile}
    >
      <ProfilePicture username={profile.username} size={120} />
      {error.detail && <p style={{ color: 'red', margin: 0, padding: 0, textAlign: 'center' }}>{error.detail}</p>}
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Name
        </FormLabel>
        <Input
          placeholder='Enter your name'
          onChange={(e) => { setForm({ ...form, name: e.target.value }) }} value={form.name}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
          error={error.name ? true : false}
        />
        {error.name && <FormError message={error.name} />}
      </FormControl>
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Username *
        </FormLabel>
        <Input
          placeholder='Enter your username' required
          onChange={(e) => { setForm({ ...form, username: e.target.value }) }} value={form.username}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
          error={error.username ? true : false}
        />
        {error.username && <FormError message={error.username} />}
      </FormControl>
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Password
        </FormLabel>
        <Input
          placeholder='Enter your new password'
          onChange={(e) => { setForm({ ...form, password: e.target.value }) }} value={form.password}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
          type="password" error={error.password ? true : false}
        />
        {error.password ? <FormError message={error.password} /> : <FormHelperText className="dark:!text-neutral-400">Leave blank to keep current password</FormHelperText>}
      </FormControl>
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Confirm New Password
        </FormLabel>
        <Input
          placeholder='Enter your new password'
          onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }) }} value={form.confirmPassword}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
          type="password" required={form.password !== ""} error={error.confirmPassword ? true : false}
        />
        {error.confirmPassword ? <FormError message={error.confirmPassword} /> : <FormHelperText className="dark:!text-neutral-400">Leave blank if not changing password</FormHelperText>}
      </FormControl>
      <div className="flex flex-row gap-4">
        <button
          className={`px-3 py-2 !bg-primary rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-white`}
          type="submit"
        >
          <span className='mb-0 font-semibold'>Save</span>
        </button>
        <button
          className={`px-3 py-2 bg-neutral-500 rounded-xl flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-white`}
          type="button"
          onClick={() => setIsEditing(false)}
        >
          <span className='mb-0 font-semibold'>Cancel</span>
        </button>
      </div>
    </form>
  )
}
