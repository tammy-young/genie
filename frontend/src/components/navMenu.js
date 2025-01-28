import GenieLogo from './images/genieLogo.js';
import { NavLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import Dropdown from '@mui/joy/Dropdown';
import IconButton from '@mui/joy/IconButton';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import ChairIcon from '@mui/icons-material/Chair';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import NumbersIcon from '@mui/icons-material/Numbers';
import constants from '../constants.js';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';


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
            slots={{ root: IconButton }}
            slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            className="!border-none dark:hover:!bg-neutral-700"
          >
            <MenuIcon />
          </MenuButton>
          <Menu placement="bottom-end" className="dark:!bg-neutral-800 w-1/3 !border-none">
            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.FASHION} className={"nav-link p-0 !flex justify-between w-full" + (isActive(constants.paths.FASHION) ? " fashion-selected" : "")}>
                <div className='font-bold'>Fashion</div>
                <CheckroomIcon />
              </NavLink>

            </MenuItem>
            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.INTERIOR} className={"nav-link p-0 !flex justify-between w-full" + (isActive(constants.paths.INTERIOR) ? " interior-selected" : "")}>
                <div className='font-bold'>Interior</div>
                <ChairIcon />
              </NavLink>
            </MenuItem>
            <MenuItem className='dark:!text-white dark:hover:!bg-neutral-700'>
              <NavLink to={constants.paths.ID_SEARCH} className={"nav-link p-0 !flex justify-between w-full" + (isActive(constants.paths.ID_SEARCH) ? " selected" : "")}>
                <div className='font-bold'>Brands</div>
                <NumbersIcon />
              </NavLink>
            </MenuItem>
          </Menu>
        </Dropdown>
      </div>
    </div>
  )
}

export default NavMenu;
