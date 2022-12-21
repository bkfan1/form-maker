import { AccountNameProvider } from "../contexts/AccountNameContext";
import { ModalWindowProvider } from "../contexts/ModalWindowContext";
import { SearchProvider } from "../contexts/SearchContext";
import "../styles/globals.css";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ModalWindowProvider>
        <AccountNameProvider>
          <SearchProvider>
            <Toaster />
            <Component {...pageProps} />
          </SearchProvider>
        </AccountNameProvider>
      </ModalWindowProvider>
    </>
  );
}

export default MyApp;
