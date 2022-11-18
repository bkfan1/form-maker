import { useContext, useEffect, useState } from "react";
import { CreateFormContext } from "../contexts/CreateFormContext";
import QuestionPreviewer from "./QuestionPreviewer";

export default function QuestionEditor({ data }) {
  const { id, title, option, inputData, required } = data;
  const { formData, dispatch, focusedQuestionId, setFocusedQuestionId } =
    useContext(CreateFormContext);

  const [selectedOption, setSelectedOption] = useState(option);
  const [previewField, setPreviewField] = useState(false);

  const handleDeleteQuestion = (id) => {
    dispatch({ type: "DELETE_QUESTION", payload: { id } });
  };

  const handleOnChangeQuestionTitle = (e, id) => {
    const { target } = e;
    const { value } = target;

    dispatch({
      type: "UPDATE_QUESTION_TITLE",
      payload: { id, newTitle: value },
    });
  };

  const handleMoveQuestionUp = (id) => {
    dispatch({ type: "MOVE_QUESTION_UP", payload: { id } });
  };

  const handleMoveQuestionDown = (id) => {
    dispatch({ type: "MOVE_QUESTION_DOWN", payload: { id } });
  };

  const handleOnChangeRequiredQuestion = (e, id) => {
    const { target } = e;
    const { checked } = target;
    dispatch({
      type: "UPDATE_QUESTION_REQUIRED",
      payload: { id, newValue: checked },
    });
  };

  const handleOnChangeSelect = (e, id) => {
    const { target } = e;
    const { name, value } = target;

    setSelectedOption(value);

    let newInputData;

    if (value === "shortAnswer") {
      newInputData = { type: "text", minLength: 0, maxLength: 100 };
    }

    if (value === "paragraph") {
      newInputData = { type: "text", minLength: 0, maxLength: 256 };
    }

    if (value === "date") {
      newInputData = { type: "date" };
    }

    if (value === "linear-range") {
      newInputData = { type: "range", min: 0, max: 0 };
    }

    dispatch({
      type: "UPDATE_QUESTION_INPUT_DATA",
      payload: { id, newOption: value, newInputData },
    });
  };

  const handleOnChangeLinearRange = (e, id) => {
    const { target } = e;
    const { name, value } = target;
    dispatch({
      type: "UPDATE_LINEAR_RANGE_VALUES",
      payload: { id, field: name, newValue: Number(value) },
    });
  };

  const n = formData.questions.length - 1;

  return (
    <>
      <figure
        onClick={() => setFocusedQuestionId(id)}
        className={`ease-in-out duration-100 flex flex-col gap-4 p-4 bg-white border rounded border-l-8 ${
          focusedQuestionId === id
            ? "border-l-indigo-800 shadow-md"
            : "border-l-gray-500 shadow-sm"
        }`}
      >
        <header className="flex gap-4 justify-end">
          <button
            onClick={() => setPreviewField(!previewField)}
            title={previewField ? "Back to edit mode" : "Preview question"}
          >
            <i className="bi bi-eye" />
          </button>

          {previewField ? (
            ""
          ) : (
            <menu>
              {formData.questions[0].id === id &&
              formData.questions.length > 1 ? (
                <button onClick={() => handleMoveQuestionDown(id)}>
                  <i className="bi bi-arrow-down" />
                </button>
              ) : (
                ""
              )}

              {formData.questions[n].id === id ? (
                <button onClick={() => handleMoveQuestionUp(id)}>
                  <i className="bi bi-arrow-up" />
                </button>
              ) : (
                ""
              )}

              {formData.questions[0].id !== id &&
              formData.questions[n].id !== id ? (
                <>
                  <button onClick={() => handleMoveQuestionDown(id)}>
                    <i className="bi bi-arrow-down" />
                  </button>
                  <button onClick={() => handleMoveQuestionUp(id)}>
                    <i className="bi bi-arrow-up" />
                  </button>
                </>
              ) : (
                ""
              )}
            </menu>
          )}
        </header>

        {previewField ? (
          <>
            <QuestionPreviewer questionData={data} inputData={inputData} />
          </>
        ) : (
          <>
            <section className="flex gap-6">
              <div className="flex flex-col gap-4">
                <form>
                  <fieldset>
                    <input
                      type="text"
                      onChange={(e) => handleOnChangeQuestionTitle(e, id)}
                      defaultValue={title}
                      placeholder="Question"
                      required
                      className="customInput ease-in-out duration-100 text-xl pb-1 border-2 border-white border-b-gray-500 focus:border-b-indigo-800"
                    />
                  </fieldset>
                </form>

                {selectedOption === "linear-range" && (
                  <form className="flex gap-4">
                    <input
                      type="number"
                      onChange={(e) => handleOnChangeLinearRange(e, id)}
                      name="min"
                      defaultValue={inputData.min}
                      min={0}
                      max={inputData.max}
                      placeholder="Min value"
                      className="customInput w-32 p-1 border-b-2 border-b-gray-500 focus:border-b-indigo-800"
                    />
                    <input
                      type="number"
                      onChange={(e) => handleOnChangeLinearRange(e, id)}
                      name="max"
                      defaultValue={inputData.max}
                      min={inputData.min}
                      placeholder="Max value"
                      className="customInput w-32 p-1 border-b-2 border-b-gray-500 focus:border-b-indigo-800"
                    />
                  </form>
                )}
              </div>

              <select
                onChange={(e) => handleOnChangeSelect(e, id)}
                defaultValue={option}
                className="h-10 p-1 border rounded focus:border-indigo-800"
              >
                <option value={"shortAnswer"}>Short answer</option>
                <option value={"paragraph"}>Paragraph</option>
                <option value={"date"}>Date</option>
                <option value={"linear-range"}>Lineal range</option>
              </select>
            </section>

            <section className="flex gap-4 justify-end">
              <button
                onClick={() => handleDeleteQuestion(id)}
                title="Delete this question"
              >
                <i className="bi bi-trash" />
              </button>

              <fieldset title="Mark this questions as required">
                <label className="mr-2">Required</label>
                <input
                  type="checkbox"
                  checked={required}
                  onChange={(e) => handleOnChangeRequiredQuestion(e, id)}
                />
              </fieldset>
            </section>
          </>
        )}
      </figure>
    </>
  );
}
