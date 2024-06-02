import constants from "../constants";
import './../App.css';

const PriceSelector = () => {
    return(
        <>
            <div className="row">
                <div className="col-2">
                    <label>
                        Min<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MIN_PRICE } min="2" max="600"></input>
                    </label>
                </div>
                <div className="col">
                    <label>
                        Max<br/>
                        <input type="number" id={ constants.filterValuesIds.FASHION_MAX_PRICE } min="2" max="600"></input>
                    </label>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <select id={ constants.filterValuesIds.FASHION_CURRENCY_TYPE }>
                        <option value="1">Stardollars</option>
                        <option value="2">Starcoins</option>
                    </select>
                </div>
            </div>
        </>
    );
}

export default PriceSelector;
