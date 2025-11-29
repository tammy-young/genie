import { useDispatch } from "react-redux";
import ProfilePicture from "../components/profilePicture";
import { useState } from "react";
import { FormControl, FormLabel, Input, FormHelperText } from "@mui/joy";
import constants from "../constants";

export default function EditProfileForm({ profile, setIsEditing }) {
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    ...profile,
    password: "",
    confirmPassword: ""
  });

  function handleEditProfile(e) {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (form.name.trim() === "" || form.username.trim() === "") {
      setError("Name and username cannot be empty");
      return;
    } else {
      setError("");
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
        setError("");
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
      setError(error.error);
    });
  }

  return (
    <form
      className="rounded-xl border-[1px] dark:border-neutral-700 p-6 flex flex-col items-center justify-between w-full gap-3 md:max-w-[75%]"
      onSubmit={handleEditProfile}
    >
      <ProfilePicture username={profile.username} size={120} />
      {error && <p style={{ color: 'red', margin: 0, padding: 0, textAlign: 'center' }}>{error}</p>}
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Name
        </FormLabel>
        <Input
          placeholder='Enter your name' required
          onChange={(e) => { setForm({ ...form, name: e.target.value }) }} value={form.name}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
        />
      </FormControl>
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Username *
        </FormLabel>
        <Input
          placeholder='Enter your username' required
          onChange={(e) => { setForm({ ...form, username: e.target.value }) }} value={form.username}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
        />
      </FormControl>
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Password
        </FormLabel>
        <Input
          placeholder='Enter your new password'
          onChange={(e) => { setForm({ ...form, password: e.target.value }) }} value={form.password}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
          type="password"
        />
        <FormHelperText className="dark:!text-neutral-400">Leave blank to keep current password</FormHelperText>
      </FormControl>
      <FormControl className='w-full'>
        <FormLabel className="dark:!text-white">
          Confirm New Password
        </FormLabel>
        <Input
          placeholder='Enter your new password'
          onChange={(e) => { setForm({ ...form, confirmPassword: e.target.value }) }} value={form.confirmPassword}
          className='dark:!bg-neutral-800 dark:!text-white dark:placeholder:!text-neutral-400'
          type="password" required={form.password !== ""}
        />
        <FormHelperText className="dark:!text-neutral-400">Leave blank if not changing password</FormHelperText>
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
          type="submit"
        >
          <span className='mb-0 font-semibold'>Cancel</span>
        </button>
      </div>
    </form>
  )
}
