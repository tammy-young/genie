import NumbersIcon from '@mui/icons-material/Numbers';
import { NavLink, useLocation } from 'react-router-dom';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ChairIcon from '@mui/icons-material/Chair';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';

import GenieLogo from './images/genieLogo.js';
import constants from '../constants.js';


const NavBar = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    location.pathname !== "" ? (
      <div className='nav-bar flex flex-col sm:flex-row flex-wrap space-y-3 sm:space-y-0 sm:justify-between pt-3 overflow-auto'>
        <div className='flex flex-row justify-center sm:justify-start p-0'>
          <NavLink to="/">
            <GenieLogo />
          </NavLink>
        </div>
        <div className='flex justify-center space-x-3'>
          <div className='nav' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content', paddingRight: '0px' }} >
            <NavLink to={constants.paths.FASHION} className={"nav-link" + (isActive(constants.paths.FASHION) ? " fashion-selected" : "")} style={{ display: 'flex' }}>
              <div>Fashion</div>
              <div><CheckroomIcon /></div>
            </NavLink>
          </div>
          <div className='nav' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content', paddingRight: '0px' }} >
            <NavLink to={constants.paths.INTERIOR} className={"nav-link" + (isActive(constants.paths.INTERIOR) ? " interior-selected" : "")} style={{ display: 'flex' }}>
              <div>Interior</div>
              <div><ChairIcon /></div>
            </NavLink>
          </div>
          <div className='nav' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content' }} >
            <NavLink to={constants.paths.ID_SEARCH} className={"nav-link" + (isActive(constants.paths.ID_SEARCH) ? " selected" : "")} style={{ display: 'flex' }}>
              Brands <div><NumbersIcon /></div>
            </NavLink>
          </div>
        </div>
        <div className='flex items-center w-full md:w-fit justify-center sm:justify-end'>
          <a href='https://buymeacoffee.com/anastaciasd' target='_blank' rel='noreferrer' className='hover:text-white hover:!no-underline'>
            <button className='!bg-primary p-2 rounded text-white flex flex-row space-x-1 items-center'>
              <p className='mb-0'>Support Genie</p>
              <CoffeeTwoToneIcon />
            </button>
          </a>
        </div>
      </div>
    ) : (null)
  )
}

export default NavBar;
