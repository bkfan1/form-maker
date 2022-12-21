import { createContext, useReducer, useState } from "react";
import { reducer } from "../hooks/reducers/formEditor";
import { initialFormState } from "../utils/initialStates/formEditor";

export const FormEditorContext = createContext();

export const FormEditorProvider = ({ children, initialFormData }) => {
  const [formData, dispatch] = useReducer(
    reducer,
    initialFormData ? initialFormData : initialFormState
  );

  const [previewForm, setPreviewForm] = useState(false);

  const [focusedQuestionId, setFocusedQuestionId] = useState(null);

  return (
    <FormEditorContext.Provider
      value={{
        formData,
        dispatch,
        previewForm,
        setPreviewForm,
        focusedQuestionId,
        setFocusedQuestionId,

      }}
    >
      {children}
    </FormEditorContext.Provider>
  );
};
