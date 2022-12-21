import { useContext } from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import LinearRangeForm from "./forms/LinearRangeForm";
import QuestionValuesForm from "./forms/QuestionValuesForm";

export default function QuestionEditor({ questionData }) {
  const { formData, dispatch } = useContext(FormEditorContext);
  const handleMoveQuestionUp = () => {
    dispatch({ type: "MOVE_QUESTION_UP", payload: { id: questionData.id } });
  };

  const handleMoveQuestionDown = () => {
    dispatch({ type: "MOVE_QUESTION_DOWN", payload: { id: questionData.id } });
  };

  const handleDeleteQuestion = (id) => {
    dispatch({ type: "DELETE_QUESTION", payload: { id } });
  };

  const n = formData.questions.length - 1;

  return (
    <>
      <div className="border-l-8 border-l-indigo-800 border rounded shadow-sm bg-white p-2">
        <header>
          <menu className="flex items-end justify-end p-2">
            {formData.questions.length > 1 ? (
              <>
                {formData.questions[0].id === questionData.id ||
                formData.questions[n].id !== questionData.id ? (
                  <button onClick={handleMoveQuestionDown}>
                    <i className="bi bi-arrow-down" />
                  </button>
                ) : (
                  ""
                )}

                {formData.questions[n].id === questionData.id ||
                formData.questions[0].id !== questionData.id ? (
                  <button onClick={handleMoveQuestionUp}>
                    <i className="bi bi-arrow-up" />
                  </button>
                ) : (
                  ""
                )}
              </>
            ) : (
              ""
            )}
          </menu>
        </header>

        <section className="flex flex-col gap-2 pb-2">
          <QuestionValuesForm questionData={questionData} />
          {questionData.option === "linear-range" && (
            <LinearRangeForm
              id={questionData.id}
              min={questionData.inputData.min}
              max={questionData.inputData.max}
            />
          )}
        </section>

        <hr />
        <footer className="pt-2">
          <menu className="flex items-end justify-end">
            <button
              onClick={() => handleDeleteQuestion(questionData.id)}
              title="Delete this question"
              className=""
            >
              <i className="ease-in-out duration-150 bi bi-trash text-gray-500 hover:text-black" />
            </button>
          </menu>
        </footer>
      </div>
    </>
  );
}
