
const ItemImage = ({ itemId }) => {
  return (
    <div className="flex justify-center pb-3">
      {
        process.env.REACT_APP_ENV === "dev" ? (
          <div className="bg-neutral-100 dark:bg-neutral-700 p-4 w-full sm:h-44 h-56 lg:h-56 rounded flex justify-center items-center">
            {/* eslint-disable-next-line */}
            <img src={`http://cdn.stardoll.com/itemimages/76/0/98/${itemId}.png`} className="h-full" alt="Image not found"></img>
          </div>
        ) : (
          <a className="bg-neutral-200 dark:bg-neutral-700 w-full sm:h-44 h-56 lg:h-56 rounded flex justify-center items-center text-primary-dark dark:!text-primary cursor-pointer hover:!text-primary dark:hover:!text-primary-light hover:no-underline"
            href={`http://cdn.stardoll.com/itemimages/76/0/98/${itemId}.png`} target="_blank" rel="noreferrer">
            <p>Click to view image</p>
          </a>
        )
      }
    </div>
  )
}

export default ItemImage;
