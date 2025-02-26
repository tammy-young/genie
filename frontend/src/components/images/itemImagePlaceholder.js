
const ItemImage = ({ itemId }) => {
  return (
    <div className="flex justify-center pb-3">
      {
        process.env.REACT_APP_ENV === "dev" ? (
          <div className="bg-neutral-200 dark:bg-neutral-700 p-4 w-44 max-w-44 sm:w-[min(75%,15rem)] h-44 max-h-44 rounded flex justify-center items-center">
            {/* eslint-disable-next-line */}
            <img src={`http://cdn.stardoll.com/itemimages/76/0/98/${itemId}.png`} className="h-full" alt="Image not found"></img>
          </div>
        ) : (
          <a className="bg-neutral-200 dark:bg-neutral-700 w-44 sm:w-[min(75%,15rem)] h-44 rounded flex justify-center items-center cursor-pointer hover:text-primary hover:no-underline"
            href={`http://cdn.stardoll.com/itemimages/76/0/98/${itemId}.png`} target="_blank" rel="noreferrer">
            <p>Click to view image</p>
          </a>
        )
      }
    </div>
  )
}

export default ItemImage;
