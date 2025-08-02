import "../styles/globals.css";
import type { AppProps } from "next/app";
import { EB_Garamond } from "@next/font/google";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import KonamiCode from "../components/KonamiCode";
import Head from "next/head";

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
        <Head>
          <title>wolfgang wallace.</title>
          <meta
            name="description"
            content="A site for a band called wolfgang wallace."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <CssBaseline />
        <KonamiCode />
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
