
const ItemImage = ({ itemId, itemType }) => {
  let imgSRC = `http://cdn.stardoll.com/itemimages/76/0/98/${itemId}.png`;
  let linkDesign = "";
  
  if (itemType === "hair") {
    const strItemId = itemId.toString();
    const folder2 = strItemId.substring(0, 3);
    const folder3 = parseInt(strItemId.substring(3, 6), 10);
    imgSRC = `http://cdn.stardoll.com/customitems/130/${folder2}/${folder3}/${itemId}.png`;
  }

  if (itemType === "fashion") {
    linkDesign = "text-fashion-dark dark:!text-fashion hover:!text-fashion dark:hover:!text-fashion-light";
  } else if (itemType === "interior") {
    linkDesign = "text-interior-dark dark:!text-interior hover:!text-interior dark:hover:!text-interior-light";
  } else if (itemType === "jewelry") {
    linkDesign = "text-jewelry-dark dark:!text-jewelry hover:!text-jewelry dark:hover:!text-jewelry-light";
  } else if (itemType === "hair") {
    linkDesign = "text-hair-dark dark:!text-hair hover:!text-primary dark:hover:!text-hair-light";
  }

  return (
    <div className="flex justify-center pb-3">
      {
        process.env.REACT_APP_ENV === "dev" ? (
          <div className="bg-neutral-100 dark:bg-neutral-700 p-4 w-full sm:h-44 h-56 lg:h-56 rounded flex justify-center items-center">
            {/* eslint-disable-next-line */}
            <img src={imgSRC} className="h-full" alt="Image not found"></img>
          </div>
        ) : (
          <a className={`bg-neutral-200 dark:bg-neutral-700 w-full sm:h-44 h-56 lg:h-56 rounded flex justify-center items-center
            ${linkDesign}
              cursor-pointer hover:no-underline`}
            href={imgSRC} target="_blank" rel="noreferrer">
            <p className="mb-0">Click to view image</p>
          </a>
        )
      }
    </div>
  )
}

export default ItemImage;
