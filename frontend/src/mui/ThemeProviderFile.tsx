"use client";
import {createTheme, ThemeProvider} from '@mui/material/styles';
const theme = createTheme({
	palette: {
		primary: {
			main: '#0077B6',
			// light: will be calculated from palette.primary.main,
			// dark: will be calculated from palette.primary.main,
			// contrastText: will be calculated to contrast with palette.primary.main
		},
		secondary: {
			main: '#90E0EF',
			contrastText: '#8883',
		},
	},
});

export default function ThemeProviderComponent({children}: {children: React.ReactNode}) {

	return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

