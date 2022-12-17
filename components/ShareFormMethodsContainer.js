import { useContext, useState } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import SendInvitationForm from "./forms/SendInvitationForm";
import { generateSubmitFormLink } from "../utils/strings";
import { nanoid } from "nanoid";

const sectionBtns = [
  {
    id: nanoid(),
    name: "link",
    icon: "bi bi-link",
  },
  {
    id: nanoid(),
    name: "email",
    icon: "bi bi-envelope",
  },
];

export default function ShareFormMethodsContainer() {
  const { formData } = useContext(FormEditorContext);

  const shareUrl = generateSubmitFormLink(formData.id);

  const [copied, setCopied] = useState(false);

  const handleClickCopyToClipBoard = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
  };

  const [section, setSection] = useState("link");
  return (
    <>
      <div className="relative flex flex-col gap-2 min-w-[368px] max-w-[500px] p-4 border rounded bg-white">
        <header className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">Share form</h1>
          <h2 className="font-bold">Available methods:</h2>
          <menu className="flex gap-4">
            {sectionBtns.map((btn) => (
              <button
                key={btn.id}
                onClick={() => setSection(btn.name)}
                className={`ease-in-out duration-100 border-b-2 ${
                  section === btn.name && "border-b-indigo-800"
                }`}
              >
                <i className={`${btn.icon} text-xl`} />
              </button>
            ))}
          </menu>
        </header>
        <hr />

        <main className="flex flex-col gap-2">
          {section === "link" && (
            <section>
              <h3>Link</h3>
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
          )}

          {section === "email" && (
            <section>
              <SendInvitationForm />
            </section>
          )}
        </main>
      </div>
    </>
  );
}
