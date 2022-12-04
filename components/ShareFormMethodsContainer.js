import { useContext, useEffect, useState } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import { ModalWindowContext } from "../contexts/ModalWindowContext";

export default function ShareFormMethodsContainer() {
  const { formData } = useContext(FormEditorContext);
  const { handleCloseClick } = useContext(ModalWindowContext);

  const domain =
    (process.env.NODE_ENV === "production" && "form-maker.vercel.app") ||
    (process.env.NODE_ENV === "development" && `localhost:3000`);
  const shareUrl = domain + "/submit/" + formData.id;

  const [copied, setCopied] = useState(false);

  const handleClickCopyToClipBoard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  };
  return (
    <>
      <div className="relative flex flex-col gap-2 w-96 h-96 p-4 border rounded bg-white">
        <header className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Share form</h1>
          <h2 className="font-bold">Available methods:</h2>
        </header>

        <main className="flex flex-col gap-2">
          <section>
            <h3>
              <i className="bi bi-link text-xl" /> Link:
            </h3>
            <fieldset className="flex gap-2">
              <input
                type="text"
                readOnly
                defaultValue={shareUrl}
                className="ease-in-out duration-150 customInput w-full p-1 border-b-2 rounded focus:border-b-indigo-800 focus:bg-gray-100"
              />
              <button
                title={copied ? "Copied to clipboard" : "Copy to clipboard"}
                onClick={handleClickCopyToClipBoard}
                className="ease-in-out duration-150 w-12 h-12 p-1 rounded-full bg-gray-200 hover:bg-gray-300"
              >
                <i
                  className={`${copied ? "bi bi-check" : "bi bi-clipboard"}`}
                />
              </button>
            </fieldset>
          </section>
        </main>
      </div>
    </>
  );
}
