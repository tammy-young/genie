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


const NavMenu = () => {

  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    <div className="flex justify-between items-center">
      <div className='flex flex-row justify-center sm:justify-start mt-2'>
        <NavLink to="/">
          <GenieLogo />
        </NavLink>
      </div>

      <div className='flex space-x-4'>
        <a href='https://buymeacoffee.com/anastaciasd' target='_blank' rel='noreferrer' className='hover:text-white hover:!no-underline'>
          <button className='!bg-primary p-2 rounded text-white flex flex-row items-center'>
            <CoffeeTwoToneIcon />
          </button>
        </a>

        <Dropdown>
          <MenuButton
            className="!border-none dark:hover:!bg-neutral-700 dark:!text-white"
          >
            <MenuIcon />
          </MenuButton>
          <Menu placement="bottom-end" className="dark:!bg-neutral-800 w-1/3 !border-none">
            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.FASHION} className={"nav-link items-center p-0 !flex justify-between w-full"}>
                <p className={`m-0 p-0 font-bold ${isActive(constants.paths.FASHION) ? "!text-fashion" : "!text-black dark:!text-white"}`}>Fashion</p>
                <CheckroomIcon className={`${isActive(constants.paths.FASHION) ? "!text-fashion" : "!text-black dark:!text-white"}`} />
              </NavLink>

            </MenuItem>
            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.INTERIOR} className={"nav-link items-center p-0 !flex justify-between w-full"}>
                <p className={`m-0 p-0 font-bold ${isActive(constants.paths.INTERIOR) ? "!text-interior" : "!text-black dark:!text-white"}`}>Interior</p>
                <ChairIcon className={`${isActive(constants.paths.INTERIOR) ? "!text-interior" : "!text-black dark:!text-white"}`} />
              </NavLink>
            </MenuItem>
            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.JEWELRY} className={"nav-link items-center p-0 !flex justify-between w-full"}>
                <p className={`m-0 p-0 font-bold ${isActive(constants.paths.JEWELRY) ? "!text-jewelry" : "!text-black dark:!text-white"}`}>Jewelry</p>
                <DiamondIcon className={`${isActive(constants.paths.JEWELRY) ? "!text-jewelry" : "!text-black dark:!text-white"}`} />
              </NavLink>
            </MenuItem>
            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.HAIR} className={"nav-link items-center p-0 !flex justify-between w-full"}>
                <p className={`m-0 p-0 font-bold ${isActive(constants.paths.HAIR) ? "!text-hair" : "!text-black dark:!text-white"}`}>Hair</p>
                <ContentCutIcon className={`${isActive(constants.paths.HAIR) ? "!text-hair" : "!text-black dark:!text-white"}`} />
              </NavLink>
            </MenuItem>

            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.ID_SEARCH} className={"nav-link items-center p-0 !flex justify-between w-full"}>
                <p className={`m-0 p-0 font-bold ${isActive(constants.paths.ID_SEARCH) ? "!text-primary" : "!text-black dark:!text-white"}`}>Brands</p>
                <NumbersIcon className={`${isActive(constants.paths.ID_SEARCH) ? "!text-primary" : "!text-black dark:!text-white"}`} />
              </NavLink>
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavMenu;
