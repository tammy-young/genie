import './../App.css';


const ImgFromBase64 = ({ data }) => <img src={`data:image/jpeg;base64,${data}`} />

const getCurrencyIcon = ({ item }) => {
	if (item.currencyType === 1) {
		return(
			<img className="currency-icon" src={ process.env.PUBLIC_URL + "stardollar.png"}></img>
		)
	} else {
		return(
			<img className="currency-icon" src={ process.env.PUBLIC_URL + "starcoin.png"}></img>
		)
	}
}

const getBrandName = ({ item, fashionBrands }) => {
    let brandId = item.brand;
    let idToBrandMap = {};
    fashionBrands.map((brand) => {
        idToBrandMap[brand.id] = brand.name;
    });
    return idToBrandMap[brandId];
}

const ItemCard = ({ item, fashionBrands }) => {
    return (
        <div className="card item-card" style={{ width: '100%', padding: '10px', margin: '10px' }}>
            <ImgFromBase64 data={ item.itemImage } />
            <div style={{ padding: '10px' }}>
                <h6><b>{ item.name }</b></h6>
                <p>{ getBrandName({ item, fashionBrands }) }</p>
                <div style={{ textAlign: "left" }}>
                    <div style={{ display: "inline-block" }}>
                        Selling for: { item.sellPrice }
                        { getCurrencyIcon({ item }) }
                    </div>
                    <br />
                    <p style={{ display: "inline-block" }}>
                        Original: { item.originalPrice }
                        { getCurrencyIcon({ item }) }
                    </p>
                    <div>
                        Seller: { item.sellerUsername }
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default ItemCard;
