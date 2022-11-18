//import 'bootstrap/dist/css/bootstrap.css';
import { CreateFormProvider } from "../contexts/CreateFormContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <CreateFormProvider>
        <Component {...pageProps} />
      </CreateFormProvider>
    </>
  );
}

export default MyApp;
