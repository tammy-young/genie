
const NameSelector = () => {
    return(
        <>
            <input type="text" id="fashionItemName" className="spans"></input>
            <div style={{ fontSize: '12px' }}>Looks for items with names that <i>contain</i> this value</div>
        </>
    )
}

export default NameSelector;
