import { createContext, useEffect, useState } from "react";

export const ModalWindowContext = createContext();

export const ModalWindowProvider = ({ children }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const [showModal, setShowModal] = useState(false);

  const handleCloseClick = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  return (
    <>
      <ModalWindowContext.Provider
        value={{
          isBrowser,
          setIsBrowser,
          showModal,
          setShowModal,
          handleCloseClick,
        }}
      >
        {children}
      </ModalWindowContext.Provider>
    </>
  );
};
