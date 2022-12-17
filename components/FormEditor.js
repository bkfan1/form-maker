import { useContext} from "react";
import { FormEditorContext } from "../contexts/FormEditorContext";
import QuestionEditor from "./QuestionEditor";

export default function FormEditor() {
  const { formData, dispatch, previewForm } = useContext(FormEditorContext);

  const handleOnChangeFormHeaders = (e) => {
    const { target } = e;
    const { name, value } = target;
    dispatch({
      type: "UPDATE_FORM_HEADERS",
      payload: { field: name, newValue: value },
    });
  };

  return (
    <>
      <div className="flex flex-col lg:w-[700px] gap-2">
        <header className="flex justify-between p-4 bg-white border rounded border-t-8 border-t-indigo-800 shadow-md">
          <form className="flex flex-col gap-4">
            {previewForm ? (
              <>
              <h1 className="font-bold text-2xl">{formData.title}</h1>
              <p>{formData.description}</p>
              </>
            ) : (
              <>
              <fieldset>
              <input
                type="text"
                name="title"
                title="Title of this form"
                placeholder="Title of this form"
                onChange={(e) => handleOnChangeFormHeaders(e)}
                value={formData.title}
                disabled={previewForm ? true : false}
                className="customInput pb-1 text-2xl font-bold customInput ease-in-out duration-100 border-2 border-white focus:border-b-indigo-800"
              />
            </fieldset>

            <fieldset className="w-full">
              <input
                type="text"
                name="description"
                title="Description of this form"
                placeholder="Description of this form"
                onChange={(e) => handleOnChangeFormHeaders(e)}
                value={formData.description}
                disabled={previewForm ? true : false}
                className="customInput ease-in-out duration-100 w-full border-2 border-white focus:border-b-indigo-800"
              />
            </fieldset>
              </>
            )}
          </form>
        </header>

        <section className="flex flex-col gap-4">
          {formData.questions.map((q) => (
            <QuestionEditor key={q.id} data={q} />
          ))}
        </section>
      </div>
    </>
  );
}
