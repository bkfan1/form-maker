import { useContext, useEffect, useState } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import QuestionPreviewer from "./QuestionPreviewer";

export default function QuestionEditor({ data }) {
  const { id, title, option, inputData, required } = data;
  const {
    formData,
    dispatch,
    previewForm,
    focusedQuestionId,
    setFocusedQuestionId,
  } = useContext(FormEditorContext);

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
          focusedQuestionId === id || previewForm
            ? "border-l-indigo-800 shadow-md"
            : "border-l-gray-500 shadow-sm"
        }`}
      >
        <header className="flex gap-4 justify-end">
          {previewForm ? (
            ""
          ) : (
            <menu className="flex items-center">
              {formData.questions[0].id !== id &&
                formData.questions[n].id !== id && (
                  <>
                    <button
                      onClick={() => handleMoveQuestionUp(id)}
                      className="text-gray-500 ease-in-out duration-150 hover:text-black"
                    >
                      <i className="bi bi-arrow-up" />
                    </button>
                    <button
                      onClick={() => handleMoveDown(id)}
                      className="text-gray-500 ease-in-out duration-150 hover:text-black"
                    >
                      <i className="bi bi-arrow-down" />
                    </button>
                  </>
                )}

              {formData.questions[0].id === id && (
                <button
                  onClick={() => handleMoveQuestionDown(id)}
                  className="text-gray-500 ease-in-out duration-150 hover:text-black"
                >
                  <i className="bi bi-arrow-down" />
                </button>
              )}

              {formData.questions[n].id === id && (
                <button
                  onClick={() => handleMoveQuestionUp(id)}
                  className="text-gray-500 ease-in-out duration-150 hover:text-black"
                >
                  <i className="bi bi-arrow-up" />
                </button>
              )}
            </menu>
          )}
        </header>

        {previewForm ? (
          <>
            <QuestionPreviewer questionData={data} inputData={inputData} />
          </>
        ) : (
          <>
            <section className="flex gap-6 pb-2">
              <div className="flex flex-col gap-4">
                <form onSubmit={(e) => e.preventDefault()}>
                  <fieldset>
                    <input
                      type="text"
                      onChange={(e) => handleOnChangeQuestionTitle(e, id)}
                      value={title}
                      placeholder="Question"
                      required
                      className="customInput ease-in-out duration-100 text-xl pb-1 border-2 border-white border-b-gray-500 focus:border-b-indigo-800"
                    />
                  </fieldset>
                </form>

                {option === "linear-range" && (
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="flex items-center gap-4"
                  >
                    <input
                      type="number"
                      onChange={(e) => handleOnChangeLinearRange(e, id)}
                      name="min"
                      defaultValue={inputData.min}
                      min={0}
                      max={inputData.max}
                      placeholder="Min value"
                      className="customInput rangeInput w-32 p-1 border-b-2 border-b-gray-500 focus:border-b-indigo-800"
                    />
                    <label>To</label>
                    <input
                      type="number"
                      onChange={(e) => handleOnChangeLinearRange(e, id)}
                      name="max"
                      defaultValue={inputData.max}
                      min={inputData.min}
                      placeholder="Max value"
                      className="customInput rangeInput w-32 p-1 border-b-2 border-b-gray-500 focus:border-b-indigo-800"
                    />
                  </form>
                )}
              </div>

              <form onSubmit={(e) => e.preventDefault()}>
                <select
                  onChange={(e) => handleOnChangeSelect(e, id)}
                  value={option}
                  className="h-10 p-1 border rounded focus:border-indigo-800"
                >
                  <option value={"shortAnswer"}>Short answer</option>
                  <option value={"paragraph"}>Paragraph</option>
                  <option value={"date"}>Date</option>
                  <option value={"linear-range"}>Lineal range</option>
                </select>
              </form>
            </section>

            <section className=" pt-2 border-t-2 border-t-gray-200">
              <menu className="flex items-center justify-end gap-4">
                <button
                  onClick={() => handleDeleteQuestion(id)}
                  title="Delete this question"
                  className="text-gray-500 ease-in-out duration-150 hover:text-black"
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
              </menu>
            </section>
          </>
        )}
      </figure>
    </>
  );
}
