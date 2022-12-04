import { useContext } from "react";
import { ModalWindowContext } from "../contexts/ModalWindowContext";
import { createPortal } from "react-dom";

export default function Modal({ children }) {
  const { isBrowser, showModal, handleCloseClick } = useContext(ModalWindowContext);

  const modalContent = showModal ? (
    <>
      <div className="fixed z-10 left-0 right-0 bottom-0 top-0 flex flex-col justify-center items-center w-full h-screen bg-black/90">
        <button title="Close modal" onClick={handleCloseClick} className="absolute right-[15px] top-0 text-white"><i className="bi bi-x text-4xl"/></button>
        {children}
      </div>
    </>
  ) : null;

  if (isBrowser) {
    return createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
}
