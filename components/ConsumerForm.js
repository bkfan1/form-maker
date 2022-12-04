import {useState} from "react";
import { useRouter } from "next/router";

import axios from "axios";
import { nanoid } from "nanoid";

export default function ConsumerForm({ formData }) {
    const router = useRouter();
    const {pathname} = router;
  const { id, title, description, questions, } = formData;

  const [submission, setSubmission] = useState(

    {
      
      answers:  questions.map((question) => ({
        id: nanoid(),
        question: {
          id: question.id,
          title: question.title,
        },
  
        answer: "",
      })),

      submittedAt: new Date(),
    }
    
  );

  const handleOnChangeAnswerInput = (e, id) => {
    const { target } = e;
    const { value } = target;

    const updatedAnswers = [...submission.answers];

    const index = updatedAnswers.findIndex((ans) => ans.question.id === id);
    const foundAnswer = updatedAnswers[index];

    foundAnswer.answer = value;

    updatedAnswers.splice(index, 1, foundAnswer);

    setSubmission({...submission, answers: [...updatedAnswers]});
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `/api/account/forms/submissions/${id}`,
        {id:nanoid(), ...submission}
      );
      console.log(res.status);
    } catch (error) {
      console.log(error);
      console.warn("error!");
    }
  };

  return (
    <>
      <form
        onSubmit={(e) => handleOnSubmit(e)}
        className="flex flex-col gap-4 md:w-[500px]"
      >
        <header className="flex flex-col gap-2 p-4 border-t-8 rounded border-t-indigo-800 bg-white shadow-md">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h2>{description}</h2>
        </header>

        <section className="flex flex-col gap-4">
          {questions.map(({ id, title, required, option, inputData }) => (
            <fieldset
              key={id}
              className="flex flex-col gap-2 p-4 border-l-8 rounded border-l-indigo-800 bg-white shadow-sm"
            >
              <h1 title="Question" className="text-xl">
                {title}{" "}
                {required ? (
                  <span title="This field is required" className="text-red-500">
                    *
                  </span>
                ) : (
                  ""
                )}
              </h1>
              {option === "shortAnswer" && (
                <input
                  type="text"
                  className="customInput p-1 border-2 rounded resize-none focus:border-indigo-800"
                  minLength={inputData.minLength}
                  maxLength={inputData.maxLength}
                  required={required ? true : false}
                  onChange={(e) => handleOnChangeAnswerInput(e, id)}
                  disabled={pathname === "/user/forms/edit/[formId]" ? true : false}
                />
              )}

              {option === "paragraph" && (
                <textarea
                  className="customInput p-1 border-2 rounded resize-none focus:border-indigo-800"
                  placeholder="256 characters maximum."
                  maxLength={inputData.maxLength}
                  required={required ? true : false}
                  onChange={(e) => handleOnChangeAnswerInput(e, id)}
                  disabled={pathname === "/user/forms/edit/[formId]" ? true : false}
                ></textarea>
              )}

              {option === "date" && (
                <input
                  type="date"
                  className="customInput p-1 border-2 rounded resize-none focus:border-indigo-800"
                  required={required ? true : false}
                  onChange={(e) => handleOnChangeAnswerInput(e, id)}
                  disabled={pathname === "/user/forms/edit/[formId]" ? true : false}
                />
              )}

              {option === "linear-range" && (
                <fieldset className="flex gap-2 items-center">
                  <label>{inputData.min}</label>
                  <input
                    type="range"
                    defaultValue={inputData.min}
                    min={inputData.min}
                    max={inputData.max}
                    required={required ? true : false}
                    onChange={(e) => handleOnChangeAnswerInput(e, id)}
                    disabled={pathname === "/user/forms/edit/[formId]" ? true : false}
                  />
                  <label>{inputData.max}</label>
                </fieldset>
              )}
            </fieldset>
          ))}
        </section>

        {pathname === "/submit/[formId]" && <button className="ease-in-out duration-150 text-white p-2 border rounded bg-indigo-800 hover:opacity-90">
          Send
        </button>}
      </form>
    </>
  );
}
