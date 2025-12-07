import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import constants from "../../constants";
import ItemCard from "../../components/itemCard";
import StarIcon from '@mui/icons-material/Star';

export default function Wishes() {
  const [page, setPage] = useState(1);
  const [wishesData, setWishesData] = useState({});
  const userId = useSelector(state => state.id);
  const [brands, setBrands] = useState({});

  function getBrands() {
    fetch(`${constants.backend.API}${constants.backend.GET_BRANDS}?onlySellable=true`)
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.brands);
      });
  }

  function goToPage(newPage) {
    setPage(newPage);
    window.scrollTo({ top: 0 });
  }

  useEffect(() => {
    function fetchWishes() {
      fetch(`${constants.backend.API}${constants.backend.WISHES}?userId=${userId}&page=${page}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(async response => {
        if (response.ok) {
          return response.json();
        } else {
          const err = await response.json();
          throw err;
        }
      }).then((data) => {
        if (data.pagination.currentPage > data.pagination.totalPages && data.pagination.totalItems > 0) {
          setPage(1);
          return;
        }
        setWishesData(data);
      }).catch((error) => {
        // console.error('Error fetching wishes:', error);
      });
    }

    fetchWishes();
    // eslint-disable-next-line
  }, [page]);

  useEffect(() => {
    document.title = 'My Wishes | Genie';

    if (!userId) {
      window.location.href = '/login';
      return;
    }

    getBrands();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='flex flex-col min-h-full relative site-padding pb-8'>
      <div className='sticky top-0 bg-white/95 dark:!bg-neutral-900/80 dark:text-neutral-100 z-50 pb-2'>
        <h2 className='sm:pt-4 pt-2 ml-0 font-bold sm:text-3xl text-2xl'>My Wishes</h2>
      </div>
      <div className='flex flex-wrap w-full sm:gap-4 justify-center pb-4 sm:space-y-0 space-y-4 mt-1'>
        {
          wishesData.wishes?.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-center">
              You have no wishes yet.<br />Add wishes by clicking the <StarIcon className="inline-block mb-1 text-neutral-400" /> on the items you like.
            </p>
          ) : (
            wishesData.wishes?.map((item) => (
              <ItemCard key={item.id} item={item} userId={userId} wishPage allBrands={brands} />
            ))
          )
        }
      </div>
      <div className="flex flex-row justify-between items-center">
        <button
          className={`px-3 py-2 rounded-xl font-semibold text-center flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-black dark:!text-white !bg-primary disabled:opacity-50`}
          onClick={() => goToPage(page - 1)}
          disabled={page === 1}
        >
          <span className='w-full text-center text-white'>Previous</span>
        </button>
        <p className="text-center text-neutral-700 dark:text-neutral-300 self-center">
          {page} / {wishesData.pagination?.totalPages || 1}
        </p>
        <button
          className={`px-3 py-2 rounded-xl font-semibold text-center flex flex-row lg:space-x-2 items-center transition-all duration-200 transform !text-black dark:!text-white !bg-primary disabled:opacity-50`}
          onClick={() => goToPage(page + 1)}
          disabled={page >= (wishesData.pagination?.totalPages || 1)}
        >
          <span className='w-full text-center text-white'>Next</span>
        </button>
      </div>
    </div>
  )
}
