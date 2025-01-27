import "./../../App.css";

const GenieLogo = () => {
    return(
        <img className="app-logo sm:min-w-[182px] !h-20 sm:!h-[100px]" src={ process.env.PUBLIC_URL + "genie-logo.png"} alt="Genie"></img>
    );
}

export default GenieLogo;
