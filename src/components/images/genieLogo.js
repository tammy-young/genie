import "../../App.css";

const GenieLogo = () => {
    return(
        <img className="app-logo sm:min-w-[150px] sm:!h-20 !h-16" src={ process.env.PUBLIC_URL + "genie-logo.png"} alt="Genie"></img>
    );
}

export default GenieLogo;
