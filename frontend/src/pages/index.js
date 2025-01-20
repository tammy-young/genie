import GenieIcon from '../components/images/genieIcon';
import constants from '../constants';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ChairIcon from '@mui/icons-material/Chair';

const searchTypes = [
  {
    name: 'Fashion',
    path: constants.paths.FASHION,
    colour: constants.colors.FASHION,
    icon: <CheckroomIcon className='!text-8xl !fill-fashion-dark' />
  },
  {
    name: 'Interior',
    path: constants.paths.INTERIOR,
    colour: constants.colors.INTERIOR,
    icon: <ChairIcon className='!text-8xl !fill-interior-dark' />
  }
]

const Index = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center'>
      <div className="flex flex-col w-1/2 justify-center items-center text-center space-y-4 pb-4 dark:bg-neutral-800 p-12 rounded-lg shadow-lg">

        <div className='w-full flex flex-col justify-center items-center'>
          <GenieIcon />
          <h1 className="font-bold mb-[0.1rem]">Your wish is my command</h1>
        </div>

        <p className='pb-3'>What are you searching for?</p>

        <div className='w-full flex flex-row gap-4 justify-center items-center flex-wrap'>
          {
            searchTypes.map((type, index) => (
              <a className={`sm:w-1/2 w-full max-w-[300px] !py-8 cursor-pointer flex justify-center items-center
                transition duration-300 hover:shadow-md font-bold rounded text-white
                hover:no-underline hover:text-inherit focus:outline-none ${type.name.toLowerCase()}`}
                key={index} href={type.path}>
                <p className='text-5xl mb-0 z-[999]'>{type.name}</p>
                <div className='absolute'>
                  {type.icon}
                </div>
              </a>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Index;
