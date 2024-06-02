import constants from "./../constants.js";
import './../App.css';


const NameSelector = () => {
    return(
        <>
            <input type="text" id={ constants.filterValuesIds.FASHION_ITEM_NAME } className="spans"></input>
            <div style={{ fontSize: '12px' }}>Looks for items with names that <i>contain</i> this value</div>
        </>
    )
}

export default NameSelector;
