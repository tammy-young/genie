
const PriceSelector = () => {
    return(
        <div className="row">
            <div className="col-2">
                <label>
                    Min<br/>
                    <input type="number" id="minPriceFashion" min="2" max="600"></input>
                </label>
            </div>
            <div className="col">
                <label>
                    Max<br/>
                    <input type="number" id="maxPriceFashion" min="2" max="600"></input>
                </label>
            </div>
        </div>
    );
}

export default PriceSelector;
