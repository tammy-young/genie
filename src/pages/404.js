
import GenieLogo from '../components/images/genieLogo';

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 -mt-12">

      <div className='flex flex-row justify-center sm:justify-start'>
        <div className="transform hover:scale-105 transition-transform duration-200">
          <GenieLogo />
        </div>
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
          <a href='/' target='_self' rel='noreferrer' className='hover:text-white hover:!no-underline'>
            <button className='!bg-primary px-3 py-2 rounded-xl text-white flex flex-row lg:space-x-2 items-center transition-all duration-200 transform hover:scale-105 w-full !text-center'>
              <span className='mb-0 font-semibold w-full'>Go Home</span>
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
