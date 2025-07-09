
import { useNavigate } from 'react-router-dom';
import GenieLogo from '../components/images/genieLogo';
import constants from '../constants';
import Button from '@mui/joy/Button';

function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate(constants.paths.FASHION);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 -mt-12">

      {/* Genie Logo with Enhanced Animation */}
      <div className="flex justify-center items-center">
        <GenieLogo />
      </div>

      <div className='flex sm:flex-row flex-col sm:gap-8 gap-2 sm:text-left text-center'>
        <div className="text-8xl md:text-9xl font-bold !text-primary">
          404
        </div>

        <div className="flex flex-col sm:text-left">
          <div className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-neutral-100">
            Oops...
          </div>
          <p className="text-neutral-600 dark:text-neutral-300 text-lg md:text-xl max-w-md mx-auto sm:!leading-relaxed">
            Looks like this page doesn't exist!
          </p>
          <Button className={`btn !bg-primary !h-fit !normal-case`} onClick={handleGoHome}>
            Go Home
          </Button>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
