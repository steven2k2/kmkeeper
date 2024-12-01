import { red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

// A custom theme for this app
const theme = createTheme({
    cssVariables: true,
    palette: {
        primary: {
            main: '#00BCD4', // Cyan 500
        },
        secondary: {
            main: '#3F51B5', // Indigo 500
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    backgroundColor: '#F5F5F5', // Primary color
                },
            },
        },
    },
});

export default theme;