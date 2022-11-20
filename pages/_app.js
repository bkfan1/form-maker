import { FormEditorProvider } from "../contexts/FormEditorContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <FormEditorProvider>
        <Component {...pageProps} />
      </FormEditorProvider>
    </>
  );
}

export default MyApp;
