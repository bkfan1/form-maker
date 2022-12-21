import { useContext, useEffect } from "react";
import { FormEditorContext } from "../../contexts/FormEditorContext";

export default function QuestionValuesForm({ questionData }) {
  const { dispatch } = useContext(FormEditorContext);

  const handleOnChange = (e) => {
    const { target } = e;
    const { type, name, value, checked } = target;

    const updatedQuestion = {
      ...questionData,
      [name]: type === "checkbox" ? checked : value,
    };

    dispatch({ type: "UPDATE_QUESTION_DATA", payload: { updatedQuestion } });
  };

  const handleOnChangeSelect = (e) => {
    const { target } = e;
    const { value } = target;

    let newInputData;

    switch (value) {
      case "linear-range":
        newInputData = { type: "number", min: 0, max: 10 };
        break;
      case "paragraph":
        newInputData = { type: "text", minLength: 0, maxLength: 256 };
        break;
      case "date":
        newInputData = { type: "date" };
        break;
      case "short-answer":
        newInputData = { type: "text", minLength: 0, maxLength: 100 };

      default:
        //throw Error('Invalid question type option');
        break;
    }

    dispatch({
      type: "UPDATE_QUESTION_INPUT_DATA",
      payload: { id: questionData.id, newOption: value, newInputData },
    });
  };

  const handleOnBlur = (e) => {
    const { target } = e;
    let { type, name, value, checked } = target;

    if (value.length === 0) {
      value = "Untitled question";
    }

    const updatedQuestion = {
      ...questionData,
      [name]: type === "checkbox" ? checked : value,
    };

    dispatch({ type: "UPDATE_QUESTION_DATA", payload: { updatedQuestion } });
  };

  return (
    <>
      <form onSubmit={(e) => e.preventDefault()} className="flex flex-col">
        <section className="flex flex-row flex-wrap justify-between gap-6 py-4 px-2">
          <fieldset className="flex flex-col gap-2">
            <input
              type="text"
              name="title"
              title="Question title"
              value={questionData.title}
              onChange={(e) => handleOnChange(e)}
              onBlur={(e) => handleOnBlur(e)}
              placeholder="Question title"
              className="ease-in-out duration-100 customInput w-96 text-xl border-b-2 focus:border-b-indigo-800  sm:w-64"
            />

            <fieldset
              className="flex items-center gap-2 "
              title="Mark this question as required"
            >
              <input
                type="checkbox"
                name="required"
                checked={questionData.required}
                onChange={(e) => handleOnChange(e)}
              />

              <label>Required</label>
            </fieldset>
          </fieldset>

          <fieldset>
            <select
              name="option"
              defaultValue={questionData.option}
              title="Select the input type for this question"
              className="p-2 border rounded bg-white focus:border-indigo-800"
              onChange={(e) => handleOnChangeSelect(e)}
            >
              <option value={"short-answer"}>Short answer</option>
              <option value={"paragraph"}>Paragraph</option>
              <option value={"date"}>Date</option>
              <option value={"linear-range"}>Linear range</option>
            </select>
          </fieldset>
        </section>
      </form>
    </>
  );
}
