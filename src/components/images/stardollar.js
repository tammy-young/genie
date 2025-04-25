import "../../App.css";

const StardollarIcon = () => {
    return(
        <img className="currency-icon !w-5 !h-5" src={ process.env.PUBLIC_URL + "stardollar.png"} alt=""></img>
    );
}

export default StardollarIcon;
