import { createTheme } from "@mui/material/styles";
import constants from "./constants";

const theme = createTheme({
    palette: {
        stardollPurple: {
            main: constants.colors.PRIMARY,
            light: constants.colors.PRIMARY,
            dark: constants.colors.PRIMARY,
        },
    },
});

export default theme;
