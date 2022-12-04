import { ModalWindowProvider } from "../contexts/ModalWindowContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ModalWindowProvider>
        <Component {...pageProps} />
      </ModalWindowProvider>
    </>
  );
}

export default MyApp;
