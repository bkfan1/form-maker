import { useContext } from "react";
import { CreateFormContext } from "../contexts/CreateFormContext";
import QuestionEditor from "./QuestionEditor";

export default function FormEditor() {
  const { formData } = useContext(CreateFormContext);

  return (
    <>
      <div className="flex flex-col lg:w-[700px] gap-2">
        <header className="flex justify-between p-4 bg-white border rounded border-t-8 border-t-indigo-800 shadow-md">
          <form className="flex flex-col gap-4">
            <fieldset>
              <input
                type="text"
                defaultValue={formData.title}
                className="customInput pb-1 text-2xl font-bold customInput ease-in-out duration-100 border-2 border-white focus:border-b-indigo-800"
              />
            </fieldset>

            <fieldset>
              <input
                type="text"
                defaultValue={formData.description}
                className="customInput ease-in-out duration-100 border-2 border-white focus:border-b-indigo-800"
              />
            </fieldset>
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
