import ProfilePicture from './profilePicture.js';
import Dropdown from '@mui/joy/Dropdown';
import MenuButton from '@mui/joy/MenuButton';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import constants from '../constants.js';
import Person2Icon from '@mui/icons-material/Person2';
import StarIcon from '@mui/icons-material/Star';
import LogoutIcon from '@mui/icons-material/Logout';
import { Modal, Box } from '@mui/material';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { style } from '../components/filters/containers/filterModal.js';


export function LogoutModal({ open, onClose }) {
  const dispatch = useDispatch();

  function handleLogout() {
    onClose();
    dispatch({ type: 'LOGOUT', payload: {} });
    window.location.reload();
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="logout-modal-title"
      aria-describedby="logout-modal-description"
    >
      <Box sx={style} className="dark:!bg-neutral-800 dark:!text-white p-4 w-[95%] sm:w-3/5 lg:w-2/5 !rounded-lg">
        <div className='p-4 flex flex-col gap-4'>
          <div className="flex justify-between items-center">
            <h1 className="font-bold mb-0">Confirm Logout</h1>
          </div>
          <hr className="dark:border-neutral-500" />
          <p>Are you sure you want to logout?</p>
          <div className='flex justify-end space-x-4'>
            <button
              className='px-4 py-2 font-semibold rounded-xl bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-200 dark:hover:bg-neutral-500 transition-all duration-200'
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className='px-4 py-2 font-semibold rounded-xl bg-red-500 text-white hover:bg-red-600 transition-all duration-200'
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  )
}


export default function ProfileMenu({ username }) {
  const location = useLocation();
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  }
  return (
    <Dropdown>
      <MenuButton className="!border-none !rounded-full transition-all duration-200 transform hover:!bg-transparent w-min !p-0 !m-0">
        <ProfilePicture username={username} />
      </MenuButton>
      <Menu
        placement="bottom-end"
        className="!bg-white/95 dark:!bg-neutral-800/95 backdrop-blur-sm !border border-gray-200 dark:!border-neutral-700 !rounded-2xl !shadow-2xl !min-w-[200px] !p-2"
      >
        <MenuItem className='!p-0 !bg-transparent hover:!bg-primary/10 dark:hover:!bg-primary/20 !rounded-xl !mb-1'>
          <NavLink
            to={constants.paths.PROFILE}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
          >
            <span className={`font-semibold ${isActive(constants.paths.PROFILE) ? "!text-primary" : "text-gray-700 dark:text-white"}`}>
              Profile
            </span>
            <Person2Icon className={`${isActive(constants.paths.PROFILE) ? "!text-primary" : "text-gray-500 dark:text-gray-400"}`} />
          </NavLink>
        </MenuItem>
        <MenuItem className='!p-0 !bg-transparent hover:!bg-primary/10 dark:hover:!bg-primary/20 !rounded-xl !mb-1'>
          <NavLink
            to={constants.paths.WISHES}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
          >
            <span className={`font-semibold ${isActive(constants.paths.WISHES) ? "!text-primary" : "text-gray-700 dark:text-white"}`}>
              Wishes
            </span>
            <StarIcon className={`${isActive(constants.paths.WISHES) ? "!text-primary" : "text-gray-500 dark:text-gray-400"}`} />
          </NavLink>
        </MenuItem>
        <MenuItem className='!p-0 !bg-transparent hover:!bg-primary/10 dark:hover:!bg-primary/20 !rounded-xl !mb-1'>
          <NavLink
            // to={constants.paths.WISHES}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
            onClick={() => setLogoutModalOpen(true)}
          >
            <span className={`font-semibold text-gray-700 dark:text-white`}>
              Logout
            </span>
            <LogoutIcon className={`text-gray-500 dark:text-gray-400`} />
          </NavLink>
        </MenuItem>
      </Menu>
      <LogoutModal open={logoutModalOpen} onClose={() => setLogoutModalOpen(false)} />
    </Dropdown>
  );
}
