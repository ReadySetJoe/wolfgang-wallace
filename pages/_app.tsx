import "../styles/globals.css";
import type { AppProps } from "next/app";
import { EB_Garamond } from "@next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const ebGaramond = EB_Garamond({
  weight: "400",
  subsets: ["latin"],
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={ebGaramond.className}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
