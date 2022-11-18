import { nanoid } from "nanoid";
import { createContext, useReducer, useState } from "react";

export const CreateFormContext = createContext();

export const CreateFormProvider = ({ children }) => {
  const [focusedQuestionId, setFocusedQuestionId] = useState(null);

  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "ADD_NEW_QUESTION": {
        const { newQuestion } = payload;
        const updatedQuestions = [...state.questions];
        updatedQuestions.push(newQuestion);

        return { ...state, questions: [...updatedQuestions] };
        break;
      }

      case "DELETE_QUESTION": {
        const { id } = payload;
        const updatedQuestions = [...state.questions].filter(
          (q) => q.id !== id
        );

        return { ...state, questions: [...updatedQuestions] };
      }

      case "UPDATE_QUESTION_TITLE": {
        const { id, newTitle } = payload;
        const updatedQuestions = [...state.questions];

        const index = updatedQuestions.findIndex((q) => q.id === id);

        const found = updatedQuestions[index];

        found.title = newTitle;

        updatedQuestions.splice(index, 1, found);

        return { ...state, questions: [...updatedQuestions] };
      }

      case "UPDATE_QUESTION_INPUT_DATA": {
        const { id, newOption, newInputData } = payload;
        const updatedQuestions = [...state.questions];

        const index = updatedQuestions.findIndex((q) => q.id === id);

        const found = updatedQuestions[index];

        found.option = newOption;
        found.inputData = newInputData;

        updatedQuestions.splice(index, 1, found);

        return { ...state, questions: [...updatedQuestions] };
      }

      case "UPDATE_QUESTION_REQUIRED": {
        const { id, newValue } = payload;
        const updatedQuestions = [...state.questions];

        const index = updatedQuestions.findIndex((q) => q.id === id);

        const found = updatedQuestions[index];
        found.required = newValue;

        updatedQuestions.splice(index, 1, found);

        return { ...state, questions: [...updatedQuestions] };
      }

      case "MOVE_QUESTION_UP": {
        const { id } = payload;

        const updatedQuestions = [...state.questions];
        const index = updatedQuestions.findIndex((q) => q.id === id);
        const toMoveUp = updatedQuestions[index];

        updatedQuestions.splice(index, 1);
        updatedQuestions.splice(index - 1, 0, toMoveUp);

        return { ...state, questions: [...updatedQuestions] };
      }

      case "MOVE_QUESTION_DOWN": {
        const { id } = payload;

        const updatedQuestions = [...state.questions];
        const index = updatedQuestions.findIndex((q) => q.id === id);
        const toMoveDown = updatedQuestions[index];

        updatedQuestions.splice(index, 1);
        updatedQuestions.splice(index + 1, 0, toMoveDown);

        return { ...state, questions: [...updatedQuestions] };
      }

      case "UPDATE_LINEAR_RANGE_VALUES": {
        const { id, field, newValue } = payload;

        const updatedQuestions = [...state.questions];
        const index = updatedQuestions.findIndex((q) => q.id === id);

        const found = updatedQuestions[index];
        found["inputData"][field] = newValue;

        updatedQuestions.splice(index, 1, found);

        return { ...state, questions: [...updatedQuestions] };
      }

      default:
        return state;
        break;
    }
  };

  const initialFormState = {
    id: nanoid(),
    title: "Untitled form",
    description: "Description of this form",

    questions: [],
  };

  const [formData, dispatch] = useReducer(reducer, initialFormState);

  return (
    <CreateFormContext.Provider
      value={{ formData, dispatch, focusedQuestionId, setFocusedQuestionId }}
    >
      {children}
    </CreateFormContext.Provider>
  );
};
