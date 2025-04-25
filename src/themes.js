import { createTheme } from "@mui/material/styles";
import constants from "./constants";

const theme = createTheme({
    palette: {
        primary: {
            main: constants.colors.PRIMARY,
            light: constants.colors.PRIMARY,
            dark: constants.colors.PRIMARY,
        },
        secondary: {
            main: constants.colors.LIGHT_GREY,
            light: constants.colors.LIGHT_GREY,
            dark: constants.colors.LIGHT_GREY
        }
    },
});

export default theme;
