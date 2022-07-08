import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNotifications } from "react-notifications-component";
import "animate.css/animate.min.css";
import "react-notifications-component/dist/theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReactNotifications />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
