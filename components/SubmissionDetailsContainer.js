export default function SubmissionDetailsContainer({ data }) {
  const { answers, submittedAt } = data;

  return (
    <>
      <figure className="flex flex-col gap-2 w-[400px] p-2 border rounded bg-white">
        <header>
          <h1 className="text-2xl font-bold">Submission</h1>
          <h2 className="text-sm text-gray-500">
            <i className="bi bi-calendar" />
            <span> {new Date(submittedAt).toLocaleString()}</span>
          </h2>
        </header>
        <section className="hiddeScrollbar flex flex-col gap-2 h-96 overflow-y-scroll">
          {answers.map(({ id, question, answer }) => (
            <div
              key={id}
              className="answer__body gap-2 p-2 rounded odd:bg-gray-200"
            >
              <h1 className="text-xl font-bold">{question.title}</h1>
              <details>
                <summary>Details</summary>
                {question.option === "short-answer" ||
                question.option === "date" ||
                question.option === "linear-range" ? (
                  <p>{answer}</p>
                ) : (
                  ""
                )}
                {question.option === "paragraph" && (
                  <textarea className="w-full h-52 resize-none" disabled>
                    {answer}
                  </textarea>
                )}
              </details>
            </div>
          ))}
        </section>
      </figure>
    </>
  );
}
