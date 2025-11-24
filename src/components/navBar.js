import NumbersIcon from '@mui/icons-material/Numbers';
import { NavLink, useLocation } from 'react-router-dom';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ChairIcon from '@mui/icons-material/Chair';
import CoffeeTwoToneIcon from '@mui/icons-material/CoffeeTwoTone';
import DiamondIcon from '@mui/icons-material/Diamond';
import ContentCutIcon from '@mui/icons-material/ContentCut';
import ProfileMenu from './profileMenu.js';
import { useSelector } from 'react-redux';

import GenieLogo from './images/genieLogo.js';
import constants from '../constants.js';


const NavBar = () => {
  const location = useLocation();
  const username = useSelector(state => state.username);

  const isActive = (path) => {
    return location.pathname === path;
  }

  return (
    location.pathname !== "" ? (
      <div className='nav-bar bg-white/80 dark:bg-neutral-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-700 sticky top-0 z-50 site-nav-bar-padding py-[0.3rem]'>
        <div className='flex flex-row flex-wrap space-y-3 sm:space-y-0 justify-between items-center mx-auto'>

          <div className='flex flex-row justify-center sm:justify-start'>
            <NavLink to="/" className="transform transition-transform duration-200">
              <GenieLogo />
            </NavLink>
          </div>

          <div className='flex sm:justify-center space-x-1 sm:w-max w-fit'>
            <div className='nav flex items-center'>
              <NavLink
                to={constants.paths.FASHION}
                className={`flex items-center flex-col justify-center px-4 py-2 rounded-xl transition-all duration-200 hover:bg-fashion/10 hover:text-fashion !no-underline ${isActive(constants.paths.FASHION) ? "bg-fashion/20 text-fashion font-semibold shadow-sm" : "text-neutral-600 dark:text-neutral-400"}`}
              >
                <CheckroomIcon />
                <span className='lg:block hidden text-sm'>Fashion</span>
              </NavLink>
            </div>

            <div className='nav flex items-center'>
              <NavLink
                to={constants.paths.INTERIOR}
                className={`flex items-center flex-col justify-center px-4 py-2 rounded-xl transition-all duration-200 hover:bg-interior/10 hover:text-interior !no-underline ${isActive(constants.paths.INTERIOR) ? "bg-interior/20 text-interior font-semibold shadow-sm" : "text-neutral-600 dark:text-neutral-400"}`}
              >
                <ChairIcon />
                <span className='lg:block hidden text-sm'>Interior</span>
              </NavLink>
            </div>

            <div className='nav flex items-center'>
              <NavLink
                to={constants.paths.JEWELRY}
                className={`flex items-center flex-col justify-center px-4 py-2 rounded-xl transition-all duration-200 hover:bg-jewelry/10 hover:text-jewelry !no-underline ${isActive(constants.paths.JEWELRY) ? "bg-jewelry/20 text-jewelry font-semibold shadow-sm" : "text-neutral-600 dark:text-neutral-400"}`}
              >
                <DiamondIcon />
                <span className='lg:block hidden text-sm'>Jewelry</span>
              </NavLink>
            </div>

            <div className='nav flex items-center'>
              <NavLink
                to={constants.paths.HAIR}
                className={`flex items-center flex-col justify-center px-4 py-2 rounded-xl transition-all duration-200 hover:bg-hair/10 hover:text-hair-dark !no-underline ${isActive(constants.paths.HAIR) ? "bg-hair/20 text-hair-dark font-semibold shadow-sm" : "text-neutral-600 dark:text-neutral-400"}`}
              >
                <ContentCutIcon />
                <span className='lg:block hidden text-sm'>Hair</span>
              </NavLink>
            </div>

            <div className='nav flex items-center'>
              <NavLink
                to={constants.paths.ID_SEARCH}
                className={`flex items-center flex-col justify-center px-4 py-2 rounded-xl transition-all duration-200 hover:bg-primary/10 hover:text-primary !no-underline ${isActive(constants.paths.ID_SEARCH) ? "bg-primary/20 !text-primary font-semibold shadow-sm" : "text-neutral-600 dark:text-neutral-400"}`}
              >
                <NumbersIcon />
                <span className='lg:block hidden text-sm'>Brands</span>
              </NavLink>
            </div>
          </div>

          <div className='flex items-center sm:w-max md:w-fit justify-center sm:justify-end flex-row gap-4'>
            <a href='https://buymeacoffee.com/anastaciasd' target='_blank' rel='noreferrer' className='hover:text-white hover:!no-underline'>
              <button className='!bg-primary px-3 py-2 rounded-xl text-white flex flex-row lg:space-x-2 items-center transition-all duration-200 transform'>
                <span className='mb-0 lg:block hidden font-semibold'>Support Genie</span>
                <CoffeeTwoToneIcon />
              </button>
            </a>
            {
              username ? (
                <ProfileMenu username={username} />
              ) : (
                <a href='/login' target='_self' rel='noreferrer' className='hover:text-white hover:!no-underline'>
                  <button className='!bg-primary px-3 py-2 rounded-xl text-white flex flex-row lg:space-x-2 items-center transition-all duration-200 transform'>
                    <span className='mb-0 lg:block hidden font-semibold'>Sign In</span>
                  </button>
                </a>
              )
            }
          </div>
        </div>
      </div>
    ) : (null)
  )
}

export default NavBar;
