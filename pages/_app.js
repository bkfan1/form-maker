import { AccountNameProvider } from "../contexts/AccountNameContext";
import { ModalWindowProvider } from "../contexts/ModalWindowContext";
import { SearchProvider } from "../contexts/SearchContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ModalWindowProvider>
        <AccountNameProvider>
          <SearchProvider>
            <Component {...pageProps} />
          </SearchProvider>
        </AccountNameProvider>
      </ModalWindowProvider>
    </>
  );
}

export default MyApp;
