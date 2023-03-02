import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, purple, indigo, amber, yellow, red, blue } from '@mui/material/colors';
const darkTheme = createTheme({
    palette: {
        primary: {
            main: blue[500],
        },
        secondary: {
            main: yellow[600],
        },
        info: {
            main: '#000'
        },
        delete: {
            main: red[50]
        }
    },
});

export default darkTheme;