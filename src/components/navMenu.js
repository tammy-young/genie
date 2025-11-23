import GenieLogo from './images/genieLogo.js';
import { NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import NumbersIcon from '@mui/icons-material/Numbers';
import constants from '../constants.js';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';
import DiamondIcon from '@mui/icons-material/Diamond';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ProfileMenu from './profileMenu.js';
import { useSelector } from 'react-redux';


function NavDropdown({ isActive }) {
  return (
    <Dropdown>
      <MenuButton className="!border-none !bg-gray-100 dark:!bg-neutral-800 hover:!bg-gray-200 dark:hover:!bg-neutral-700 !text-gray-700 dark:!text-white rounded-xl p-2 transition-all duration-200 transform hover:scale-105">
        <MenuIcon />
      </MenuButton>

      <Menu
        placement="bottom-end"
        className="!bg-white/95 dark:!bg-neutral-800/95 backdrop-blur-sm !border border-gray-200 dark:!border-neutral-700 !rounded-2xl !shadow-2xl !min-w-[200px] !p-2"
      >
        <MenuItem className='!p-0 !bg-transparent hover:!bg-fashion/10 dark:hover:!bg-fashion/20 !rounded-xl !mb-1'>
          <NavLink
            to={constants.paths.FASHION}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
          >
            <span className={`font-semibold ${isActive(constants.paths.FASHION) ? "text-fashion" : "text-gray-700 dark:text-white"}`}>
              Fashion
            </span>
            <CheckroomIcon className={`${isActive(constants.paths.FASHION) ? "text-fashion" : "text-gray-500 dark:text-gray-400"}`} />
          </NavLink>
        </MenuItem>

        <MenuItem className='!p-0 !bg-transparent hover:!bg-interior/10 dark:hover:!bg-interior/20 !rounded-xl !mb-1'>
          <NavLink
            to={constants.paths.INTERIOR}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
          >
            <span className={`font-semibold ${isActive(constants.paths.INTERIOR) ? "text-interior" : "text-gray-700 dark:text-white"}`}>
              Interior
            </span>
            <ChairIcon className={`${isActive(constants.paths.INTERIOR) ? "text-interior" : "text-gray-500 dark:text-gray-400"}`} />
          </NavLink>
        </MenuItem>

        <MenuItem className='!p-0 !bg-transparent hover:!bg-jewelry/10 dark:hover:!bg-jewelry/20 !rounded-xl !mb-1'>
          <NavLink
            to={constants.paths.JEWELRY}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
          >
            <span className={`font-semibold ${isActive(constants.paths.JEWELRY) ? "text-jewelry" : "text-gray-700 dark:text-white"}`}>
              Jewelry
            </span>
            <DiamondIcon className={`${isActive(constants.paths.JEWELRY) ? "text-jewelry" : "text-gray-500 dark:text-gray-400"}`} />
          </NavLink>
        </MenuItem>

        <MenuItem className='!p-0 !bg-transparent hover:!bg-hair/10 dark:hover:!bg-hair/20 !rounded-xl !mb-1'>
          <NavLink
            to={constants.paths.HAIR}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
          >
            <span className={`font-semibold ${isActive(constants.paths.HAIR) ? "text-hair-dark dark:text-hair" : "text-gray-700 dark:text-white"}`}>
              Hair
            </span>
            <ContentCutIcon className={`${isActive(constants.paths.HAIR) ? "text-hair-dark dark:text-hair" : "text-gray-500 dark:text-gray-400"}`} />
          </NavLink>
        </MenuItem>

        <MenuItem className='!p-0 !bg-transparent hover:!bg-primary/10 dark:hover:!bg-primary/20 !rounded-xl'>
          <NavLink
            to={constants.paths.ID_SEARCH}
            className="nav-link !flex items-center justify-between w-full !p-3 !no-underline hover:!no-underline"
          >
            <span className={`font-semibold ${isActive(constants.paths.ID_SEARCH) ? "!text-primary" : "text-gray-700 dark:text-white"}`}>
              Brands
            </span>
            <NumbersIcon className={`${isActive(constants.paths.ID_SEARCH) ? "!text-primary" : "text-gray-500 dark:text-gray-400"}`} />
          </NavLink>
        </MenuItem>
      </Menu>
    </Dropdown>
  )
}


const NavMenu = () => {

  const location = useLocation();
  const username = useSelector(state => state.username);

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    <div className="bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-700 sticky top-0 z-50 px-4 py-2">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className='flex flex-row justify-center sm:justify-start'>
          <NavLink to="/" className="transform hover:scale-105 transition-transform duration-200">
            <GenieLogo />
          </NavLink>
        </div>

        <div className='flex items-center flex-row gap-3'>
          <a href='https://buymeacoffee.com/anastaciasd' target='_blank' rel='noreferrer' className='hover:text-white hover:!no-underline'>
            <button className='!bg-primary p-2 rounded-xl text-white flex items-center transition-all duration-200 transform hover:scale-105'>
              <CoffeeTwoToneIcon />
            </button>
          </a>

          <ProfileMenu username={username} />

          <NavDropdown isActive={isActive} />

        </div>
      </div>
    </div>
  )
}

export default NavMenu;
