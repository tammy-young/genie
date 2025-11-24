import StarIcon from '@mui/icons-material/Star';
import constants from '../constants';

export default function WishlistStar({ item, isInWishlist, setIsInWishlist, positionClass = "", userId = null, wishPage = false }) {

  function toggleStar() {
    if (isInWishlist && (wishPage || 'wishId' in item)) {
      const wishId = wishPage ? item.id : item.wishId;
      fetch(`${constants.backend.API}${constants.backend.WISHES}/${wishId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then((response) => {
        if (response.ok) {
          setIsInWishlist(false);
        }
      });
    } else {
      fetch(`${constants.backend.API}${constants.backend.WISHES}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, item })
      }).then((response) => {
        if (response.ok) {
          setIsInWishlist(true);
        }
      });
    }
  }

  return (
    <StarIcon
      className={`${positionClass} cursor-pointer ${isInWishlist ? 'text-yellow-400 drop-shadow-lg' : 'text-neutral-400 hover:text-yellow-300 hover:drop-shadow-lg transition-colors duration-200'}`}
      onClick={toggleStar}
    />
  )
}
