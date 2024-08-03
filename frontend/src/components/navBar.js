import SearchIcon from '@mui/icons-material/Search';
import NumbersIcon from '@mui/icons-material/Numbers';
import GenieIcon from './images/genieLogo.js';
import constants from '../constants.js';

const NavBar = () => {
    return (
        <div className='row'>
            <div className='col' style={{ padding: '0px', textAlign: 'left', width: 'fit-content', maxWidth: 'fit-content' }}>
                <GenieIcon />
            </div>
            <div className='col' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content' }} data-nav-id={ 0 }>
                <div onClick={() => window.location.href = constants.paths.SEARCH } style={{ cursor: 'pointer' }}>
                    Search <SearchIcon />
                </div>
            </div>
            <div className='col' style={{ display: 'flex', alignItems: 'center', maxWidth: 'fit-content' }} data-nav-id={ 0 }>
                <div onClick={() => window.location.href = constants.paths.ID_SEARCH } style={{ cursor: 'pointer' }}>
                    Id Number Search <NumbersIcon />
                </div>
            </div>
            <div className='col'></div>
        </div>
    )
}

export default NavBar;
