import { nanoid } from "nanoid";
import { useContext } from "react";
import { CreateFormContext } from "../contexts/CreateFormContext";

export default function FormEditorActionsMenu() {
  const { dispatch } = useContext(CreateFormContext);

  const handleAddNewQuestion = () => {
    let newQuestion = {
      id: nanoid(),
      title: "Untitled question",
      option: "shortAnswer",
      inputData: {
        type: "text",
        minLength: 0,
        maxLength: 100,
      },

      required: false,
    };

    return dispatch({ type: "ADD_NEW_QUESTION", payload: { newQuestion } });
  };

  return (
    <>
      <menu className="flex flex-col gap-2 p-2 border rounded bg-white shadow-md">
        <button
          onClick={handleAddNewQuestion}
          title="Add new question"
          className="text-xl"
        >
          <i className="bi bi-plus-circle" />
        </button>

        <button
          onClick={handleAddNewQuestion}
          title="Save form"
          className="text-xl"
        >
          <i className="bi bi-check-circle" />
        </button>

        <button className="text-xl">
          <i className="bi bi-send" title="Publish form" />
        </button>
      </menu>
    </>
  );
}
