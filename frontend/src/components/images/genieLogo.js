import "./../../App.css";

const GenieLogo = () => {
    return(
        <img className="app-logo min-w-[182px]" src={ process.env.PUBLIC_URL + "genie-logo.png"} alt="Genie"></img>
    );
}

export default GenieLogo;
