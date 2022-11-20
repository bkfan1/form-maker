import { createContext, useReducer, useState } from "react";
import { reducer } from "../hooks/reducers/formEditor";
import { initialFormState } from "../utils/initialStates/formEditor";

export const FormEditorContext = createContext();

export const FormEditorProvider = ({ children }) => {
  
  const [focusedQuestionId, setFocusedQuestionId] = useState(null);

  const [formData, dispatch] = useReducer(reducer, initialFormState);

  return (
    <FormEditorContext.Provider
      value={{ formData, dispatch, focusedQuestionId, setFocusedQuestionId }}
    >
      {children}
    </FormEditorContext.Provider>
  );
};
